import React, { createContext, useEffect, useState } from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'

export const TodoContext = createContext();

const TodoApp = () => {

    const [todoData, setTodoData] = useState({});

    useEffect(()=>
    {
        let todoDataLocal = JSON.parse(localStorage.getItem("todoData"));
        if(todoDataLocal)
            setTodoData(todoDataLocal);

    },[])

    useEffect(()=>
    {
        localStorage.setItem("todoData",JSON.stringify(todoData));

    },[todoData]);

    return (

        <TodoContext.Provider value={{todoData, setTodoData}}>

            <div className='p-2 border min-h-[100vh] flex flex-col items-center'>

                <h1 className='text-xl'>Todo App</h1>

                <div className='m-5 flex flex-col items-center'>
                    <AddTodo/>
                    <TodoList/>
                </div>

            </div>

        </TodoContext.Provider>
    )
}

export default TodoApp