import {GetAllBoardsByUserIdQuery} from "../model/queries/GetAllBoardsByUserIdQuery";
import {Board} from "../model/aggregates/Board";
import {Member} from "../model/entities/Member";
import {GetAllMembersByBoardIdQuery} from "../model/queries/GetAllMembersByBoardIdQuery";

export interface IBoardQueryService{
    getAllBoardsByUserId(command: GetAllBoardsByUserIdQuery): Promise<Board[]>;

    getAllMembersByBoardId(command: GetAllMembersByBoardIdQuery): Promise<Member[]>;
}