export class GetAllMembersByBoardIdQuery{
    constructor(public boardId: number){
        if (boardId === null || boardId <= 0){
            throw new Error("Invalid boardId");
        }
    }
}