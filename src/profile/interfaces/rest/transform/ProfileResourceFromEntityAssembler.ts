import {Profile} from "../../../domain/model/aggregates/Profile";
import {ProfileResource} from "../resources/ProfileResource";

export class ProfileResourceFromEntityAssembler {
    static toResourceFromEntity(entity: Profile): ProfileResource {
        return new ProfileResource(entity.id, entity.firstName, entity.lastName, entity.email, entity.userId.value);
    }
}