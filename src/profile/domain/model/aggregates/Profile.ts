import {AggregateRoot} from "../../../../shared/domain/model/aggregates/AggregateRoot";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserId} from "../valueobjects/UserId";

@Entity('profiles')
export class Profile extends AggregateRoot {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public email: string;

    @Column(()=>UserId)
    public userId: UserId;

    constructor(firstName: string, lastName: string, email: string, userId: UserId) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userId = userId;
    }
}