import * as X from "@kaviar/x-bundle";
import { UsersCollection } from "../../../collections/Users/Users.collection";

export default {
  Query: [
    [],
    {
      usersFindOne: [X.ToNovaOne(UsersCollection)],
      usersFind: [X.ToNova(UsersCollection)],
      usersCount: [X.ToCollectionCount(UsersCollection)],
    },
  ],
  Mutation: [
    [],
    {
      // usersInsertOne: [
      //   X.ToDocumentInsert(UsersCollection),
      //   X.ToNovaByResultID(UsersCollection),
      // ],
      // usersUpdateOne: [
      //   X.CheckDocumentExists(UsersCollection),
      //   X.ToDocumentUpdateByID(UsersCollection),
      //   X.ToNovaByResultID(UsersCollection),
      // ],
      // usersDeleteOne: [
      //   X.CheckDocumentExists(UsersCollection),
      //   X.ToDocumentDeleteByID(UsersCollection),
      //   X.ToNovaByResultID(UsersCollection),
      // ],
    },
  ],
};
