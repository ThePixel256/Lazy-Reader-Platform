import {Nullable} from "../../../../shared/domain/types/Nullable";
import {User} from "../../../domain/model/aggregates/User";

export interface ITokenService {
    generateToken(user: User): string;
    validateToken(token: string): Promise<Nullable<number>>
}