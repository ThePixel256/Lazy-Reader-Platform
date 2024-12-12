import {Router} from "express";
import {BoardCommandService} from "../../application/internal/commandservices/BoardCommandService";
import {BoardQueryService} from "../../application/internal/queryservices/BoardQueryService";
import {CreateBoardResource} from "./resources/CreateBoardResource";
import {CreateBoardCommandFromResourceAssembler} from "./transform/CreateBoardCommandFromResourceAssembler";
import {BoardResourceFromEntityAssembler} from "./transform/BoardResourceFromEntityAssembler";
import {GetAllBoardsByOwnerIdQuery} from "../../domain/model/queries/GetAllBoardsByOwnerIdQuery";
import {GetAllBoardsByMemberIdQuery} from "../../domain/model/queries/GetAllBoardsByMemberIdQuery";

export class BoardController {
    private readonly router: Router;

    constructor(private readonly boardCommandService: BoardCommandService, private readonly boardQueryService: BoardQueryService) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * /api/v1/boards:
         *   post:
         *     summary: Create a new board
         *     tags: [Boards]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/CreateBoardResource'
         *     responses:
         *       201:
         *         description: Board created successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/BoardResource'
         *       400:
         *         description: Bad Request
         *       500:
         *         description: Internal Server Error
         */
        this.router.post('', this.createBoard.bind(this));

        /**
         * @swagger
         * /api/v1/boards:
         *   get:
         *     summary: Get all boards
         *     tags: [Boards]
         *     parameters:
         *       - in: query
         *         name: ownerId
         *         schema:
         *           type: string
         *         required: false
         *         description: The user ID of the board owner
         *       - in: query
         *         name: memberId
         *         schema:
         *           type: string
         *         required: false
         *         description: The user ID of the board member
         *     responses:
         *       200:
         *         description: Boards retrieved successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/BoardResource'
         *       400:
         *         description: Bad Request
         *       500:
         *         description: Internal Server Error
         */
        this.router.get('', this.getAllBoards.bind(this));
    }

    public getRoutes() {
        return this.router;
    }

    async createBoard(req: any, res: any) {
        try {
            const resource: CreateBoardResource = req.body;
            const createBoardCommand = CreateBoardCommandFromResourceAssembler.toCommandFromResource(resource);
            const board = await this.boardCommandService.createBoard(createBoardCommand);
            const boardResource = BoardResourceFromEntityAssembler.toResourceFromEntity(board);
            res.status(201).send(boardResource);
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({error: 'Internal Server Error', details: err.message});
        }
    }

    async getAllBoards(req: any, res: any) {
        const ownerId = req.query.ownerId;
        const memberId = req.query.memberId;
        if (!ownerId && !memberId) {
            res.status(400).json({error: 'Bad Request', details: 'Missing user ID'});
            return;
        }
        if (ownerId && memberId) {
            res.status(400).json({error: 'Bad Request', details: 'Only one of owner ID or member ID should be provided'});
            return;
        }
        try {
            let query = ownerId ? new GetAllBoardsByOwnerIdQuery(ownerId) : new GetAllBoardsByMemberIdQuery(memberId);
            const boards = query instanceof GetAllBoardsByOwnerIdQuery ? await this.boardQueryService.getAllBoardsByOwnerId(query) : await this.boardQueryService.getAllBoardsByMemberId(query);
            const boardResources = boards.map(board => BoardResourceFromEntityAssembler.toResourceFromEntity(board));
            res.status(200).send(boardResources);
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({error: 'Internal Server Error', details: err.message});
        }
    }
}