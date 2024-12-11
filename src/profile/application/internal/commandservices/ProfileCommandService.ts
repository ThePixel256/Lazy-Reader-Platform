import {IProfileCommandService} from "../../../domain/services/IProfileCommandService";
import {CreateProfileCommand} from "../../../domain/model/commands/CreateProfileCommand";
import {Profile} from "../../../domain/model/aggregates/Profile";
import {ProfileRepository} from "../../../infrastructure/persistence/orm/repositories/ProfileRepository";
import {UserId} from "../../../domain/model/valueobjects/UserId";

export class ProfileCommandService implements IProfileCommandService {
    constructor(private profileRepository: ProfileRepository) {
    }

    async createProfile(command: CreateProfileCommand): Promise<Profile> {
        const userId = new UserId(command.userId);
        const newProfile = new Profile(command.firstName, command.lastName, command.email, userId);
        return await this.profileRepository.save(newProfile);
    }
}