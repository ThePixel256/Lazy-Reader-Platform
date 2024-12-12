export interface IProfileContextFacade {
    createProfile(firstName: string, lastName: string, email: string, userId: number): Promise<number>;
}