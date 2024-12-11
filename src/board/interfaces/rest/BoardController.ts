import {Router} from "express";
import {BoardCommandService} from "../../application/internal/commandservices/BoardCommandService";
import {BoardQueryService} from "../../application/internal/queryservices/BoardQueryService";
import {CreateBoardResource} from "./resources/CreateBoardResource";
import {CreateBoardCommandFromResourceAssembler} from "./transform/CreateBoardCommandFromResourceAssembler";
import {BoardResourceFromEntityAssembler} from "./transform/BoardResourceFromEntityAssembler";
import {GetAllBoardsByUserIdQuery} from "../../domain/model/queries/GetAllBoardsByUserIdQuery";

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
         *     summary: Get all boards by user ID
         *     tags: [Boards]
         *     parameters:
         *       - in: query
         *         name: userId
         *         required: true
         *         schema:
         *           type: integer
         *         description: The ID of the user to fetch boards for
         *     responses:
         *       200:
         *         description: List of boards for the user
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/BoardResource'
         *       400:
         *         description: Bad Request
         *       404:
         *         description: User not found
         *       500:
         *         description: Internal Server Error
         */
        this.router.get('', this.getAllBoardsByUserId.bind(this));
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

    async getAllBoardsByUserId(req: any, res: any) {
        try {
            const userId = req.query.userId;
            if (!userId) {
                res.status(400).json({error: 'Bad Request', details: 'Missing user ID'});
                return;
            }
            const getAllBoardsByUserId = new GetAllBoardsByUserIdQuery(userId);
            const boards = await this.boardQueryService.getAllBoardsByUserId(getAllBoardsByUserId);
            const boardResources = boards.map(board => BoardResourceFromEntityAssembler.toResourceFromEntity(board));
            res.status(200).send(boardResources);
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({error: 'Internal Server Error', details: err.message});
        }
    }
}