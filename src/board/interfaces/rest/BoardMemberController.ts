import {Router} from "express";
import {BoardCommandService} from "../../application/internal/commandservices/BoardCommandService";
import {BoardQueryService} from "../../application/internal/queryservices/BoardQueryService";
import {CreateMemberResource} from "./resources/CreateMemberResource";
import {CreateMemberCommandFromResourceAssembler} from "./transform/CreateMemberCommandFromResourceAssembler";
import {MemberResourceFromEntityAssembler} from "./transform/MemberResourceFromEntityAssembler";
import {GetAllMembersByBoardIdQuery} from "../../domain/model/queries/GetAllMembersByBoardIdQuery";

export class BoardMemberController {
    private readonly router: Router;

    constructor(private readonly boardCommandService: BoardCommandService, private readonly boardQueryService: BoardQueryService) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * /api/v1/boards/{boardId}/members:
         *   post:
         *     summary: Add a member to a board
         *     tags: [Boards]
         *     description: Add a new member to a specific board.
         *     parameters:
         *       - in: path
         *         name: boardId
         *         required: true
         *         schema:
         *           type: integer
         *         description: The ID of the board to which the member will be added.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/CreateMemberResource'
         *     responses:
         *       201:
         *         description: Member added successfully.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/MemberResource'
         *       400:
         *         description: Bad Request.
         *       404:
         *         description: Board not found.
         *       500:
         *         description: Internal Server Error.
         */
        this.router.post('/:boardId/members', this.createMember.bind(this));

        /**
         * @swagger
         * /api/v1/boards/{boardId}/members:
         *   get:
         *     summary: Get all members of a board
         *     tags: [Boards]
         *     description: Retrieve all members associated with a specific board.
         *     parameters:
         *       - in: path
         *         name: boardId
         *         required: true
         *         schema:
         *           type: integer
         *         description: The ID of the board to retrieve members for.
         *     responses:
         *       200:
         *         description: List of members retrieved successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/MemberResource'
         *       400:
         *         description: Bad Request.
         *       404:
         *         description: Board not found.
         *       500:
         *         description: Internal Server Error.
         */
        this.router.get('/:boardId/members', this.getAllMembersByBoardId.bind(this));
    }

    public getRoutes() {
        return this.router;
    }

    async createMember(req: any, res: any) {
        try {
            const boardId = req.params.boardId;
            if (!boardId) {
                res.status(400).json({error: 'Bad Request', details: 'Missing board ID'});
                return;
            }
            const resource: CreateMemberResource = req.body;
            const createMemberCommand = CreateMemberCommandFromResourceAssembler.toCommandFromResource(resource, boardId);
            const member = await this.boardCommandService.createMember(createMemberCommand);
            const memberResource = MemberResourceFromEntityAssembler.toResourceFromEntity(member);
            res.status(201).json(memberResource);
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({error: 'Internal Server Error', details: err.message});
        }
    }

    async getAllMembersByBoardId(req: any, res: any) {
        try {
            const boardId = req.params.boardId;
            if (!boardId) {
                res.status(400).json({error: 'Bad Request', details: 'Missing board ID'});
                return;
            }
            const getAllMembersByBoardIdQuery = new GetAllMembersByBoardIdQuery(boardId);
            const members = await this.boardQueryService.getAllMembersByBoardId(getAllMembersByBoardIdQuery);
            const memberResources = members.map(member => MemberResourceFromEntityAssembler.toResourceFromEntity(member));
            res.status(200).json(memberResources);
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({error: 'Internal Server Error', details: err.message});
        }
    }
}