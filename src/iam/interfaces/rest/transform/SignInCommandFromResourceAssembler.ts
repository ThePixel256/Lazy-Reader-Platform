import { SignInCommand } from "../../../domain/model/commands/SignInCommand";
import { SignInResource } from "../resources/SignInResource";

export class SignInCommandFromResourceAssembler {
    static toCommandFromResource(resource: SignInResource): SignInCommand {
        return new SignInCommand(resource.username, resource.password);
    }
}