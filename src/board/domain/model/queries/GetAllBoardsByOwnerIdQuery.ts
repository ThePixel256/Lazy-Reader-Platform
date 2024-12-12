export class GetAllBoardsByOwnerIdQuery {
    constructor(public ownerId: number){
        if (ownerId === null || ownerId <= 0){
            throw new Error("Invalid userId");
        }
    }
}