import {GetUserByIdQuery} from "../model/queries/GetUserByIdQuery";
import {Nullable} from "../../../shared/domain/types/Nullable";
import {User} from "../model/aggregates/User";

export interface IUserQueryService {
    findById(command: GetUserByIdQuery): Promise<Nullable<User>>;
}