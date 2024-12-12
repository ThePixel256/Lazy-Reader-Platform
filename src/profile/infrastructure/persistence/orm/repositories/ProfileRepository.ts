import {TypeOrmRepository} from "../../../../../shared/infrastructure/persistence/orm/repositories/TypeOrmRepository";
import {Profile} from "../../../../domain/model/aggregates/Profile";
import {IProfileRepository} from "../../../../domain/repositories/IProfileRepository";
import {Nullable} from "../../../../../shared/domain/types/Nullable";
import {UserId} from "../../../../domain/model/valueobjects/UserId";

export class ProfileRepository extends TypeOrmRepository<Profile> implements IProfileRepository {
    protected entitySchema(): Function {
        return Profile;
    }
    async save(profile: Profile): Promise<Profile> {
        const repository = await this.repository();
        return repository.save(profile);
    }

    async update(profile: Profile): Promise<Nullable<Profile>> {
        const repository = await this.repository();
        await repository.update(profile.id, profile);
        return await repository.findOne({ where: { id: profile.id } });
    }

    async delete(profileId: number): Promise<Nullable<number>> {
        const repository = await this.repository();
        const result = await repository.delete(profileId);
        return result.affected ? result.affected : null;
    }

    async findById(profileId: number): Promise<Nullable<Profile>> {
        const repository = await this.repository();
        return repository.findOne({ where: { id: profileId } });
    }

    async findByUserId(userId: number): Promise<Nullable<Profile>> {
        const repository = await this.repository();
        const userIdValue = new UserId(userId);
        return repository.findOne({ where: { userId: userIdValue } });
    }

    async findAll(): Promise<Profile[]> {
        const repository = await this.repository();
        return repository.find();
    }
}