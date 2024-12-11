import {Task} from "../../../domain/model/aggregates/Task";
import {TaskResource} from "../resources/TaskResource";

export class TaskResourceFromEntityAssembler {
    static toResourceFromEntity(entity: Task): TaskResource {
        return new TaskResource(entity.id, entity.title, entity.description, entity.userId.value, entity.boardId.value, entity.getConvertedStatusToString());
    }
}