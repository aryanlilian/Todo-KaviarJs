export default /* GraphQL */ `
  type Query {
    usersFindOne(query: QueryInput): User
    usersFind(query: QueryInput): [User]!
    usersCount(filters: QueryInput): Int!
  }

  # type Mutation {
  #   usersInsertOne(document: EJSON!): User
  #   usersUpdateOne(_id: ObjectId!, modifier: EJSON!): User!
  #   usersDeleteOne(_id: ObjectId!): Boolean
  # }
`;
