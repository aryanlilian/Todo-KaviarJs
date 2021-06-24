import { Collection, Behaviors } from "@kaviar/mongo-bundle";
import * as links from "./Todos.links";
import * as reducers from "./Todos.reducers";
import { Todo } from "./Todo.model";

export class TodosCollection extends Collection<Todo> {
  static collectionName = "todos";
  static model = Todo;

  static links = links;
  static reducers = reducers;

  static behaviors = [Behaviors.Timestampable(), Behaviors.Blameable()];

  // Create an array of indexes
  static indexes = [{ key: { createdAt: 1 } }, { key: { createdBy: 1 } }];
}
