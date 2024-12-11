import {CreateMemberResource} from "../resources/CreateMemberResource";
import {CreateMemberCommand} from "../../../domain/model/commands/CreateMemberCommand";

export class CreateMemberCommandFromResourceAssembler {
    static toCommandFromResource(resource: CreateMemberResource, boardId: number): CreateMemberCommand {
        return new CreateMemberCommand(boardId, resource.userId);
    }
}