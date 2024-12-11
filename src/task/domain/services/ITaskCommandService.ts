import {CreateTaskCommand} from "../model/commands/CreateTaskCommand";
import {Task} from "../model/aggregates/Task";

export interface ITaskCommandService {
    createTask(command: CreateTaskCommand): Promise<Task>;
}