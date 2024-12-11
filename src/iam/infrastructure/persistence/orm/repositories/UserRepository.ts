import {TypeOrmRepository} from "../../../../../shared/infrastructure/persistence/orm/repositories/TypeOrmRepository";
import {User} from "../../../../domain/model/aggregates/User";
import {IUserRepository} from "../../../../domain/repositories/IUserRepository";
import { EntitySchema, Repository } from "typeorm";
import {Nullable} from "../../../../../shared/domain/types/Nullable";

export class UserRepository extends TypeOrmRepository<User> implements IUserRepository {
    protected entitySchema(): Function {
        return User;
    }

    async save(user: User): Promise<User> {
        const repository: Repository<User> = await this.repository();
        return repository.save(user);
    }

    async findById(userId: number): Promise<Nullable<User>> {
        const repository: Repository<User> = await this.repository();
        return repository.findOne({ where: { id: userId } });
    }

    async delete(user: User): Promise<Nullable<number>> {
        const repository: Repository<User> = await this.repository();
        const result = await repository.delete(user.id);
        return result.affected ? result.affected : null;
    }

    async findByUsername(username: string): Promise<Nullable<User>> {
        const repository: Repository<User> = await this.repository();
        return await repository.findOne({where: {username}});
    }
}