import {IBoardQueryService} from "../../../domain/services/IBoardQueryService";
import {GetAllBoardsByUserIdQuery} from "../../../domain/model/queries/GetAllBoardsByUserIdQuery";
import {Board} from "../../../domain/model/aggregates/Board";
import {Member} from "../../../domain/model/entities/Member";
import {BoardRepository} from "../../../infrastructure/persistence/orm/repositories/BoardRepository";
import {GetAllMembersByBoardIdQuery} from "../../../domain/model/queries/GetAllMembersByBoardIdQuery";

export class BoardQueryService implements IBoardQueryService {
    constructor(private boardRepository: BoardRepository) {
    }

    async getAllBoardsByUserId(query: GetAllBoardsByUserIdQuery): Promise<Board[]> {
        return await this.boardRepository.findAllByUserId(query.userId);
    }

    async getAllMembersByBoardId(query: GetAllMembersByBoardIdQuery): Promise<Member[]> {
        const board = await this.boardRepository.findById(query.boardId);
        if (!board) throw new Error('Board not found');
        return board.members;
    }

}