import {TypeOrmRepository} from "../../../../../shared/infrastructure/persistence/orm/repositories/TypeOrmRepository";
import {Task} from "../../../../domain/model/aggregates/Task";
import {ITaskRepository} from "../../../../domain/repositories/ITaskRepository";
import {Nullable} from "../../../../../shared/domain/types/Nullable";
import {BoardId} from "../../../../domain/model/valueobjects/BoardId";

export class TaskRepository extends TypeOrmRepository<Task> implements ITaskRepository {
    protected entitySchema(): Function {
        return Task;
    }
    async save(task: Task): Promise<Task> {
        const repository = await this.repository();
        return repository.save(task);
    }

    async delete(taskId: number): Promise<Nullable<number>> {
        const repository = await this.repository();
        const result = await repository.delete(taskId);
        return result.affected ? result.affected : null;
    }

    async update(task: Task): Promise<Nullable<Task>> {
        const repository = await this.repository();
        await repository.update(task.id, task);
        return await repository.findOne({ where: { id: task.id } });
    }

    async findById(taskId: number): Promise<Nullable<Task>> {
        const repository = await this.repository();
        return repository.findOne({ where: { id: taskId }});
    }

    async findAllByBoardId(boardId: number): Promise<Task[]> {
        const repository = await this.repository();
        const boardIdValue = new BoardId(boardId);
        return repository.find({ where: { boardId: boardIdValue } });
    }
}