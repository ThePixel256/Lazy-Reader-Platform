import {CreateProfileResource} from "../resources/CreateProfileResource";
import {CreateProfileCommand} from "../../../domain/model/commands/CreateProfileCommand";

export class CreateProfileCommandFromResourceAssembler {
    static toCommandFromResource(resource: CreateProfileResource): CreateProfileCommand {
        return new CreateProfileCommand(resource.firstName, resource.lastName, resource.email, resource.userId);
    }
}