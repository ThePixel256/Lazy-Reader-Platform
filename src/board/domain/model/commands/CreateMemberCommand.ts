export class CreateMemberCommand{
    constructor(public readonly boardId: number, public readonly userId: number) {
        if (boardId === null || boardId <= 0) {
            throw new Error('Invalid boardId');
        }
        if (userId === null || userId <= 0) {
            throw new Error('Invalid userId');
        }
    }
}