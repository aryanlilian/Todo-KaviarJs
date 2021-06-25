import React, { useState } from 'react';
import { use } from '@kaviar/x-ui';
import { TodosCollection } from '../../collections';
import { ObjectId } from '@kaviar/ejson';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

export interface ITodoProps {
    _id: any,
    title: string,
    onDelete: any,
    completed: boolean
}

export const Todo = ({ _id, title, onDelete, completed }: ITodoProps) => {
    const todosCollection = use(TodosCollection);
    const [todoCompleted, setTodoCompleted] = useState(completed);

    const handleDeleteTodo = async () => {
        if (!window.confirm(`If you want to delete the "${title}" todo, click ok!`)) return;

        await todosCollection.deleteOne(_id);
        onDelete(_id);
    }

    const handleCompletedTodo = async () => {
        await todosCollection.updateOne(_id, {
            $set: {
                completed: !todoCompleted
            }
        })        
        setTodoCompleted(prevCompletedTodo => !prevCompletedTodo);
    }

    return (
        <div className={todoCompleted ? "item-row-completed row" : "item-row row"}>
            <div className="col">
                <button className="btn btn-sm btn-danger" onClick={handleDeleteTodo}>Delete</button>
            </div>
            <div className="col-md-7">
                 <span key={_id}>{title}</span>
            </div>
            <div className="col">
                <div className="custom-control custom-checkbox small">
                    <input onChange={handleCompletedTodo} className="custom-control-input" value="" type="checkbox" id="flexCheckChecked" checked={todoCompleted} />
                </div>
            </div>
            <div className="col">
            <label className="form-check-label" htmlFor="flexCheckChecked">{todoCompleted ? "Is done!" : "Done?"}</label>
            </div>
        </div>
    );
};