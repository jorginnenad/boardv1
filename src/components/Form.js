import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({ priority, selectField, setSelectField, setInputText, inputText, column, setColumns }) => {



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
      date: startDate,
      priority: selectField.priority,
      desc: inputText.desc
    })
    setColumns(x)
  };

  const [startDate, setStartDate] = useState(new Date());

  return (

                    
    <div className="col-md-6">
    <div className="card">
        <div className="card-content collapse show">
            <div className="card-body">
                <form className="form">
                    <div className="form-body">
                        <h4 className="form-section"><i className="ft-user"></i> Task info</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input maxLength="100" id="title" name="title" value={inputText.title || ''} onChange={inputTextHandler} type="title" className="todo-input" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="users">Date</label>
                                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} minDate={startDate} />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="prioritys">Priority</label>
                                    <select id="prioritys" name="priority" value={selectField.priority || ''} onChange={selectHandler} className="form-control">
                                        <option value="0" disabled="">Unassgined</option>
                                        {priority.map((priority, index) => {
                                          return (
                                          <option key={index} name={priority.name} value={priority.name} disabled="">{priority.name}</option>
                                          )
                                        }
                                      )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc">Description</label>
                            <input id="desc" name="desc" type="desc" maxLength="1000" value={inputText.desc || ''} onChange={inputTextHandler} />
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
    
  );
}

export default Form;