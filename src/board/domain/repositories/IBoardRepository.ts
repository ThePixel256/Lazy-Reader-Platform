import {Board} from "../model/aggregates/Board";
import {Nullable} from "../../../shared/domain/types/Nullable";

export interface IBoardRepository {
    save(board: Board): Promise<Board>;
    update(board: Board): Promise<Nullable<Board>>;
    delete(boardId: number): Promise<Nullable<number>>;
    findById(boardId: number): Promise<Nullable<Board>>;
    findAllByUserId(userId: number): Promise<Board[]>;
}