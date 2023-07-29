import { useState, useEffect } from 'react'
import './RegisterPage.scss'
import { Link, Navigate } from 'react-router-dom'
import Password from '../../Components/Password/Password'
import { baseUrl } from '../../frontBackEndFunctions'


const RegisterPage = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
 



  async function signup(e){
    e.preventDefault()
    await fetch(baseUrl + '/signup', {
      method: 'POST',
      body: JSON.stringify({email, password, username}),
      headers: {'Content-Type': 'application/json'}
    })

    setRedirect(true)
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

 

  return (
    <div className="register">
      <form onSubmit={signup}>
        <h1>Sign Up</h1>
        <label className='input-name' htmlFor='name'>Your name</label> <input id='name' type="text" autoFocus placeholder='Enter your email' required value={username} onChange={e => setUsername(e.target.value)}/>
        <label className='input-name' htmlFor='email'>Email</label> <input id='email' type="email"  placeholder='Enter your email' required value={email} onChange={e => setEmail(e.target.value)}/>
        <Password password={password} setPassword={setPassword}/>
        <button className='orange-btn register'>Sign up</button>
        <small>By continuing with Google, Apple, or Email, you agree to Elephant To-do's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a> .</small>
        <small className="change-page">Already signed up? <Link to={'/login'}>Go to login</Link></small>
      </form>
      <img className='side-elephant' src="https://cdn.pixabay.com/photo/2016/11/02/14/12/elephant-1791663_960_720.png" alt="elephant" />
    </div>
    
  )
}

export default RegisterPage