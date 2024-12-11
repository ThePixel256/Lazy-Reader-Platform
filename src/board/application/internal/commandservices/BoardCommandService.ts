import {IBoardCommandService} from "../../../domain/services/IBoardCommandService";
import {CreateBoardCommand} from "../../../domain/model/commands/CreateBoardCommand";
import {Board} from "../../../domain/model/aggregates/Board";
import {CreateMemberCommand} from "../../../domain/model/commands/CreateMemberCommand";
import {Member} from "../../../domain/model/entities/Member";
import {BoardRepository} from "../../../infrastructure/persistence/orm/repositories/BoardRepository";
import {UserId} from "../../../domain/model/valueobjects/UserId";

export class BoardCommandService implements IBoardCommandService {
    constructor(private boardRepository: BoardRepository) {
    }

    async createBoard(command: CreateBoardCommand): Promise<Board> {
        const ownerId = new UserId(command.ownerId);
        const newBoard = new Board(command.title, command.description, ownerId);
        return this.boardRepository.save(newBoard);
    }

    async createMember(command: CreateMemberCommand): Promise<Member> {
        const board = await this.boardRepository.findById(command.boardId);
        if (!board) throw new Error('Board not found');
        const userId = new UserId(command.userId);
        const newMember = new Member(board, userId);
        board.addMember(newMember);
        await this.boardRepository.save(board);
        return board.getMemberById(newMember.id);
    }

}