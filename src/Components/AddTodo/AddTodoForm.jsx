import './AddTodo.scss'

const AddTodoForm = ({description, setDescription, title, setTitle, asyncFunc, name="Add todo", setCloseValue}) => {

  return (
    <div className="form-bg">
          <form className='add-todo-form' onSubmit={asyncFunc} >
            <input type="text" placeholder='Title' required value={title} onChange={(e) => setTitle(e.target.value)} autoFocus/>
            <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className="buttons">
              <button onClick={() => {setCloseValue(false)}} className='cancel'>Cancel</button>
              <button className='orange-btn'>{name}</button>
            </div>
        </form>
    </div>
  )
}

export default AddTodoForm
