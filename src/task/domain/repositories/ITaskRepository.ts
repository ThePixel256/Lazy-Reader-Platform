import {Task} from "../model/aggregates/Task";
import {Nullable} from "../../../shared/domain/types/Nullable";

export interface ITaskRepository {
    save(task: Task): Promise<Task>;
    update(task: Task): Promise<Nullable<Task>>;
    delete(taskId: number): Promise<Nullable<number>>;
    findById(taskId: number): Promise<Nullable<Task>>;
    findAllByBoardId(boardId: number): Promise<Task[]>;
}