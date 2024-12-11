import {User} from "../../../domain/model/aggregates/User";
import {AuthenticatedUserResource} from "../resources/AuthenticatedUserResource";

export class AuthenticatedUserResourceFromEntityAssembler {
    static toResourceFromEntity(entity: User) : AuthenticatedUserResource{
        return new AuthenticatedUserResource(entity.id, entity.username, 'no token yet');
    }
}