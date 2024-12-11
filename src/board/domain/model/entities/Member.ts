import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Board} from "../aggregates/Board";
import {UserId} from "../valueobjects/UserId";

@Entity('members')
export class Member {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @ManyToOne(() => Board, (board) => board.members, { onDelete: 'CASCADE' })
    public board!: Board;

    @Column(()=>UserId)
    public userId!: UserId;

    constructor(board: Board, userId: UserId) {
        this.board = board;
        this.userId = userId;
    }
}