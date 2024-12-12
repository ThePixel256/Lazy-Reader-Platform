import {IUserCommandService} from "../../../domain/services/IUserCommandService";
import {SignInCommand} from "../../../domain/model/commands/SignInCommand";
import {SignUpCommand} from "../../../domain/model/commands/SignUpCommand";
import {User} from "../../../domain/model/aggregates/User";
import {UserRepository} from "../../../infrastructure/persistence/orm/repositories/UserRepository";
import {ExternalProfileService} from "../outboundservices/acl/ExternalProfileService";
import {UnitOfWork} from "../../../../shared/infrastructure/persistence/orm/repositories/UnitOfWork";

export class UserCommandService implements IUserCommandService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly externalProfileService: ExternalProfileService,
        private readonly unitOfWork: UnitOfWork
    ) {
    }

    async signIn(command: SignInCommand): Promise<User> {
        const user = await this.userRepository.findByUsername(command.username);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async signUp(command: SignUpCommand): Promise<User> {
        let savedUser: User | null = null;

        try {
            await this.unitOfWork.startTransaction();

            const transactionalManager = this.unitOfWork.getManager();
            const userRepository = transactionalManager.getRepository(User);

            const newUser = new User(command.username, command.password);
            savedUser = await userRepository.save(newUser);

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

        return savedUser!;
    }

}