export class CreateTaskCommand {
    constructor(public readonly title: string, public readonly description: string, public readonly userId: number, public readonly boardId: number) {
        if (title === null || title === '') {
            throw new Error('Invalid title');
        }
        if (description === null || description === '') {
            throw new Error('Invalid description');
        }
        if (userId === null || userId <= 0) {
            throw new Error('Invalid userId');
        }
        if (boardId === null || boardId <= 0) {
            throw new Error('Invalid boardId');
        }
    }
}