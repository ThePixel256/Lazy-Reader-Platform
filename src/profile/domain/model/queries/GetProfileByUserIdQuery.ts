export class GetProfileByUserIdQuery {
    constructor(public userId: number) {
        if (userId === null || userId <= 0) {
            throw new Error("Invalid userId");
        }
    }
}