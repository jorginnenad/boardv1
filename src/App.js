import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import Form from './components/Form';
import Todo from './components/Todo';



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

  const priorityCheck = 
  [
    {
      id: uuid(),
      name: 'Low'
    },
    {
      id: uuid(),
      name: 'Medium'
    },
    {
      id: uuid(),
      name: 'High'
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
  const [selectField, setSelectField] = useState([]);
  const [todos, setTodos] = useState([]);
  const [renderModal, setRenderModal] = useState(false);
  const [renderItem, setRenderItem] = useState(false);
  const [prioritys, setPriority] = useState(priorityCheck);
  const [currentTodo, setCurrentTodo] = useState();
  
  const getCurrentItem = (title) => {
   const selectedItem = columns.todo.items.map(item => {
    if (title === item.title) {
        setCurrentTodo(item);
        setRenderItem(true);
    } 
   })
  }


  return (
    <div className="wrapper" style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <div className="add-button">
        <button onClick={() => setRenderModal(renderModal => !renderModal)}>
          {renderModal ? 'Close' : 'Add task'}
        </button>
        {renderModal && <Form priority={prioritys} setPriority={setPriority} setColumns={setColumns} column={columns} setSelectField={setSelectField} selectField={selectField} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} />}
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
                              <Draggable key={index} draggableId={todo.title} index={index} >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      onClick={ function(e) {
                                        // setRenderItem(renderItem => !renderItem)
                                        console.log(e.target.innerHTML)
                                        getCurrentItem(e.target.innerHTML)
                                      } }
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
      <div className="infoDiv">{renderItem && <Todo setRenderItem={setRenderItem} todoData={currentTodo} />}</div>
    </div>
  );
}

export default App;
