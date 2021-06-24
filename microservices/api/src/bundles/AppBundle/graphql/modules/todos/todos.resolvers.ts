import * as X from "@kaviar/x-bundle";
import { TodosCollection } from "../../../collections/Todos/Todos.collection";

export default {
  Query: [
    [],
    {
      postsFindOne: [X.ToNovaOne(TodosCollection)],
      postsFind: [X.ToNova(TodosCollection)],
      postsCount: [X.ToCollectionCount(TodosCollection)],
    },
  ],
  Mutation: [
    [],
    {
      postsInsertOne: [
        X.ToDocumentInsert(TodosCollection),
        X.ToNovaByResultID(TodosCollection),
      ],
      postsUpdateOne: [
        X.CheckDocumentExists(TodosCollection),
        X.ToDocumentUpdateByID(TodosCollection),
        X.ToNovaByResultID(TodosCollection),
      ],
      postsDeleteOne: [
        X.CheckDocumentExists(TodosCollection),
        X.ToDocumentDeleteByID(TodosCollection),
        X.ToNovaByResultID(TodosCollection),
      ],
    },
  ],
};