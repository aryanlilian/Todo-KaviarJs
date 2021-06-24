import { Collection } from "@kaviar/x-ui";
import { ObjectId } from "@kaviar/ejson";

export interface ITodo {
    _id: any
    title: string
    completed: boolean
    userId: any 
}

export class TodosCollection extends Collection<ITodo> {
    getName() {
        return "todos";
    }

    getTransformMap() {
        return {
            _id: (v: string) => new ObjectId(v),
        };
    }
}