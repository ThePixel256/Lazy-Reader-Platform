export class AuthenticatedUserResource {
    constructor(
        public id: number,
        public username: string,
        public token: string
    ) {}
}