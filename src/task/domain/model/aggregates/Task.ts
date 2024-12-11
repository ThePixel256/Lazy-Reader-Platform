import {AggregateRoot} from "../../../../shared/domain/model/aggregates/AggregateRoot";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserId} from "../valueobjects/UserId";
import {BoardId} from "../valueobjects/BoardId";
import {TaskStatus} from "../valueobjects/TaskStatus";

@Entity('tasks')
export class Task extends AggregateRoot {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @Column(()=>UserId)
    public userId: UserId;

    @Column(()=>BoardId)
    public boardId: BoardId;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.TODO
    })
    public status: TaskStatus;

    constructor(title: string, description: string, userId: UserId, boardId: BoardId) {
        super();
        this.title = title;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.status = TaskStatus.TODO;
    }

    public getConvertedStatusToString() {
        if (this.status === TaskStatus.TODO) {
            return 'todo';
        }
        if (this.status === TaskStatus.IN_PROGRESS) {
            return 'in progress';
        }
        if (this.status === TaskStatus.DONE) {
            return 'done';
        }
        return 'unknown';
    }
}