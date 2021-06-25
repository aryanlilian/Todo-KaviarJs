import { ObjectId } from "@kaviar/ejson";
import { Schema, Is, a, an } from "@kaviar/validator-bundle";
import { Type } from "class-transformer";
import { User } from "../Users/User.model";
import { TodosCollection } from "./Todos.collection";

@Schema()
export class Todo {
  @Is(a.objectId().required())
  _id: any;

  @Is(a.string().required())
  title: string;

  @Is(a.boolean().required())
  completed: boolean;

  @Is(a.date().required())
  createdAt: Date;

  @Is(an.date())
  updatedAt?: Date;

  @Is(a.objectId().required())
  userId: any;
}