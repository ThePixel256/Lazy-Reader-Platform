import {GetProfileByIdQuery} from "../model/queries/GetProfileByIdQuery";
import {Profile} from "../model/aggregates/Profile";
import {Nullable} from "../../../shared/domain/types/Nullable";
import {GetProfileByUserIdQuery} from "../model/queries/GetProfileByUserIdQuery";

export interface IProfileQueryService {
    getProfileById(query: GetProfileByIdQuery): Promise<Nullable<Profile>>;
    getProfileByUserId(query: GetProfileByUserIdQuery): Promise<Nullable<Profile>>;
}