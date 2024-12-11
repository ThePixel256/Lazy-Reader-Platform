import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class AggregateRoot {
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}