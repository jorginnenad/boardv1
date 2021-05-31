import React from "react";

const Todo = ({ todoData, setRenderItem }) => {
    console.log(typeof todoData.date)


    // const deleteHandler = () => {
    //     setTodos(todos.filter((el) => el.id !== todo.id));
    //     console.log(todo);
    // };
    // const completeHandler = () => {
    //     setTodos(todos.map((item) => {
    //         if(item.id === todo.id) {
    //             return {
    //                 ...item, 
    //                 completed: !item.completed
    //             };
    //         }
    //         return item;
    //     }));
    // };

    // className={`todo-item ${todo.completed ? "completed" : ""}`}
 
    return (
        <div className="todo">
            <div className="todo-left">
                <p>Title: {todoData.title}</p>
                <p>Description: {todoData.desc} </p>
            </div>
            <div className="todo-right">
                <p>Date: {todoData.date.toDateString()}</p>
                <p>Priority: {todoData.priority}</p>
            </div>
            <button onClick={ () => setRenderItem(false)} >X</button>
            {/* <li className='todo-item'>{todoData.title}</li>
            <button  className="complete-btn">
                <i className="fas fa-check"></i>
            </button>
            <button className="trash-btn">
                <i className="fas fa-trash"></i>
            </button> */}
        </div>
    )
}

export default Todo;