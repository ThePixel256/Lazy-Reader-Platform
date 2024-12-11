import {GetAllTasksByBoardIdQuery} from "../model/queries/GetAllTasksByBoardIdQuery";
import {Task} from "../model/aggregates/Task";

export interface ITaskQueryService {
    getAllTasksByBoardId(query: GetAllTasksByBoardIdQuery): Promise<Task[]>;
}