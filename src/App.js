import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import Form from './components/Form';
import ItemInfo from './components/ItemInfo';
import TodoList from './components/TodoList';
import ToggleBox from './components/ToggleBox';

import TodoModal from './components/TodoModal'

// import TodoModal from './components/TodoModal'
const itemsFromBackend = [
  { id: uuid(), content: 'First task' },
  { id: uuid(), content: 'Second task' }
];




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
    console.log(222222222222, columns)
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
    console.log(33333333, columns)
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
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [renderModal, setRenderModal] = useState(false)


  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <div>

        <button onClick={() => setRenderModal(renderModal => !renderModal)}>
          {renderModal ? 'close Modal' : 'open modal'}
        </button>
        {/* {renderModal && <TodoModal setColumns={setColumns} column={columns} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} />} */}
        <Form setColumns={setColumns} column={columns} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} />
        {/* <ToggleBox title="Show Vehicles">
          <ItemInfo />
        </ToggleBox> */}
        {/* <TodoList setTodos={setTodos} todos={todos} /> */}
      </div>
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([id, column]) => {
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
                              <Draggable key={index} draggableId={todo} index={index} >
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
                                      {todo}
                                      {/* {<TodoList setTodos={setTodos} todos={todos} />} */}

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
