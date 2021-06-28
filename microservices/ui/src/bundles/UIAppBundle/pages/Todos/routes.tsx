import { IRoute } from "@kaviar/x-ui";
import { TodosList } from "./TodosList";
import { TodosEdit } from "./TodosEdit";

export const TODOS_LIST: IRoute = {
  path: "/todos",
  component: TodosList,
};

export const TODOS_EDIT: IRoute = {
  path: "/todos/edit/:_id",
  component: TodosEdit
};