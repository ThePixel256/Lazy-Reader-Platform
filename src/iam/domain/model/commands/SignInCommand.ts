export class SignInCommand{
    constructor(public readonly username: string, public readonly password: string) {
        if (username === null || username === '') {
            throw new Error('Invalid username');
        }
        if (password === null || password === '') {
            throw new Error('Invalid password');
        }
    }
}