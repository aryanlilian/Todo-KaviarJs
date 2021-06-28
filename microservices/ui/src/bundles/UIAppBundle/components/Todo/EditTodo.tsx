import React from "react";
import { ITodo } from "./AddTodo";
import { useForm } from "react-hook-form";
import { useRouter } from "@kaviar/x-ui";
import { use, useDataOne } from "@kaviar/x-ui";
import { Routes } from "@bundles/UIAppBundle";
import { TodosCollection } from "../../collections/Todos";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import { ObjectId } from "@kaviar/ejson";

interface IEditTodo {
  _id: string;
}

export const EditTodo: React.FC<IEditTodo> = ({ _id }) => {
    const router = useRouter();
    const todosCollection = use(TodosCollection);
    const { register, handleSubmit, errors } = useForm<ITodo>({});
    const {
        data: currentTodo,
        isLoading,
        error
    } = useDataOne(TodosCollection, new ObjectId(_id), {
        title: 1,
    });
    
    const onSubmit = handleSubmit(async ({ title }) => {
        try {
            await todosCollection.updateOne(_id, {
                $set: {
                    title: title
                }
            })
            router.go(Routes.TODOS_LIST);
        } catch (error) {
            console.log(error);
        }
        
    });

    if (error) console.log(error);
    if (isLoading) {
        return <div>Loading...</div>
    } else {
        return (
            <form onSubmit={onSubmit}>
                <input
                type="text"
                name="title"
                ref={register({ required: true })}
                defaultValue={currentTodo.title}
                />
                {errors.title && (
                <div className="alert alert-danger">This field is required!</div>
                )}
                <input type="submit" value="Update todo" className="btn btn-success submit" />
            </form>
        );
    }
};
