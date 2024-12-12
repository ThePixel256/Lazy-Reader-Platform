import {IProfileContextFacade} from "../IProfileContextFacade";
import {ProfileCommandService} from "../../../application/internal/commandservices/ProfileCommandService";
import {CreateProfileCommand} from "../../../domain/model/commands/CreateProfileCommand";

export class ProfileContextFacade implements IProfileContextFacade {
    constructor(private readonly profileCommandService: ProfileCommandService) {
    }

    async createProfile(firstName: string, lastName: string, email: string, userId: number): Promise<number> {
        const createProfileCommand = new CreateProfileCommand(firstName, lastName, email, userId);
        const profile = await this.profileCommandService.createProfile(createProfileCommand);
        return profile.id;
    }
}