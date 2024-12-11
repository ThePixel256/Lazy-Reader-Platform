import {GetAllBoardsByUserIdQuery} from "../model/queries/GetAllBoardsByUserIdQuery";
import {Board} from "../model/aggregates/Board";
import {Member} from "../model/entities/Member";
import {GetAllMembersByBoardIdQuery} from "../model/queries/GetAllMembersByBoardIdQuery";

export interface IBoardQueryService{
    getAllBoardsByUserId(query: GetAllBoardsByUserIdQuery): Promise<Board[]>;

    getAllMembersByBoardId(query: GetAllMembersByBoardIdQuery): Promise<Member[]>;
}