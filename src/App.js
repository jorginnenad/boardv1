import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import Form from './components/Form';
import TodoModal from './components/TodoModal';


const onDragEnd = (result, columns, setColumns) => {
  const { source, destination } = result;

  if (!destination) return;

  if (source.droppableId !== destination.droppableId) {

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];


    const [removed] = sourceItems.splice(source.index, 1);

    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    })
  }
};


function App() {

  const statusCheck = 
  [
    {
      id: uuid(),
      name: 'To do'
    },
    {
      id: uuid(),
      name: 'In progress'
    },
    {
      id: uuid(),
      name: 'Done'
    },
  ];

  const usersFromBackend = 
  [
    {
      name: 'Dragan',
      id: uuid()
    },
    {
      name: 'Dejan',
      id: uuid()
    },
    {
      name: 'Dusan',
      id: uuid()
    },
  ];
  


  const columnsFromBackend =
  {
    "todo": {
      id: uuid(),
      name: 'To do',
      items: []
    },
    "in-progress": {
      name: 'In Progress',
      items: []
    },
    "done": {
      name: 'Done',
      items: []
    }
  };


  const [columns, setColumns] = useState(columnsFromBackend);
  const [inputText, setInputText] = useState([]);
  const [todos, setTodos] = useState([]);
  const [renderModal, setRenderModal] = useState(false)
  const [users, setUser] = useState(usersFromBackend);
  const [status, setStatus] = useState(statusCheck);



  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <div>
        <button onClick={() => setRenderModal(renderModal => !renderModal)}>
          {renderModal ? 'Close' : 'Add task'}
        </button>
        {/* {renderModal && <TodoModal status={status} setStatus={setStatus} user={users} setUser={setUser} setColumns={setColumns} column={columns} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} />} */}
        <Form status={status} setStatus={setStatus} user={users} setUser={setUser} setColumns={setColumns} column={columns} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} />
      </div>
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([id, column]) => {
            console.log('col',column)
            return (
              <div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                key={uuid()}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={id} key={id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                            padding: 4,
                            width: 250,
                            minHeight: 500
                          }}
                        >
                          {column.items.map((todo, index) => {
                            return (
                              <Draggable key={index} draggableId={todo.title} index={index} >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        padding: 16,
                                        margin: '0 0 8px 0',
                                        minHeight: '50px',
                                        backgroundColor: snapshot.isDragging ? '#26384A' : '#456C86',
                                        color: 'white',
                                        ...provided.draggableProps.style
                                      }}
                                    > 
                                    {todo.title}
                                      {console.log(todo)}
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      )
                    }}
                  </Droppable>
                </div>
              </div>
            )
          })}
        </DragDropContext>
      </div>

    </div>
  );
}

export default App;
