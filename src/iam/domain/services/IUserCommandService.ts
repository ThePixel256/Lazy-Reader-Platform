import {User} from "../model/aggregates/User";
import {SignUpCommand} from "../model/commands/SignUpCommand";
import {SignInCommand} from "../model/commands/SignInCommand";

export interface IUserCommandService {
    signUp(command: SignUpCommand): Promise<User>;
    signIn(command: SignInCommand): Promise<User>;
}