import React, { useState, useEffect } from 'react';
import { useRouter, useGuardian, use } from '@kaviar/x-ui';
import { Layout, AddTodo, Todo, ITodo } from "../../components";
import { TodosCollection } from '../../collections';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import * as Routes from "../../routes";


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

    if (!isLoggedIn) {
        router.go(Routes.HOME_PAGE);
    }

    return (
        <Layout>
            <div className="center-column">
                <AddTodo onSetTodo={setTodos} />
                { todos.map(todo => <Todo id={todo._id} title={todo.title} />) }
            </div>
        </Layout>
    );
}