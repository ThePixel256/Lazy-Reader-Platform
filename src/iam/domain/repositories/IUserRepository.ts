import {User} from "../model/aggregates/User";
import {Nullable} from "../../../shared/domain/types/Nullable";

export interface IUserRepository{
    save(user: User): Promise<User>;
    delete(user: User): Promise<Nullable<number>>;
    findById(userId: number): Promise<Nullable<User>>;
    findByUsername(username: string): Promise<Nullable<User>>;
}