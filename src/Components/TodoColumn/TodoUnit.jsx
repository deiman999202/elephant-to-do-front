import {useState, useContext} from 'react'
import { getTodo } from '../../frontBackEndFunctions'
import AddTodoForm from '../AddTodo/AddTodoForm'
import { TodoContext } from '../../TodoContext'
import unChecked from '../../images/checkbox-unchecked-svgrepo-com.png'
import checked from '../../images/checkbox-check-svgrepo-com.png'
import deleteIcon from '../../images/delete-1487-svgrepo-com.png'
import editIcon from "../../images/edit-svgrepo-com.png"
import arrowIcon from "../../images/arrow-down-svgrepo-com.png"

const TodoUnit = ({todo, changeChecked, isChecked, noDescription, username, setShowEditCloseAdd}) => {
  const [editingTodo, setEditingTodo] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)
  const [showDesc, setShowDesc] = useState(false)
  const {setTodoArr} = useContext(TodoContext)

  async function deleteTodo(id){
    await fetch('https://elephant-to-do-back.onrender.com/todo', {
      method: "DELETE",
      body: JSON.stringify({id}),
      headers: {'Content-Type': 'application/json'}
    })
    await getTodo(setTodoArr, username)
  }

  async function editTodo(e){
    e.preventDefault()
    await fetch('http://localhost:5000/todo', {
      method: 'PUT',
      body: JSON.stringify({id: todo._id, title, description, changeState: false}),
      headers: {'Content-Type': 'application/json'}
    })
    setEditingTodo(false)
    setShowEditCloseAdd(false)
    await getTodo(setTodoArr, username)
  }

  return (
    <>
    {editingTodo
      ?
      <AddTodoForm asyncFunc={editTodo} title={title} setTitle={setTitle} description={description} setDescription={setDescription} name={"Edit Todo"} setCloseValue={setEditingTodo}/>
      :
      <span key={todo._id}> 
        <div className="todo-dashboard">
            <div className="todo-info">
                <img className="checkbox" onClick={(e) => changeChecked(todo._id)} src={isChecked ? checked : unChecked} alt="is done" /> 
                <p>{todo.title}</p>
            </div>
            <div className="todo-tools">
              {todo.description && todo.isDone === false && <img onClick={() => setShowDesc(!showDesc)} className={showDesc ? "rotate" : ""} src={arrowIcon} alt="arrow" />}
              {todo.isDone === false && 
              <img onClick={() => {
                setEditingTodo(true)
                setShowEditCloseAdd(true)
                }} 
              src={editIcon} alt="edit" />}
              <img onClick={() => deleteTodo(todo._id)} src={deleteIcon} alt="delete" />
            </div>
        </div>
            {todo.description !== "" && !noDescription && <div className={showDesc ? "description" : "invisible"}> <i>Description:</i> {todo.description} </div>}    
    </span>
    }
    </>
  )
}

export default TodoUnit