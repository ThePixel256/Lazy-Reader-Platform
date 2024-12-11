import {CreateBoardCommand} from "../model/commands/CreateBoardCommand";
import {Board} from "../model/aggregates/Board";
import {CreateMemberCommand} from "../model/commands/CreateMemberCommand";
import {Member} from "../model/entities/Member";

export interface IBoardCommandService {
    createBoard(command: CreateBoardCommand): Promise<Board>;

    createMember(command: CreateMemberCommand): Promise<Member>;
}