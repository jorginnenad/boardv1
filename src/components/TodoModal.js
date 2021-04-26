import React from 'react'
import Form from './Form';

export default function TodoModal({ setColumns, columns, inputText, todos, setTodos, setInputText }) {

  return (
    <section>
      <header>
        <h1>Todo List</h1>
      </header>
      <Form setColumns={setColumns} column={columns} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} />

    </section>
  )
}
