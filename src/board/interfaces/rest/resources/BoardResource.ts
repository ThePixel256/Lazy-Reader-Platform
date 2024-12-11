export class BoardResource{
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public ownerId: number,
    ) {}
}