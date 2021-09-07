import React, { useState } from 'react'
import "./NewTask.css";
import { useAuth } from "../../../context/AuthContext"
import { db } from "../../../firebase_config";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';




const NewTask = ({handleNewTask}) => {

  
  const [todoInput, setTodoInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const { currentUser } = useAuth();

  const [selectedDate, handleDateChange] = useState(new Date());
  
  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [importance, setImportance] = React.useState('');

  const handleChange = (event) => {
    setImportance(event.target.value);
  };

  const handleClose = () => {
    handleNewTask();
  }

  const addTodo = (e) => {

    if(titleInput && todoInput && importance) {
      handleNewTask();
    
    
      db.collection(currentUser.uid).add({
        inprogress: true,
        timestamp: selectedDate,
        title: titleInput,
        todo: todoInput,
        importance: importance
      });

      setTitleInput("");
      setTodoInput("");
    } else {
      alert("fill in all fields or click x to exit")
    }

    e.preventDefault();

    

  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <div id="new-task" >
       <div className="newTask" >
       <div className="input-content" >
         <h3>Title</h3>
         <input 
          className="title-input"
          onChange={(e) => setTitleInput(e.target.value)}
          value={titleInput} 
          type="text" 
          placeholder="What needs be done ?" />
       </div>
       <div className="input-content" >
         <h3>Description</h3>
          <textarea 
          onChange={(e) => setTodoInput(e.target.value)}
          value={todoInput} 
          type="text"  
          placeholder="Description about this task" ></textarea>
       </div>
       <div className="input-content" >
         <h3>Date picker</h3>
            <KeyboardDatePicker
            className="date-picker"
            value={selectedDate}
            onChange={date => handleDateChange(date)}
            minDate={new Date()}
            
            format="MM/dd/yyyy"
          />
       </div>
       <div className="input-content">
         <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Importance</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={importance}
            onChange={handleChange}
          >
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>Hight</MenuItem>
          </Select>
         </FormControl>
       </div>
       <button className="btnNew" onClick={addTodo} >Add New Task</button>
       <p onClick={handleClose} className="close" >X</p>
      </div>
    </div>
  </MuiPickersUtilsProvider>  
  )
}

export default NewTask
