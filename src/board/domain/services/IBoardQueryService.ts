import {GetAllBoardsByOwnerIdQuery} from "../model/queries/GetAllBoardsByOwnerIdQuery";
import {Board} from "../model/aggregates/Board";
import {Member} from "../model/entities/Member";
import {GetAllMembersByBoardIdQuery} from "../model/queries/GetAllMembersByBoardIdQuery";
import {GetAllBoardsByMemberIdQuery} from "../model/queries/GetAllBoardsByMemberIdQuery";

export interface IBoardQueryService{
    getAllBoardsByOwnerId(query: GetAllBoardsByOwnerIdQuery): Promise<Board[]>;

    getAllBoardsByMemberId(query: GetAllBoardsByMemberIdQuery): Promise<Board[]>;

    getAllMembersByBoardId(query: GetAllMembersByBoardIdQuery): Promise<Member[]>;
}