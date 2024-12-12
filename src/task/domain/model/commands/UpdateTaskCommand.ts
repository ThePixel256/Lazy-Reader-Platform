export class UpdateTaskCommand {
    constructor(public readonly taskId: number, public readonly title: string | null, public readonly description: string | null, public readonly status: string | null, public readonly userId: number | null) {
        if (taskId === null || taskId <= 0) {
            throw new Error('Invalid id');
        }
        if (title === '') {
            throw new Error('Invalid title');
        }
        if (description === '') {
            throw new Error('Invalid description');
        }
        if (status === '') {
            throw new Error('Invalid state');
        }
        if (userId === null || userId <= 0) {
            throw new Error('Invalid userId');
        }
    }
}