import { SignUpCommand } from '../../../domain/model/commands/SignUpCommand';
import { SignUpResource } from '../resources/SignUpResource';

export class SignUpCommandFromResourceAssembler {
    static toCommandFromResource(resource: SignUpResource): SignUpCommand {
        return new SignUpCommand(resource.username, resource.password, resource.firstName, resource.lastName, resource.email);
    }
}