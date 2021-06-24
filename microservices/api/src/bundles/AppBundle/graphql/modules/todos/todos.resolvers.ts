import * as X from "@kaviar/x-bundle";
import { Todo, TodosCollection } from "../../../collections/Todos/";
import { TodosService } from "../../../services";


export default {
  Query: [
    [],
    {
      todosFindOne: [X.CheckLoggedIn(), X.ToNovaOne(TodosCollection)],
      todosFind: [
        X.CheckLoggedIn(), 
        X.ToNova(TodosCollection, 
        (_, args, ctx, info) => {
          return { 
            filters: {
              userId: ctx.userId
            }
          }
        }
      )],
      todosCount: [X.CheckLoggedIn(), X.ToCollectionCount(TodosCollection)],
    },
  ],
  Mutation: [
    [],
    {
      todosInsertOne: [
        X.CheckLoggedIn(), 
        async (_, args, ctx, info) => {
          const container = ctx.container;
          const todosCollection = container.get(TodosCollection) as TodosCollection;
          const todosService = container.get(TodosService) as TodosService;
          const todo: Todo = await todosService.createNewTodo(ctx.userId, args.todoData);
          const todoInDb = todosCollection.insertOne(todo);
          
          return todoInDb;
        }
      ],
      todosUpdateOne: [
        X.CheckLoggedIn(),
        X.CheckDocumentExists(TodosCollection),
        async (_, args, ctx, info) => {
          const todosService = ctx.container.get(TodosService) as TodosService;
          await todosService.isTodoUserAllowed(ctx.userId, args._id);
        },
        X.ToDocumentUpdateByID(TodosCollection),
        X.ToNovaByResultID(TodosCollection),
      ],
      todosDeleteOne: [
        X.CheckLoggedIn(),
        X.CheckDocumentExists(TodosCollection),
        async (_, args, ctx, info) => {
          const todosService = ctx.container.get(TodosService) as TodosService;
          await todosService.isTodoUserAllowed(ctx.userId, args._id);
        },
        X.ToDocumentDeleteByID(TodosCollection),
        X.ToNovaByResultID(TodosCollection),
      ],
    },
  ],
};