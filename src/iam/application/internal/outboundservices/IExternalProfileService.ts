export interface IExternalProfileService {
    createProfile(firstName: string, lastName: string, email: string, userId: number): Promise<number>;
}