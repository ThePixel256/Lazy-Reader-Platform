import {IUserCommandService} from "../../../domain/services/IUserCommandService";
import {SignInCommand} from "../../../domain/model/commands/SignInCommand";
import {SignUpCommand} from "../../../domain/model/commands/SignUpCommand";
import {User} from "../../../domain/model/aggregates/User";
import {UserRepository} from "../../../infrastructure/persistence/orm/repositories/UserRepository";

export class UserCommandService implements IUserCommandService {
    constructor(private userRepository: UserRepository) {
    }

    async signIn(command: SignInCommand): Promise<User> {
        const user = await this.userRepository.findByUsername(command.username);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async signUp(command: SignUpCommand): Promise<User> {
        const newUser = new User(command.username, command.password);
        return this.userRepository.save(newUser);
    }

}