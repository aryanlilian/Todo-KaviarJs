import { Service, ContainerInstance } from "@kaviar/core";
import { Todo, TodosCollection } from "../../collections";
import { ObjectId } from "@kaviar/ejson";
import { FilterQuery } from 'mongodb'

@Service()
export class TodosService {

    constructor(protected readonly container: ContainerInstance) {}

    todosCollection = this.container.get(TodosCollection);

    async countTodos(filters?: FilterQuery<Todo>) {
        return await this.todosCollection.find(filters).count();
    }

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

    async createNewTodo(userId: string, data: Partial <Todo>) {
        const generatedUserId= new ObjectId(userId);
        return {
            ...data,
            userId: generatedUserId,
            order: await this.countTodos({ userId: generatedUserId}),
            completed: false
        } as Todo;
    }

}