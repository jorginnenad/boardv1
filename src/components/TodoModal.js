import React from 'react'
import Form from './Form';

export default function TodoModal({ setStatus, status, users, setUser, setColumns, columns, inputText, todos, setTodos, setInputText }) {

  return (
    <section className="modal-info">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form status={status} setStatus={setStatus} user={users} setUser={setUser} setColumns={setColumns} column={columns} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} />

    </section>
  )
}
