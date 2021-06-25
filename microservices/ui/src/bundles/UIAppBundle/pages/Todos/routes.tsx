import { IRoute } from "@kaviar/x-ui";
import { TodosPage } from "./TodosList";

export const TODOS_PAGE: IRoute = {
  path: "/todos",
  component: TodosPage,
};