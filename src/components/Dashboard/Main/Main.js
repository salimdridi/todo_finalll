import React, { useState, useEffect } from 'react'
import "./Main.css"
import NewTask from "../NewTask/NewTask"
import Card from "../Card/Card";
import moment from "moment";
import { useAuth } from "../../../context/AuthContext"
import { db } from "../../../firebase_config";



const Menu = () => {

  const [menu_tasks, setMenu_tasks] = useState(true);
  const [menu_progress, setMenu_progress] = useState(false);
  const [menu_completed, setMenu_completed] = useState(false);
  const [menu_today, setMenu_today] = useState(false);
  const [menu_tomorrow, setMenu_tomorrow] = useState(false);
  const [menu_month, setMenu_month] = useState(false);
  const [newTask, setNewTask] = useState(false)
  const [todos, setTodos] = useState([]);
  
  const { currentUser } = useAuth();


  // Date variables
  let tomorrow = new Date();
  tomorrow.setDate(new Date().getDate()+1);
  const date = new Date(), y = date.getFullYear(), m = date.getMonth();
  const lastDay = new Date(y, m + 1, 0);
  
  // Handle click on New Task.
  const handleNewTask = () => {
    setNewTask(!newTask);
  }

  const handleProgess = () => {
    setMenu_tasks(false)
    setMenu_progress(true)
    setMenu_completed(false)
    setMenu_today(false)
    setMenu_tomorrow(false)
    setMenu_month(false)
  }
  const handleCompleted = () => {
    setMenu_tasks(false)
    setMenu_progress(false)
    setMenu_completed(true)
    setMenu_today(false)
    setMenu_tomorrow(false)
    setMenu_month(false)
  }
  const handleAllTasks = () => {
    setMenu_tasks(true)
    setMenu_progress(false)
    setMenu_completed(false)
    setMenu_today(false)
    setMenu_tomorrow(false)
    setMenu_month(false)
  }
  const handleTommorow = () => {
    setMenu_tasks(false)
    setMenu_progress(false)
    setMenu_completed(false)
    setMenu_today(false)
    setMenu_tomorrow(true)
    setMenu_month(false)
  }
  const handleMonth = () => {
    setMenu_tasks(false)
    setMenu_progress(false)
    setMenu_completed(false)
    setMenu_today(false)
    setMenu_tomorrow(false)
    setMenu_month(true)
  }
  const handleWeek = () => {
    setMenu_tasks(false)
    setMenu_progress(false)
    setMenu_completed(false)
    setMenu_today(true)
    setMenu_tomorrow(false)
    setMenu_month(false)
  }
  

  useEffect(() => {
    getTodos();    
 }, []) // blank to run only on first time

 // Get Todos
 const  getTodos = () => {
   db.collection(currentUser.uid).orderBy("timestamp").onSnapshot(function(querySnapshot) {
     setTodos(
       querySnapshot.docs.map((doc) => ({
         id: doc.id,
         title: doc.data().title,
         todo: doc.data().todo,
         timestamp: doc.data().timestamp,
         inprogress: doc.data().inprogress,
         importance: doc.data().importance
       }))
     );
   });
 }


  return (
    <div id="main" >
      <div className="menu" >
        <div className="container" >
            <h3 className="managment" >Tasks Managment</h3>
            <div className={menu_tasks ? 'content active_color' : "content noactive_color"} onClick={handleAllTasks} >
                <div  className={menu_tasks ? 'task-icon active_color' : "task-icon noactive_color"} >
                  <span className={menu_tasks ? 'active_color' : "noactive_color"}  ></span>
                  <span className={menu_tasks ? 'active_color' : "noactive_color"} ></span>
                  <span className={menu_tasks ? 'active_color' : "noactive_color"} ></span>
                </div>
                <h3 className={menu_tasks ? 'active_color' : null} >All Tasks</h3>
            </div>
            <div className={menu_progress ? 'content active_color' : "content noactive_color"} onClick={handleProgess} >
                <div  className={menu_progress ? 'progress-icon active_color' : "progress-icon noactive_color"} >
                  <span className={menu_progress ? 'active_color' : "noactive_color"}  ></span>         
                </div>
                <h3 className={menu_progress ? 'active_color' : "noactive_color"} >In Progress</h3>
            </div>
            <div className={menu_completed ? 'content active_color' : "content noactive_color"} onClick={handleCompleted}>
                <div  className={menu_completed ? 'completed-icon active_color' : "completed-icon noactive_color"} ></div>
                <h3 className={menu_completed ? 'active_color' : "noactive_color"} >Completed</h3>
            </div>
            <div className={menu_today ? 'content active_color' : "content noactive_color"} onClick={handleWeek}>
                <div  className={menu_today ? 'date-icon active_color' : "date-icon noactive_color"} >0</div>
                <h3 className={menu_today ? 'active_color' : "noactive_color"} >Today</h3>
            </div>
            <div className={menu_tomorrow ? 'content active_color' : "content noactive_color"} onClick={handleTommorow}>
                <div  className={menu_tomorrow ? 'date-icon active_color' : "date-icon noactive_color"} >1</div>
                <h3 className={menu_tomorrow ? 'active_color' : "noactive_color"} >Tommorow</h3>
            </div>
            <div className={menu_month ? 'content active_color' : "content noactive_color"} onClick={handleMonth}>
                <div  className={menu_month ? 'date-icon active_color' : "date-icon noactive_color"} >30</div>
                <h3 className={menu_month ? 'active_color' : "noactive_color"} >Month</h3>
            </div>
        </div>
      </div>
      <div className="tasks" >
        <div className="container" >
           <div className="content " >
             <div className="title" >
               {menu_tasks && <h2>All Tasks <span className="count-todos" >({todos.length})</span></h2>}
               {menu_progress && <h2>In Progress</h2>}
               {menu_completed && <h2>Completed</h2>}
               {menu_today && <h2>Today</h2>}
               {menu_tomorrow && <h2>Tommorow</h2>}
               {menu_month && <h2>Month</h2>}
             </div>
             <button onClick={handleNewTask} >+ New Task</button>
           </div>
           {newTask && <NewTask handleNewTask={handleNewTask}/>}

            <div className="tasky" >
              <div className="tasky-content" >
                  { menu_tasks &&
                  todos.map((todo) => (
                    <Card {...todo} key={todo.id} />
                  ))
                }
                {
                  menu_progress && 
                  todos.filter((todo) => {
                    return todo.inprogress === true;
                  }).map(todo => (
                    <Card {...todo} key={todo.id} />
                  ))
                }
                {
                  menu_completed && 
                  todos.filter((todo) => {
                    return todo.inprogress === false;
                  }).map(todo => (
                    <Card {...todo} key={todo.id} />
                  ))
                }
                {
                  menu_today && todos.filter((todo) => {
                    return moment(todo.timestamp.toDate()).format("L") == moment(new Date()).format("L");
                  }).map(todo => (
                    <Card {...todo} key={todo.id} />
                  ))
                }
                {
                  menu_tomorrow && todos.filter((todo) => {
                    return moment(todo.timestamp.toDate()).format("L") == moment(tomorrow).format("L");
                  }).map(todo => (
                    <Card {...todo} key={todo.id} />
                  ))
                }
                {
                  menu_month && todos.filter((todo) => {
                    return moment(todo.timestamp.toDate()).format("L") <= moment(lastDay).format("L");
                  }).map(todo => (
                    <Card {...todo} key={todo.id} />
                  ))
                }   
              </div>
                     
            </div>
        </div> 
      </div>
    </div>
  )
}

export default Menu
