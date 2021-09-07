import React, {useState, useEffect} from 'react'
import "./Card.css";
import { db } from "../../../firebase_config";
import { useAuth } from "../../../context/AuthContext"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faClock, faTrashAlt, faFlag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from "moment"

library.add(fab)


const Card = ({ id, inprogress, title, todo, timestamp, importance }) => {

  const { currentUser } = useAuth();

  const [flagColor, setFlagColor] = useState("");


  const  deleteTodo = () => {
 
      db.collection(currentUser.uid).doc(id).delete();

  }

  const toggleProgress = () => {

   
      db.collection(currentUser.uid).doc(id).update({
        inprogress: !inprogress
      })

  }

  // Get Color Flag
  useEffect(()=> {
    if(importance == 1) {
    setFlagColor("green");
  }else if(importance == 2){
    setFlagColor("orange");
  }else if(importance == 3){
    setFlagColor("red");
  }
  }, [])
  

  return (
    <div className="card" >
      <div className="card__container" >
        <div className="into" >
          <div>
            <div className="title" >
              <h2>{title}</h2>
            </div>  
            <FontAwesomeIcon title="delete" className="delete" onClick={deleteTodo} icon={faTrashAlt}  />
          </div>
          <div className={todo.length > 100 ? ' text scroll' : "text noscroll"}  >
            <p>{todo}</p>
          </div>
        </div>
        <div className="into into__down" >
          <div className="time" >
            <FontAwesomeIcon icon={faClock}  />
            <h4>{moment(timestamp.toDate()).format('L')}</h4>
          </div>   
          <div className="flag" >
            <FontAwesomeIcon 
              icon={faFlag} className={flagColor} />
          </div>  
          <div onClick={toggleProgress} className={inprogress ? "completed" : "completed gray"}>

          </div>      
        </div> 
      </div>
    </div>
    
  )
}

export default Card
