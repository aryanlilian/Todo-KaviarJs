import React, { useState, useEffect } from 'react';
import { useRouter, useGuardian, use } from '@kaviar/x-ui';
import { Layout, AddTodo, Todo, ITodo } from "../../components";
import { TodosCollection } from '../../collections';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as Routes from "../../routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';


export const TodosList = () => {
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
            completed: 1,
            order: 1
        }).then(todos => {
            const data = todos as unknown as ITodo[];
            console.log(data);
            setTodos(data.sort((firstTodo, secondTodo) => firstTodo.order - secondTodo.order));
            console.log(data);
        }).catch(error => console.log(error));
    }, []);

    const deleteTodo = (_id: any) => setTodos(prevTodos => prevTodos.filter(todo => todo._id !== _id));

    const handleOnDragEnd = result => {
        if (!result.destination) return;

        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        items.forEach((item, index) => {
            todosCollection.updateOne(item._id, {
                $set: {
                    order: index
                }
            })
        })

        setTodos(items);
    }

    if (!isLoggedIn) {
        router.go(Routes.LOGIN);
    }

    return (
        <Layout>
            <div className="center-column">
                <AddTodo onSetTodo={setTodos} />
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="characters">
                        {(provided) => (
                            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                { todos.map(({ _id, title, completed }, index) => {
                                    return (
                                        <Draggable key={`${_id}`} draggableId={`${_id}`} index={index}>
                                            {(provided) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Todo _id={_id} title={title} onDelete={deleteTodo} completed={completed} />
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </Layout>
    );
}