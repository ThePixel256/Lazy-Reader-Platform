export class TaskResource {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public userId: number,
        public boardId: number,
        public status: string,
    ) {}
}