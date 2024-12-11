import {TypeOrmRepository} from "../../../../../shared/infrastructure/persistence/orm/repositories/TypeOrmRepository";
import {Board} from "../../../../domain/model/aggregates/Board";
import {IBoardRepository} from "../../../../domain/repositories/IBoardRepository";
import {Nullable} from "../../../../../shared/domain/types/Nullable";
import {UserId} from "../../../../domain/model/valueobjects/UserId";

export class BoardRepository extends TypeOrmRepository<Board> implements IBoardRepository {
    protected entitySchema(): Function {
        return Board;
    }
    async save(board: Board): Promise<Board> {
        const repository = await this.repository();
        return repository.save(board);
    }

    async delete(boardId: number): Promise<Nullable<number>> {
        const repository = await this.repository();
        const result = await repository.delete(boardId);
        return result.affected ? result.affected : null;
    }

    async update(board: Board): Promise<Nullable<Board>> {
        const repository = await this.repository();
        await repository.update(board.id, board);
        return await repository.findOne({ where: { id: board.id } });
    }

    async findAllByUserId(userId: number): Promise<Board[]> {
        const repository = await this.repository();
        const userIdValue = new UserId(userId);
        return repository.find({ where: { ownerId: userIdValue } });
    }

    async findById(boardId: number): Promise<Nullable<Board>> {
        const repository = await this.repository();
        return repository.findOne({ where: { id: boardId }, relations: { members: true},});
    }
}