import {CreateBoardResource} from "../resources/CreateBoardResource";
import {CreateBoardCommand} from "../../../domain/model/commands/CreateBoardCommand";

export class CreateBoardCommandFromResourceAssembler {
    static toCommandFromResource(resource: CreateBoardResource): CreateBoardCommand {
        return new CreateBoardCommand(resource.title, resource.description, resource.ownerId);
    }
}