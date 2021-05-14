import React, {useState} from "react";
import uuid from 'uuid/v4';

const Form = ({ status, setStatus, setUser, user, selectField, setSelectField, setInputText, inputText, column, setColumns }) => {

  const [state, setstate] = useState(0)

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setInputText({
      ...inputText,
      [name]: value
    });
  };

  const selectHandler = (e) => {
    const { name, value } = e.target;

      setSelectField({
        ...selectField,
        [name]: value
      });
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    setInputText("");
    setSelectField("");
    
    const x = { ...column }
    x.todo.items.push({
      title: inputText.title,
      desc: inputText.desc,
      user: selectField.user,
      status: selectField.status
    })
    setColumns(x)
  };

  return (

                    
    <div className="col-md-6">
    <div className="card">
      <button
      onClick={() => setstate(1)}
      ></button>
        <div className="card-content collapse show">
            <div className="card-body">
                <form className="form">
                    <div className="form-body">
                        <h4 className="form-section"><i className="ft-user"></i> Task info</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input id="title" name="title" value={inputText.title || ''} onChange={inputTextHandler} type="title" className="todo-input" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="users">Users</label>
                                    <select id="users" name="user" value={selectField.user || ''} onChange={selectHandler} className="form-control">
                                    <option value="none" disabled="">Unassgined</option>
                                    {user.map((user, index) => {
                                      return (
                                        <option key={index} value={user.id} disabled="">{user.name}</option>
                                        )
                                    }
                                    )}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select id="status" name="status" value={selectField.status || ''} onChange={selectHandler} className="form-control">
                                        <option value="0" disabled="">Unassgined</option>
                                        {status.map((status, index) => {
                                          return (
                                          <option key={index} name={status.name} value={status.id} disabled="">{status.name}</option>
                                          )
                                        }
                                      )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc">Description</label>
                            <input id="desc" name="desc" type="desc" value={inputText.desc || ''} onChange={inputTextHandler} />
                        </div>
                        <button onClick={submitTodoHandler} className="todo-button" type="submit">
                        <i className="fas fa-plus-square"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
    
    // <form className="modal-form">
    //   <div>
    //   <span>Title:</span>
    //   <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
    //   </div>
    //   <div>
    //   <span>Description:</span>
    //   <textarea />
    //   </div>
    //   <div>
    //   <form className="select-form">
    //     <label>User:</label>
    //   <select>
    //     <option value="nenad">Nenad</option>
    //     <option value="dragan">Dragan</option>
    //     <option value="dejan">Dejan</option>
    //   </select>
    //   <label>Status:</label>
    //   <select>
    //     <option value="todo">To Do</option>
    //     <option value="in-progress">In progress</option>
    //     <option value="done">Done</option>
    //   </select>
    //   </form>
    //   </div>
    //   <button onClick={submitTodoHandler} className="todo-button" type="submit">
    //     <i className="fas fa-plus-square"></i>
    //   </button>
    // </form>
  );
}

export default Form;