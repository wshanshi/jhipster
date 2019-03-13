export interface ITest2 {
    id?: number;
    names?: string;
    sexs?: string;
}

export class Test2 implements ITest2 {
    constructor(public id?: number, public names?: string, public sexs?: string) {}
}
