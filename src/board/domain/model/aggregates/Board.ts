import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {AggregateRoot} from "../../../../shared/domain/model/aggregates/AggregateRoot";
import {UserId} from "../valueobjects/UserId";
import {Member} from "../entities/Member";

@Entity('boards')
export class Board extends AggregateRoot {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @Column(()=>UserId)
    public ownerId: UserId;

    @OneToMany(() => Member, (member) => member.board, { cascade: true })
    public members!: Member[];

    constructor(title: string, description: string, ownerId: UserId) {
        super();
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
    }

    addMember(member: Member) {
        this.members.push(member);
    }

    removeMember(member: Member) {
        this.members = this.members.filter(m => m.userId !== member.userId);
    }

    getMemberById(memberId: number){
        const member = this.members.find(m => m.id === memberId);
        if(!member) throw new Error('Member not found');
        return member;
    }
}