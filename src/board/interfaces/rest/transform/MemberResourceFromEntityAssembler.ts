import {Member} from "../../../domain/model/entities/Member";
import {MemberResource} from "../resources/MemberResource";

export class MemberResourceFromEntityAssembler {
    static toResourceFromEntity(entity: Member): MemberResource {
        return new MemberResource(entity.id, entity.userId.value);
    }
}