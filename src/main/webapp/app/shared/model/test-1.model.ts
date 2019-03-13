export interface ITest1 {
    id?: number;
    name?: string;
    sex?: string;
    age?: number;
}

export class Test1 implements ITest1 {
    constructor(public id?: number, public name?: string, public sex?: string, public age?: number) {}
}
