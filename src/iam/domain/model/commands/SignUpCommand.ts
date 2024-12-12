export class SignUpCommand{
    constructor(
        public readonly username: string,
        public readonly password: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string
    ) {
        if (username === null || username === '') {
            throw new Error('Invalid username');
        }
        if (password === null || password === '') {
            throw new Error('Invalid password');
        }
        if (firstName === null || firstName === '') {
            throw new Error('Invalid first name');
        }
        if (lastName === null || lastName === '') {
            throw new Error('Invalid last name');
        }
        if (email === null || email === '') {
            throw new Error('Invalid email');
        }
    }
}