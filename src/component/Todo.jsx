import React, { useState,useEffect } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import "./Todo.css"

const Todo = () => {

    const [isCompleteScreen,setIsCompletedScreen]=useState(false);  
    const [allToDos,setToDos]= useState([]);
    const [newTital,setNewTital]=useState("");
    const [newDiscription,setNewDiscription]= useState("");
    const [completedTodos,setCompletedTodos] = useState([]);

    const handleAddTodo=()=>{
        let newTodoItems={
            title:newTital,
            discription:newDiscription
        }
        let updatedTodoArr = [...allToDos];
        updatedTodoArr.push(newTodoItems);
        setToDos(updatedTodoArr);
        localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
    };
    const handleDeleteTodo = (index)=>{
        let redusedTodo = [...allToDos];
        redusedTodo.splice(index);
        localStorage.setItem('todolist',JSON.stringify(redusedTodo));
        setToDos (redusedTodo);
    };
    const handlecomplete = (index)=>{
        let now =new Date();
        let dd=now.getDate();
        let mm=now.getMonth();
        let yyyy=now.getFullYear();
        let h= now.getHours();
        let m=now.getMinutes();
        let s=now.getSeconds();
        let completedOn = dd+"-"+mm+"-"+yyyy+"-"+h+":"+m+":"+s;

        let filteredItems = {
            ...allToDos[index],
            completedOn:completedOn
        }

        let updatedCompletedArr = [...completedTodos];
        updatedCompletedArr.push(filteredItems);
        setCompletedTodos(updatedCompletedArr);
        
    }


    useEffect(()=>{
      let savedTodo = JSON.parse(localStorage.getItem('todolist'));
      if(savedTodo){
        setToDos(savedTodo);
      }
    },[])

  return (
    <div className='app'>

        <h1>My Todos</h1>


      <div className='wrapper-todo'>
        <div className="input-todo">
            <div className="input-todo-item">
                <label>Tital</label>
                <input type="text" value={newTital} onChange={(e)=>setNewTital(e.target.value)} placeholder="what's your Task" />

            </div>
            <div className="input-todo-item">
                <label>Discription</label>
                <input type="text" value={newDiscription} onChange={(e)=>setNewDiscription(e.target.value)} placeholder="Discription of  your task" />

            </div>
            <div className="input-todo-item">
               <button type='button' onClick={handleAddTodo} className='primari-btn'>Add</button>

            </div>

            
        </div>
        <div className="btn-area">
            <button className={`secundry-btn ${isCompleteScreen===false && 'active'}`}  onClick={() =>setIsCompletedScreen(false)}>Todo</button>
            <button className={`secundry-btn ${isCompleteScreen===true && 'active'}`}   onClick={() =>setIsCompletedScreen(true)}>Completed</button>
            </div>
            <div className="todo-list">
               
               { isCompleteScreen===false && allToDos.map((item,index)=>{
                return(
                    <div className="todo-list-item" key={index}>
                    <div>
                    <h3>{item.title}</h3>
                    <p>{item.discription}</p>
                    
                    </div>
                    
                    <div>
                    <MdDeleteOutline className='icon' onClick={()=>handleDeleteTodo(index)} 
                        title="Delete?"/>
                    <FaCheck  className='check-icon' onClick={()=>handlecomplete(index)}/>
                    </div>
                    </div>
                )

               })}
               
               { isCompleteScreen===true && completedTodos.map((item,index)=>{
                return(
                    <div className="todo-list-item" key={index}>
                    <div>
                    <h3>{item.title}</h3>
                    <p>{item.discription}</p>
                    <p><small>Completed on: {item.completedOn}</small></p>
                    </div>
                    
                    <div>
                    <MdDeleteOutline className='icon' onClick={()=>handleDeleteTodo(index)} 
                        title="Delete?"/>

                    
                    </div>
                    </div>
                )

               })}

            </div>
      </div>
    </div>
  )
}

export default Todo
