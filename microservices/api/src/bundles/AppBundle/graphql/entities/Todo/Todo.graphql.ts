export default /* GraphQL */ `
  type Todo {
    _id: ObjectId!
    title: String!
    completed: Boolean!
    createdAt: Date!
    updatedAt: Date
    userId: ObjectId!
    order: Int!
  }
`;
