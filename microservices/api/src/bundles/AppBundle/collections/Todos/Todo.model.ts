import { Schema, Is, a, an } from "@kaviar/validator-bundle";

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

  @Is(a.number().required())
  order: number;
}