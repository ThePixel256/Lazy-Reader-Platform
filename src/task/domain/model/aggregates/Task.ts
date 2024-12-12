import {AggregateRoot} from "../../../../shared/domain/model/aggregates/AggregateRoot";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserId} from "../valueobjects/UserId";
import {BoardId} from "../valueobjects/BoardId";
import {TaskStatus} from "../valueobjects/TaskStatus";
import {UpdateTaskCommand} from "../commands/UpdateTaskCommand";

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

    public update(command: UpdateTaskCommand){
        if(command.title){
            this.title = command.title;
        }
        if(command.description){
            this.description = command.description;
        }
        if(command.status){
            this.status = this.convertStatusToEnum(command.status);
        }
        if(command.userId){
            this.userId = new UserId(command.userId);
        }
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

    private convertStatusToEnum(status: string): TaskStatus {
        switch (status) {
            case 'todo':
                return TaskStatus.TODO;
            case 'in progress':
                return TaskStatus.IN_PROGRESS;
            case 'done':
                return TaskStatus.DONE;
            default:
                throw new Error('Invalid task status');
        }
    }
}