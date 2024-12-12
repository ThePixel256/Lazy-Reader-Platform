import {IExternalProfileService} from "../IExternalProfileService";
import {ProfileContextFacade} from "../../../../../profile/interfaces/acl/services/ProfileContextFacade";

export class ExternalProfileService implements IExternalProfileService {
    constructor(private profileContextFacade: ProfileContextFacade) {
    }

    async createProfile(firstName: string, lastName: string, email: string, userId: number): Promise<number> {
        return await this.profileContextFacade.createProfile(firstName, lastName, email, userId);
    }
}