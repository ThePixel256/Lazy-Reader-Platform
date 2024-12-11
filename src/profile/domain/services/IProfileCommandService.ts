import {CreateProfileCommand} from "../model/commands/CreateProfileCommand";
import {Profile} from "../model/aggregates/Profile";

export interface IProfileCommandService {
    createProfile(command: CreateProfileCommand): Promise<Profile>;
}