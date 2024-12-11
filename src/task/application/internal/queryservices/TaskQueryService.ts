import {ITaskQueryService} from "../../../domain/services/ITaskQueryService";
import {GetAllTasksByBoardIdQuery} from "../../../domain/model/queries/GetAllTasksByBoardIdQuery";
import {Task} from "../../../domain/model/aggregates/Task";
import {TaskRepository} from "../../../infrastructure/persistence/orm/repositories/TaskRepository";

export class TaskQueryService implements ITaskQueryService {
    constructor(private taskRepository: TaskRepository) {
    }

    async getAllTasksByBoardId(query: GetAllTasksByBoardIdQuery): Promise<Task[]> {
        return await this.taskRepository.findAllByBoardId(query.boardId);
    }
}