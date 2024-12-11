import {IProfileQueryService} from "../../../domain/services/IProfileQueryService";
import {GetProfileByIdQuery} from "../../../domain/model/queries/GetProfileByIdQuery";
import {ProfileRepository} from "../../../infrastructure/persistence/orm/repositories/ProfileRepository";
import {Profile} from "../../../domain/model/aggregates/Profile";
import {Nullable} from "../../../../shared/domain/types/Nullable";
import {query} from "express";
import {GetProfileByUserIdQuery} from "../../../domain/model/queries/GetProfileByUserIdQuery";

export class ProfileQueryService implements IProfileQueryService {
    constructor(private profileRepository: ProfileRepository) {
    }

    async getProfileById(query: GetProfileByIdQuery): Promise<Nullable<Profile>> {
        return await this.profileRepository.findById(query.profileId);
    }

    async getProfileByUserId(query: GetProfileByUserIdQuery): Promise<Nullable<Profile>> {
        return await this.profileRepository.findByUserId(query.userId);
    }
}