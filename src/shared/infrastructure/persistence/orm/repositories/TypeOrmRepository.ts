import { DataSource, Repository } from 'typeorm';
import { AggregateRoot } from '../../../../domain/model/aggregates/AggregateRoot';

export abstract class TypeOrmRepository<T extends AggregateRoot> {
    constructor(private _dataSource: DataSource) {}

    // Cambia EntitySchema<T> a Function si usas clases decoradas con @Entity
    protected abstract entitySchema(): Function;

    protected dataSource(): DataSource {
        return this._dataSource;
    }

    protected async repository(): Promise<Repository<T>> {
        return this._dataSource.getRepository<T>(this.entitySchema());
    }

    protected async persist(aggregateRoot: T): Promise<void> {
        const repository = await this.repository();
        await repository.save(aggregateRoot);
    }
}