import { Router } from "express";
import authenticateToken from "./authenticateToken";
import { postTask, deleteTask, getTaskByUserId, updateTask } from "../controllers/task";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: API for task management
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Complete project"
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       400:
 *         description: Bad request.
 */
router.post("/api/v1/tasks",authenticateToken, postTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID to delete.
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       404:
 *         description: Task not found.
 */
router.delete("/api/v1/tasks/:id",authenticateToken, deleteTask);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get tasks by user ID
 *     tags: [Task]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID to fetch tasks.
 *     responses:
 *       200:
 *         description: Tasks fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Complete project"
 *                   state:
 *                     type: string
 *                     example: "pending"
 *                   isEdited:
 *                     type: boolean
 *                     example: false
 *                   userId:
 *                     type: integer
 *                     example: 1
 *       404:
 *         description: No tasks found for the user.
 *       400:
 *         description: Missing userId parameter.
 */
router.get("/api/v1/tasks",authenticateToken, getTaskByUserId);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Update project"
 *               state:
 *                 type: string
 *                 enum: [pending, completing, all, founded]
 *                 example: "completing"
 *               isEdited:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Task not found.
 */
router.put("/api/v1/tasks/:id",authenticateToken, updateTask);

export default router;