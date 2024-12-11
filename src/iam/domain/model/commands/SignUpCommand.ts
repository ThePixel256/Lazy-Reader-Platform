export class SignUpCommand{
    constructor(public readonly id: number, public readonly username: string, public readonly password: string) {
        if (id === null || id <= 0) {
            throw new Error('Invalid id');
        }
        if (username === null || username === '') {
            throw new Error('Invalid username');
        }
        if (password === null || password === '') {
            throw new Error('Invalid password');
        }
    }
}