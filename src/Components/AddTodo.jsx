import React, { useContext, useState } from 'react'
import { TodoContext } from './TodoApp';

let initialState = {
    todoName:'',
    done:false,
    priority:'low'
};

const AddTodo = () => {

    const [specificTodo, setSpecificTodo] = useState(initialState);

    const {todoData, setTodoData} = useContext(TodoContext);

    const handleAddTodo = () =>
    {
        if(specificTodo.todoName=='')
        {
            alert("Please provide an todo");
        }

        let lastTodo = Object.keys(todoData).slice(-1)[0];
        if(lastTodo)
            lastTodo = Number(lastTodo.slice(-1)[0])+1;
        else
            lastTodo = 1;


        setTodoData((prev)=>({...prev, ["todo"+lastTodo]:{id:Number(lastTodo), ...specificTodo}}))

        setSpecificTodo(initialState)
    }

    const handleFieldChange = (e) =>
    {
        setSpecificTodo((prev)=>({...prev, [e.target.name]:e.target.value}));
    }

    const clearCompletedTodos = () =>
    {
        let copyTodoData = structuredClone(todoData);
        let nonCompletedTodo = Object.keys(copyTodoData).filter(todo=>copyTodoData[todo].done)

        nonCompletedTodo.map(todo=>
        {
            delete copyTodoData[todo];
        })

        setTodoData(copyTodoData);
    }

    return (
        
        <div className='flex items-center mb-[50px] mt-[10px] w-[50vw] ml-[60px]'>
            <input className='border p-1 rounded' type='text' placeholder='Add todo' name='todoName' value={specificTodo.todoName} onChange={handleFieldChange} onKeyDown={(({key})=>key==="Enter" && handleAddTodo())} />
            <select className='ml-4 p-1 h-[33px]' name='priority' onChange={handleFieldChange} value={specificTodo.priority}>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
            </select>
            <button className='bg-black w-[50px] ml-4 h-[33px] rounded text-white' onClick={handleAddTodo}>Add</button>
            <button className='bg-black p-1 px-2 ml-4 h-[33px] rounded text-white' onClick={clearCompletedTodos}>Clear Completed</button>
        </div>  

    )
}

export default AddTodo