import {UpdateTaskCommand} from "../../../domain/model/commands/UpdateTaskCommand";
import {UpdateTaskResource} from "../resources/UpdateTaskResource";

export class UpdateTaskCommandFromResourceAssembler {
    static toCommandFromResource(resource: UpdateTaskResource, taskId: number): UpdateTaskCommand {
        return new UpdateTaskCommand(taskId, resource.title, resource.description, resource.status, resource.userId);
    }
}