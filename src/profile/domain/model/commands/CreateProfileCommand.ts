export class CreateProfileCommand {
    constructor(public readonly firstName: string, public readonly lastName: string, public readonly email: string, public readonly userId: number) {
        if (firstName === null || firstName === '') {
            throw new Error('Invalid firstName');
        }
        if (lastName === null || lastName === '') {
            throw new Error('Invalid lastName');
        }
        if (email === null || email === '') {
            throw new Error('Invalid email');
        }
        if (userId === null || userId <= 0) {
            throw new Error('Invalid userId');
        }
    }
}