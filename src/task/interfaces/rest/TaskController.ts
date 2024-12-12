import {Router} from "express";
import {TaskCommandService} from "../../application/internal/commandservices/TaskCommandService";
import {TaskQueryService} from "../../application/internal/queryservices/TaskQueryService";
import {CreateTaskResource} from "./resources/CreateTaskResource";
import {CreateTaskCommandFromResourceAssembler} from "./transform/CreateTaskCommandFromResourceAssembler";
import {TaskResourceFromEntityAssembler} from "./transform/TaskResourceFromEntityAssembler";
import {GetAllTasksByBoardIdQuery} from "../../domain/model/queries/GetAllTasksByBoardIdQuery";
import {UpdateTaskCommandFromResourceAssembler} from "./transform/UpdateTaskCommandFromResourceAssembler";
import {UpdateTaskResource} from "./resources/UpdateTaskResource";
import {DeleteTaskCommand} from "../../domain/model/commands/DeleteTaskCommand";

export class TaskController {
    private readonly router: Router;

    constructor(private readonly taskCommandService: TaskCommandService, private readonly taskQueryService: TaskQueryService) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * /api/v1/tasks:
         *   post:
         *     summary: Create a new task
         *     tags: [Tasks]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/CreateTaskResource'
         *     responses:
         *       201:
         *         description: Task created successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/TaskResource'
         *       400:
         *         description: Bad Request
         *       500:
         *         description: Internal Server Error
         */
        this.router.post('', this.createTask.bind(this));

        /**
         * @swagger
         * /api/v1/tasks:
         *   get:
         *     summary: Get all tasks for a board
         *     tags: [Tasks]
         *     description: Retrieve all tasks associated with a specific board.
         *     parameters:
         *       - in: query
         *         name: boardId
         *         required: true
         *         schema:
         *           type: integer
         *         description: The ID of the board to retrieve tasks for.
         *     responses:
         *       200:
         *         description: List of tasks retrieved successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/TaskResource'
         *       400:
         *         description: Bad Request.
         *       404:
         *         description: Tasks not found.
         *       500:
         *         description: Internal Server Error.
         */
        this.router.get('', this.getAllTasksByBoardId.bind(this));

        /**
         * @swagger
         * /api/v1/tasks/{taskId}:
         *   patch:
         *     summary: Update a task
         *     tags: [Tasks]
         *     parameters:
         *       - in: path
         *         name: taskId
         *         required: true
         *         schema:
         *           type: integer
         *         description: The ID of the task to update.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/UpdateTaskResource'
         *     responses:
         *       201:
         *         description: Task updated successfully.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/TaskResource'
         *       400:
         *         description: Bad Request.
         *       500:
         *         description: Internal Server Error.
         */
        this.router.patch('/:taskId', this.updateTask.bind(this));

        /**
         * @swagger
         * /api/v1/tasks/{taskId}:
         *   delete:
         *     summary: Delete a task
         *     tags: [Tasks]
         *     parameters:
         *       - in: path
         *         name: taskId
         *         required: true
         *         schema:
         *           type: integer
         *         description: The ID of the task to delete.
         *     responses:
         *       200:
         *         description: Task deleted successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   description: Message indicating the task was deleted successfully.
         *                 task:
         *                   $ref: '#/components/schemas/TaskResource'
         *       400:
         *         description: Bad Request.
         *       500:
         *         description: Internal Server Error.
         */
        this.router.delete('/:taskId', this.deleteTask.bind(this));
    }

    public getRoutes() {
        return this.router;
    }

    async createTask(req: any, res: any) {
        try {
            const resource: CreateTaskResource = req.body;
            const createTaskCommand = CreateTaskCommandFromResourceAssembler.toCommandFromResource(resource);
            const task = await this.taskCommandService.createTask(createTaskCommand);
            const taskResource = TaskResourceFromEntityAssembler.toResourceFromEntity(task);
            res.status(201).json(taskResource);
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({error: 'Internal Server Error', details: err.message});
        }
    }

    async updateTask(req: any, res: any) {
        try {
            const taskId = req.params.taskId;
            const resource: UpdateTaskResource = req.body;
            const updateTaskCommand = UpdateTaskCommandFromResourceAssembler.toCommandFromResource(resource, taskId);
            const task = await this.taskCommandService.updateTask(updateTaskCommand);
            const taskResource = TaskResourceFromEntityAssembler.toResourceFromEntity(task);
            res.status(201).json(taskResource);
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({error: 'Internal Server Error', details: err.message});
        }
    }

    async deleteTask(req: any, res: any) {
        try {
            const taskId = req.params.taskId;
            const deleteTaskCommand = new DeleteTaskCommand(taskId);
            const deletedTask = await this.taskCommandService.deleteTask(deleteTaskCommand);
            res.status(200).json({message: 'Task deleted successfully', taskId: deletedTask});
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({error: 'Internal Server Error', details: err.message});
        }
    }

    async getAllTasksByBoardId(req: any, res: any) {
        try {
            const boardId = req.query.boardId;
            if (!boardId) {
                res.status(400).json({error: 'Bad Request', details: 'Missing board ID'});
                return;
            }
            const getAllTasksByBoardId = new GetAllTasksByBoardIdQuery(boardId);
            const tasks = await this.taskQueryService.getAllTasksByBoardId(getAllTasksByBoardId);
            const taskResources = tasks.map(task => TaskResourceFromEntityAssembler.toResourceFromEntity(task));
            res.status(200).json(taskResources);
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({error: 'Internal Server Error', details: err.message});
        }
    }
}