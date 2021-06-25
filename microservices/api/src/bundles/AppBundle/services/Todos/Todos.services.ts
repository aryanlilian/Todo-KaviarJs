import { Service, ContainerInstance } from "@kaviar/core";
import { Todo, TodosCollection } from "../../collections";
import { ObjectId } from "@kaviar/ejson";
import { FilterQuery } from 'mongodb'

@Service()
export class TodosService {

    constructor(protected readonly container: ContainerInstance) {}

    todosCollection = this.container.get(TodosCollection);

    async existTodo(filters: FilterQuery<Todo>) {
        const todo = await this.todosCollection.find(filters);
        return todo;
    }

    async isTodoUserAllowed(userId: ObjectId, todoId: ObjectId) {
        const filters: FilterQuery<Todo> = {
            _id: todoId,
            userId
        }

        const todoExist = this.existTodo(filters);
        if (!todoExist) {
            throw new Error('Unauthorized!');
        }
    }

    // async todoAlreadyExists(title: string) {
    //     const filters: FilterQuery<Todo> = {
    //         title
    //     };

    //     const todoExist = this.existTodo(filters);
    //     if (todoExist) {
    //         throw new Error('This todo already exists!');
    //     }
    // }

    async createNewTodo(userId: string, data: Partial <Todo>) {
        return {
            ...data,
            userId: new ObjectId(userId),
            completed: false
        } as Todo;
    }

}