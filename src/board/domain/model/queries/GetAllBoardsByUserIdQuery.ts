export class GetAllBoardsByUserIdQuery{
    constructor(public userId: number){
        if (userId === null || userId <= 0){
            throw new Error("Invalid userId");
        }
    }
}