import { AggregateRoot } from "../../../../shared/domain/model/aggregates/AggregateRoot";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class User extends AggregateRoot {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column({ unique: true })
    public username!: string;

    @Column()
    public password!: string;

    constructor(username?: string, password?: string) {
        super();
        if (username && password) {
            this.username = username;
            this.password = password;
        }
    }

    changePassword(newPassword: string): void {
        if (newPassword.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        this.password = newPassword;
    }
}