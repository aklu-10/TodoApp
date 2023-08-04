import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext } from 'react'
import { TodoContext } from './TodoApp';

const TodoList = () => {

    const {todoData, setTodoData} = useContext(TodoContext);

    const statusColor = {
        'high':'text-red-600',
        'medium':'text-yellow-600',
        'low':'text-green-600'
    }

    let completedTodo = Object.keys(todoData).filter(todo=>todoData[todo].done).map(todo=>todoData[todo])
    
    let nonCompletedTodo = Object.keys(todoData).filter(todo=>!todoData[todo].done).map(todo=>todoData[todo])

    const handleTodoStatus = (e, todoKey) =>
    {
        setTodoData(prev=>({...prev, [todoKey]:{...prev[todoKey], done:e.target.checked}}))
    }   

    const handleTodoDelete = (todoKey) =>
    {
        let copyTodoData = structuredClone(todoData);
        delete copyTodoData[todoKey];
        setTodoData(copyTodoData);
    }


    return (
        <div className='w-[45vw]'>

            {/* Completed  */}

            <div className='border'>

                <h2 className='font-medium border border-b-1 border-t-0 border-l-0 border-r-0 p-1 text-[1.1rem]'>Completed</h2>  

                <div className='flex flex-col'>

                    {
                        completedTodo.length!=0 ? 

                        completedTodo.map(todo=>(
                            
                            <div className='flex justify-between items-center p-2' key={"todo"+todo.id}>
                                <input type='checkbox' className='w-[20px] h-[20px]' checked={todo.done} onChange={(e)=>handleTodoStatus(e, "todo"+todo.id)}/>
                                <span className={`w-[85%] line-through ${statusColor[todo.priority]}`}>{todo.todoName}</span>
                                <DeleteIcon style={{cursor:'pointer', padding:'3px', fontSize:'1.9rem'}} onClick={()=>handleTodoDelete("todo"+todo.id)}/>
                            </div>

                        )) 
                        
                        :

                        <p className='min-h-[150px] flex items-center justify-center text-gray-400'>No todos</p> 

                    }

                </div>

            </div>

            {/* Pending  */}
            <div className='border'>

                <h2 className='font-medium border border-b-1 border-t-0 border-l-0 border-r-0 p-1 text-[1.1rem]'>Pending</h2>  

                <div className='flex flex-col'>

                {
                        nonCompletedTodo.length!=0 ? 

                        nonCompletedTodo.map(todo=>(

                            <div className='flex justify-between items-center p-2' key={"todo"+todo.id}>
                                <input type='checkbox' className='w-[20px] h-[20px]' onChange={(e)=>handleTodoStatus(e, "todo"+todo.id )}/>
                                <span className={`w-[85%] ${statusColor[todo.priority]}`}>{todo.todoName}</span>
                                <DeleteIcon style={{cursor:'pointer', padding:'3px', fontSize:'1.9rem'}} onClick={()=>handleTodoDelete("todo"+todo.id)}/>
                            </div>

                        )) 
                        
                        :

                        <p className='min-h-[150px] flex items-center justify-center text-gray-400'>No todos</p> 

                    }


                </div>

                </div>

        </div>
    )
}

export default TodoList