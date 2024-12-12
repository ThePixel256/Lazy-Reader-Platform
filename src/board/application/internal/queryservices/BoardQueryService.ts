import {IBoardQueryService} from "../../../domain/services/IBoardQueryService";
import {GetAllBoardsByOwnerIdQuery} from "../../../domain/model/queries/GetAllBoardsByOwnerIdQuery";
import {Board} from "../../../domain/model/aggregates/Board";
import {Member} from "../../../domain/model/entities/Member";
import {BoardRepository} from "../../../infrastructure/persistence/orm/repositories/BoardRepository";
import {GetAllMembersByBoardIdQuery} from "../../../domain/model/queries/GetAllMembersByBoardIdQuery";
import {GetAllBoardsByMemberIdQuery} from "../../../domain/model/queries/GetAllBoardsByMemberIdQuery";

export class BoardQueryService implements IBoardQueryService {
    constructor(private boardRepository: BoardRepository) {
    }

    async getAllBoardsByOwnerId(query: GetAllBoardsByOwnerIdQuery): Promise<Board[]> {
        return await this.boardRepository.findAllByOwnerId(query.ownerId);
    }

    async getAllMembersByBoardId(query: GetAllMembersByBoardIdQuery): Promise<Member[]> {
        const board = await this.boardRepository.findById(query.boardId);
        if (!board) throw new Error('Board not found');
        return board.members;
    }

   async getAllBoardsByMemberId(query: GetAllBoardsByMemberIdQuery): Promise<Board[]> {
        return await this.boardRepository.findAllByNotOwnerIdAndMembersIncludesUserId(query.memberId);
    }
}