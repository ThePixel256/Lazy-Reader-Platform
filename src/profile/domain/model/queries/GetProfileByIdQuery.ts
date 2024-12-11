export class GetProfileByIdQuery {
    constructor(public profileId: number) {
        if (profileId === null || profileId <= 0) {
            throw new Error("Invalid profileId");
        }
    }
}