import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import Form from './components/Form';
import ItemInfo from './components/ItemInfo';
import TodoList from './components/TodoList';
import ToggleBox from './components/ToggleBox';


const itemsFromBackend = [
  { id: uuid(), content: 'First task' },
  { id: uuid(), content: 'Second task' }
];


  

const onDragEnd = (result, columns, setColumns) => {
   if (!result.destination) return;
   const { source, destination } = result;
   console.log(result);
   if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    console.log(sourceColumn, destColumn);
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    console.log(sourceItems, destItems);
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
    console.log(copiedItems);
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

function App() {

  
  
  const [columns, setColumns] = useState(columnsFromBackend);
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <div>
      <header>
        <h1>Todo List</h1>
      </header>
      <ToggleBox title="Show Vehicles">
				<ItemInfo />
			</ToggleBox>
      <Form column={columns} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} />
      <TodoList setTodos={setTodos} todos={todos} />
      </div>
      <div style={{ display: 'flex' }}>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
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
                    {/* todos.filter(todo=>todo.column===column.id).map((todo, index)) */}
                    {todos.filter(todo => todo.column === column.id).map((todo, index) => {
                      return (
                        <Draggable key={todo.id} draggableId={todo.id} index={index} >
                            {(provided, snapshot) => {
                              return (
                                <div 
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect:'none',
                                    padding: 16,
                                    margin: '0 0 8px 0',
                                    minHeight: '50px',
                                    backgroundColor: snapshot.isDragging ? '#26384A' : '#456C86',
                                    color: 'white',
                                    ...provided.draggableProps.style
                                  }}
                                > 
                                {todo.text}
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
