export class CreateBoardCommand{
    constructor(public readonly title: string, public readonly description: string, public readonly ownerId: number) {
        if (title === null || title === '') {
            throw new Error('Invalid title');
        }
        if (description === null || description === '') {
            throw new Error('Invalid description');
        }
        if (ownerId === null || ownerId === 0) {
            throw new Error('Invalid ownerId');
        }
    }
}