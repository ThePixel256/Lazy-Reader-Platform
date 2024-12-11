import {CreateTaskResource} from "../resources/CreateTaskResource";
import {CreateTaskCommand} from "../../../domain/model/commands/CreateTaskCommand";

export class CreateTaskCommandFromResourceAssembler {
    static toCommandFromResource(resource: CreateTaskResource): CreateTaskCommand {
        return new CreateTaskCommand(resource.title, resource.description, resource.userId, resource.boardId);
    }
}