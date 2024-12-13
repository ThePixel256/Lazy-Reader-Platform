import {IUserCommandService} from "../../../domain/services/IUserCommandService";
import {SignInCommand} from "../../../domain/model/commands/SignInCommand";
import {SignUpCommand} from "../../../domain/model/commands/SignUpCommand";
import {User} from "../../../domain/model/aggregates/User";
import {UserRepository} from "../../../infrastructure/persistence/orm/repositories/UserRepository";
import {ExternalProfileService} from "../outboundservices/acl/ExternalProfileService";
import {UnitOfWork} from "../../../../shared/infrastructure/persistence/orm/repositories/UnitOfWork";
import {TokenService} from "../../../infrastructure/tokens/jwt/services/TokenService";
import {HashingService} from "../../../infrastructure/hashing/bcrypt/services/HashingService";

export class UserCommandService implements IUserCommandService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly externalProfileService: ExternalProfileService,
        private readonly unitOfWork: UnitOfWork,
        private readonly tokenService: TokenService,
        private readonly hashingService: HashingService
    ) {
    }

    async signIn(command: SignInCommand): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findByUsername(command.username);
        if (!user) throw new Error(`User with username ${command.username} not found.`);
        const passwordIsValid = await this.hashingService.verifyPassword(command.password, user.password);
        if (!passwordIsValid) throw new Error(`Invalid password for user with username ${command.username}.`);
        const token = this.tokenService.generateToken(user);
        return { user, token };
    }

    async signUp(command: SignUpCommand): Promise<{ user: User; token: string }> {
        let savedUser: User | null = null;
        let savedToken = '';
        try {
            await this.unitOfWork.startTransaction();

            const transactionalManager = this.unitOfWork.getManager();
            const userRepository = transactionalManager.getRepository(User);

            const existingUser = await userRepository.findOne({ where: { username: command.username } });
            if (existingUser) throw new Error(`User with username ${command.username} already exists.`);

            const hashedPassword = await this.hashingService.hashPassword(command.password);
            const newUser = new User(command.username, hashedPassword);

            savedUser = await userRepository.save(newUser);
            savedToken = this.tokenService.generateToken(savedUser);

            await this.externalProfileService.createProfile(
                command.firstName,
                command.lastName,
                command.email,
                savedUser.id
            );

            await this.unitOfWork.commit();
        } catch (error) {
            console.error("Error during transaction:", error);
            await this.unitOfWork.rollback();
            throw new Error(`Transaction failed: ${(error as Error).message}`);
        } finally {
            await this.unitOfWork.release();
        }

        if (!savedUser) {
            throw new Error("User was not saved successfully.");
        }

        return { user: savedUser, token: savedToken };
    }

}