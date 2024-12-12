export class GetAllBoardsByMemberIdQuery {
    constructor(public memberId: number){
        if (memberId === null || memberId <= 0){
            throw new Error("Invalid userId");
        }
    }
}