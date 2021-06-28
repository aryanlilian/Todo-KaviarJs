import React from "react";
import { EditTodo, Layout } from "../../components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

export interface TodosEditProps {
  _id: string;
}

export const TodosEdit: React.FC<TodosEditProps> = ({ _id }) => {
  return (
    <Layout>
      <div className="center-column">
        <EditTodo _id={_id} />
      </div>
    </Layout>
  );
};
