import {Board} from "../../../domain/model/aggregates/Board";
import {BoardResource} from "../resources/BoardResource";

export class BoardResourceFromEntityAssembler {
    static toResourceFromEntity(entity: Board): BoardResource {
        return new BoardResource(entity.id, entity.title, entity.description, entity.ownerId.value);
    }
}