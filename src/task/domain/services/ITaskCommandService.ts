import {CreateTaskCommand} from "../model/commands/CreateTaskCommand";
import {Task} from "../model/aggregates/Task";
import {UpdateTaskCommand} from "../model/commands/UpdateTaskCommand";
import {DeleteTaskCommand} from "../model/commands/DeleteTaskCommand";

export interface ITaskCommandService {
    createTask(command: CreateTaskCommand): Promise<Task>;
    updateTask(command: UpdateTaskCommand): Promise<Task>;
    deleteTask(command: DeleteTaskCommand): Promise<number>;
}