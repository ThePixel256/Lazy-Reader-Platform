import {Column} from "typeorm";

export class BoardId {
    @Column()
    public readonly value: number;

    constructor(value: number) {
        if (value <= 0) {
            throw new Error("UserId must be a positive number");
        }
        this.value = value;
    }
}