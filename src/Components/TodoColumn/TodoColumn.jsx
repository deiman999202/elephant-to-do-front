import React, { useState, useContext } from 'react'
import './TodoColumn.scss'
import AddTodo from '../AddTodo/AddTodo'
import { getTodo } from '../../frontBackEndFunctions'
import TodoUnit from './TodoUnit'
import { TodoContext } from '../../TodoContext'
import arrowIcon from "../../images/arrow-down-svgrepo-com.png"

const TodoColumn = ({username, isLong}) => {

  const {todoArr, setTodoArr} = useContext(TodoContext)
  const [showEditCloseAdd, setShowEditCloseAdd] = useState(false)
  const [showDoneTodo, setShowDoneTodo] = useState(false)
  const [showUndoneTodo, setShowUndoneTodo] = useState(false)

  async function changeChecked({_id, title, description}){
    await fetch('https://elephant-to-do-back.onrender.com/todo', {
      method: 'PUT',
      body: JSON.stringify({id: _id, title, description, changeState: true}),
      headers: {'Content-Type': 'application/json'}
    })
    getTodo(setTodoArr, username)
  }

  return (
    <>
        <h2>Your todos</h2>
              <div className="todo-column">
                <div className="list-of-todos">
                <h3>Your undone tasks  {isLong && <img className={showUndoneTodo ? "rotate" : ""} onClick={() => setShowUndoneTodo(!showUndoneTodo)} src={arrowIcon} alt='arrow down' />}</h3>
                <div className="todo-set">
                {showUndoneTodo || !isLong && todoArr.map(todo => {
                    if (todo.isDone === false){
                      return <TodoUnit key={todo._id} todo={todo} changeChecked={() => changeChecked(todo)} isChecked={false} noDescription={false} username={username}setShowEditCloseAdd={setShowEditCloseAdd} />
                    }
                  }).reverse()}
                </div>
                <h3>Your done tasks {isLong && <img className={showDoneTodo ? "rotate" : ""} onClick={() => setShowDoneTodo(!showDoneTodo)} src={arrowIcon} alt='arrow down' />}</h3>
                <div className="todo-set">
                {showDoneTodo || !isLong && todoArr.map(todo => {
                  if (todo.isDone === true){
                    return <TodoUnit key={todo._id} todo={todo} changeChecked={() => changeChecked(todo)} isChecked={true} noDescription={true} username={username} />
                  }
                }).reverse()}
                </div>
                </div>
        </div>
        {!showEditCloseAdd
          &&
          <div className="todo-adding">
            <AddTodo username={todoArr[0].author} setShowEditCloseAdd={setShowEditCloseAdd} />
          </div>
        }
    </>
  )
}

export default TodoColumn