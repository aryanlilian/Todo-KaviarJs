import React, { useState, useEffect } from 'react';
import { useRouter, useGuardian, use } from '@kaviar/x-ui';
import { Layout, AddTodo, Todo, ITodo } from "../../components";
import { TodosCollection } from '../../collections';
import * as Routes from "../../routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';


export const TodosPage = () => {
    const router = useRouter();
    const guardian = useGuardian();
    const [todos, setTodos] = useState<ITodo[]>([]);
    const todosCollection = use(TodosCollection);
    const { isLoggedIn } = guardian.state;

    useEffect(() => {
        todosCollection.find({},
        {
            _id: 1,
            title: 1,
            completed: 1
        }).then(todos => {
            const data = todos as unknown as ITodo[];
            console.log(data);
            setTodos(data);
        }).catch(error => console.log(error));
    }, []);

    const deleteTodo = (_id: any) => setTodos(prevTodos => prevTodos.filter(todo => todo._id !== _id));

    if (!isLoggedIn) {
        router.go(Routes.LOGIN);
    }

    return (
        <Layout>
            <div className="center-column">
                <AddTodo onSetTodo={setTodos} />
                { todos.map(todo => <Todo _id={todo._id} title={todo.title} onDelete={deleteTodo} completed={todo.completed} /> )}
            </div>
        </Layout>
    );
}