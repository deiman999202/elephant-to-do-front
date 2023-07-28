import {useState, useContext} from 'react'
import './AddTodo.scss'
import blackPlusSign from '../../images/black-plus-svgrepo-com.png'
import AddTodoForm from './AddTodoForm'
import { getTodo } from '../../frontBackEndFunctions'
import { TodoContext } from '../../TodoContext'


const AddTodo = ({username, setShowEditCloseAdd}) => {

    const [addingTodoActive, setAddingTodoActive] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const {setTodoArr} = useContext(TodoContext)

    async function addTodo(e){
        e.preventDefault()
        await fetch('https://elephant-to-do-back.onrender.com/todo', {
          method: 'POST',
          body: JSON.stringify({title, description, author: username}),
          headers: {'Content-Type': 'application/json'}
        })
        setAddingTodoActive(false)
        getTodo(setTodoArr, username)
        setTitle("")
        setDescription("")
      }
  
    return (
        <>
            {
                addingTodoActive
                ?
                <AddTodoForm asyncFunc={addTodo} description={description} setDescription={setDescription} title={title} setTitle={setTitle} setCloseValue={setAddingTodoActive} />
                :
                <img className="addTodo" onClick={() => setAddingTodoActive(true)} src={blackPlusSign} alt="Add to-do" />
            }
            </>
    )
}

export default AddTodo