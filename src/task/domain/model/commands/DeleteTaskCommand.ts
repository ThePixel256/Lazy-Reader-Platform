export class DeleteTaskCommand {
    constructor(public readonly taskId: number) {
        if (taskId === null || taskId <= 0) {
            throw new Error('Invalid id');
        }
    }
}