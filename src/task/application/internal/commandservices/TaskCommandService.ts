import {ITaskCommandService} from "../../../domain/services/ITaskCommandService";
import {CreateTaskCommand} from "../../../domain/model/commands/CreateTaskCommand";
import {Task} from "../../../domain/model/aggregates/Task";
import {TaskRepository} from "../../../infrastructure/persistence/orm/repositories/TaskRepository";
import {UserId} from "../../../domain/model/valueobjects/UserId";
import {BoardId} from "../../../domain/model/valueobjects/BoardId";
import {UpdateTaskCommand} from "../../../domain/model/commands/UpdateTaskCommand";
import {DeleteTaskCommand} from "../../../domain/model/commands/DeleteTaskCommand";

export class TaskCommandService implements ITaskCommandService {
    constructor(private taskRepository: TaskRepository) {
    }

    async createTask(command: CreateTaskCommand): Promise<Task> {
        const userId = new UserId(command.userId);
        const boardId = new BoardId(command.boardId);
        const newTask = new Task(command.title, command.description, userId, boardId);
        return await this.taskRepository.save(newTask);
    }

    async updateTask(command: UpdateTaskCommand): Promise<Task> {
        const task = await this.taskRepository.findById(command.taskId);
        if (!task) throw new Error('Task not found');
        task.update(command);
        const updatedTask = await this.taskRepository.update(task);
        if (!updatedTask) throw new Error('Error updating task');
        return updatedTask;
    }

    async deleteTask(command: DeleteTaskCommand): Promise<number> {
        const task = await this.taskRepository.findById(command.taskId);
        if (!task)  throw new Error('Task not found');
        const deletedTask = await this.taskRepository.delete(task.id);
        if (!deletedTask) throw new Error('Error deleting task');
        return deletedTask;
    }
}