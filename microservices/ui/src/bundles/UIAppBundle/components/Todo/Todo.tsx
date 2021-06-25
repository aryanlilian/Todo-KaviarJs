import React from 'react';
import { use } from '@kaviar/x-ui';
import { TodosCollection } from '../../collections';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

export const Todo = ({ id, title, onDelete }) => {
    const todosCollection = use(TodosCollection);

    const handleDeleteTodo = async () => {
        if (!window.confirm(`If you want to delete the "${title}" todo, click ok!`)) return;

        await todosCollection.deleteOne(id);
        onDelete(id);
    }

    return (
        <div className="item-row">
            <button className="btn btn-sm btn-danger" onClick={handleDeleteTodo}>Delete</button>
            <span key={id}>{title}</span>
        </div>
    );
};