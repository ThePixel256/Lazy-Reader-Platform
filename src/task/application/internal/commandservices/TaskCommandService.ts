import {ITaskCommandService} from "../../../domain/services/ITaskCommandService";
import {CreateTaskCommand} from "../../../domain/model/commands/CreateTaskCommand";
import {Task} from "../../../domain/model/aggregates/Task";
import {TaskRepository} from "../../../infrastructure/persistence/orm/repositories/TaskRepository";
import {UserId} from "../../../domain/model/valueobjects/UserId";
import {BoardId} from "../../../domain/model/valueobjects/BoardId";

export class TaskCommandService implements ITaskCommandService {
    constructor(private taskRepository: TaskRepository) {
    }

    async createTask(command: CreateTaskCommand): Promise<Task> {
        const userId = new UserId(command.userId);
        const boardId = new BoardId(command.boardId);
        const newTask = new Task(command.title, command.description, userId, boardId);
        return await this.taskRepository.save(newTask);
    }

    /*private getTaskStatus(status: string): TaskStatus {
        switch (status) {
            case 'todo':
                return TaskStatus.TODO;
            case 'in progress':
                return TaskStatus.IN_PROGRESS;
            case 'done':
                return TaskStatus.DONE;
            default:
                throw new Error('Invalid task status');
        }
    }*/
}