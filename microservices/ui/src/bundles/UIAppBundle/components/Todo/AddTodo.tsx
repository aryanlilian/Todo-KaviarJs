import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { use } from '@kaviar/x-ui';
import { TodosCollection } from '../../collections/Todos'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

export interface ITodo {
    _id: any
    title: string
    completed: boolean
}

export interface onSetTodoProps {
    onSetTodo: any
}

export const AddTodo = ({ onSetTodo } : onSetTodoProps) => {
    const todosCollection = use(TodosCollection);
    const { register, handleSubmit, errors, reset} = useForm<ITodo>({});

    const onSubmit = handleSubmit((data) => {  
        todosCollection.insertOne({
            title: data.title,
        }).then(todo => {
            const newTodo = {
                _id: todo._id,
                title: data.title,
                completed: false
            } as ITodo;

            reset()
            onSetTodo((prevTodos: ITodo[]) => prevTodos.concat(newTodo));
        }).catch(error => {
            console.log(error)
        })
    });


    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="title" ref={register( {required: true} )} placeholder="Add a todo..." />
                {errors.title &&  <div className="alert alert-danger">This field is required!</div>}
                <input type="submit" value="Add task" className="btn btn-info submit"/>
            </form>
        </div>
        
    );
};