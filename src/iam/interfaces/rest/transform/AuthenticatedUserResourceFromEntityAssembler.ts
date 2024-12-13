import {User} from "../../../domain/model/aggregates/User";
import {AuthenticatedUserResource} from "../resources/AuthenticatedUserResource";

export class AuthenticatedUserResourceFromEntityAssembler {
    static toResourceFromEntity(entity: {user: User, token: string}) : AuthenticatedUserResource{
        return new AuthenticatedUserResource(entity.user.id, entity.user.username, entity.token);
    }
}