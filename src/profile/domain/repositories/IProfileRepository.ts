import {Profile} from "../model/aggregates/Profile";
import {Nullable} from "../../../shared/domain/types/Nullable";

export interface IProfileRepository {
    save(profile: Profile): Promise<Profile>;
    update(profile: Profile): Promise<Nullable<Profile>>;
    delete(profileId: number): Promise<Nullable<number>>;
    findById(profileId: number): Promise<Nullable<Profile>>;
    findByUserId(userId: number): Promise<Nullable<Profile>>;
    findAll(): Promise<Profile[]>;
}