import {IUserQueryService} from "../../../domain/services/IUserQueryService";
import {GetUserByIdQuery} from "../../../domain/model/queries/GetUserByIdQuery";
import {Nullable} from "../../../../shared/domain/types/Nullable";
import {User} from "../../../domain/model/aggregates/User";
import {UserRepository} from "../../../infrastructure/persistence/orm/repositories/UserRepository";

export class UserQueryService implements IUserQueryService {
    constructor(private userRepository: UserRepository) {
    }

    async findById(command: GetUserByIdQuery): Promise<Nullable<User>> {
        return this.userRepository.findById(command.id);
    }
}