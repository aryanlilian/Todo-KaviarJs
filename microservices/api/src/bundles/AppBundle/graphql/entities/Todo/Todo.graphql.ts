export default /* GraphQL */ `
  type Todo {
    _id: ObjectId!
    title: String!
    completed: Boolean!
    user: User
    createdAt: Date!
    updatedAt: Date
    createdBy: ObjectId!
    updatedBy: ObjectId
  }
`;
