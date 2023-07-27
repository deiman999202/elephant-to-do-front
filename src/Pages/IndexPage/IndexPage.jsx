import './IndexPage.scss'
import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../UserContext'
import { TodoContext } from '../../TodoContext'
import checkedIcon from '../../images/archive-check-svgrepo-com.png'
import TodoColumn from '../../Components/TodoColumn/TodoColumn'
import AddTodo from '../../Components/AddTodo/AddTodo'
import { getTodo } from '../../frontBackEndFunctions'
import elephantIcon from '../../images/elephant-svgrepo-com.png'
import quotationMark from '../../images/right-quotation-sign-svgrepo-com.png'

const IndexPage = () => {
  const {userInfo} = useContext(UserContext)
  const {todoArr, setTodoArr} = useContext(TodoContext)
  const [quoteObj, setQuoteObj] = useState({})
  async function getQuote(){
    await fetch('https://api.quotable.io/random').then(response => {
      response.json().then(quoteData => setQuoteObj(quoteData))
    })
  }

  const username = userInfo?.username

  useEffect(() => {
    if (username){
        getTodo(setTodoArr, username)
    }
  }, [username])

  useEffect(() => {
    getQuote()
  }, [])

  return (
    <div className="index">
      {
        username
        ? 
        <div className="to-do-list">
            <>
              {todoArr.length > 0
              ?
                <TodoColumn username={username} />
              :
              <>
              <img className='no-todo-icon' src={checkedIcon} alt="All done" />
                <h2>No to-do tasks. Add your first one</h2>
                <AddTodo setTodoArr={setTodoArr} username={username} />
               </>
              }
            </>
        </div>
        :
      <div className="index-elements">
        <h1>Organize your <br /> work and life, finally.</h1>
        <p>Never forget your tasks like an elephant with Elephant To-do. The world’s #1 task manager and to-do list app.</p>
        <Link to={'/signup'}> <button className="orange-btn index-btn">Start for free</button></Link>
      </div>
      }
    {quoteObj 
      &&
      username
      &&
    <div className="quoteBlock">
        <img className='quote-icon' src={elephantIcon} alt="Elephant" />
        <h2><img className="quotation-mark" src={quotationMark} alt="quotation mark" /> {quoteObj.content}</h2>
        <h3>{quoteObj.author}</h3>
    </div>
    }
    </div>
  )
}

export default IndexPage