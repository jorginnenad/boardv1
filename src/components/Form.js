import React from "react";
import uuid from 'uuid/v4';

const Form = ({ setInputText, todos, setTodos, inputText, column, setColumns }) => {

  const inputTextHandler = (e) => {

    setInputText(e.target.value);
  };
  const submitTodoHandler = (e) => {
    e.preventDefault();
    setInputText("");
    const x = { ...column }
    x.todo.items.push(inputText)
    setColumns(x)

  };
  return (
    <form>
      <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
      <button onClick={submitTodoHandler} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      {/* <div className="select">
        <select name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div> */}
    </form>
  );
}

export default Form;