import { DataSource, QueryRunner } from 'typeorm';

export class UnitOfWork {
    private queryRunner: QueryRunner | null = null;

    constructor(private readonly dataSource: DataSource) {}

    async startTransaction(): Promise<void> {
        this.queryRunner = this.dataSource.createQueryRunner();
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
    }

    async commit(): Promise<void> {
        if (!this.queryRunner) throw new Error("No query runner available");
        await this.queryRunner.commitTransaction();
    }

    async rollback(): Promise<void> {
        if (!this.queryRunner) throw new Error("No query runner available");
        await this.queryRunner.rollbackTransaction();
    }

    async release(): Promise<void> {
        if (!this.queryRunner) return;
        await this.queryRunner.release();
        this.queryRunner = null; // Clear reference
    }

    getManager() {
        if (!this.queryRunner) throw new Error("No query runner available");
        return this.queryRunner.manager;
    }
}