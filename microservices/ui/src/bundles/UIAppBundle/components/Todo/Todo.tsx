import React, { useState } from 'react';
import { use } from '@kaviar/x-ui';
import { TodosCollection } from '../../collections';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

export interface ITodoProps {
    _id: string,
    title: string,
    onDelete: (_id: string) => void,
    completed: boolean,
}

export const Todo: React.FC<ITodoProps> = ({ _id, title, onDelete, completed }) => {
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
            <div className="col-md-8">
                 <span key={_id}><strong>{title}</strong></span>
            </div>
            <div className="col-md-2">
                <button className="btn btn-sm btn-danger" onClick={handleDeleteTodo}>Delete</button>
            </div>
            <div className="col-md-2">
                <Link className="btn btn-sm btn-success" to={`/todos/edit/${_id}`}>Edit</Link>
            </div>
            <div className="col-md-1">
                <div className="custom-control custom-checkbox small">
                    <input onChange={handleCompletedTodo} className="custom-control-input" value="" type="checkbox" id="flexCheckChecked" checked={todoCompleted} />
                </div>
            </div>
            <div className="col-md-3">
                <label className="form-check-label" htmlFor="flexCheckChecked">{todoCompleted ? <em>Is done!</em> : "Done?"}</label>
            </div>
        </div>
    );
};