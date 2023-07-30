import './LoginPage.scss'
import { Link, Navigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie';
import { UserContext } from '../../UserContext'
import { getUser, baseUrl } from '../../frontBackEndFunctions'
import Password from '../../Components/Password/Password'


const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const [loading, setLoading] = useState(false)
  const {setUserInfo} = useContext(UserContext)

  async function login(e){
    e.preventDefault()
    const response = await fetch(baseUrl + '/login', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if (response.ok){
      response.json().then(async (userInfo) => {
        const token = userInfo; // Replace 'your_token_here' with the actual token value
        Cookies.set('token', token, { expires: 1 }); // 'token' is the cookie name, and { expires: 7 } means the cookie will expire after 7 days
        const myToken = Cookies.get()
        setLoading(true)
        const userResponse = await getUser(setUserInfo, myToken.token)
        if(userResponse){
          console.log(userInfo)
          setLoading(false)
          setRedirect(true)
        }
        
      })
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <>
      {loading
    ?
    <div className="loader-container"></div>
    :
    <div className="login">
      <form onSubmit={login}>
        <h1>Login</h1>
        <label className='input-name' htmlFor='email'>Email</label> <input id='email' type="email"  placeholder='Enter your email' required value={email} onChange={e => setEmail(e.target.value)}/>
        <Password password={password} setPassword={setPassword}/>
        <button className='orange-btn'>Log in</button>
        <small>By continuing with Google, Apple, or Email, you agree to Elephant To-do's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a> </small>
        <small className="change-page">Don’t have an account? <Link to={'/signup'}>Sign up</Link></small>
      </form>
      <img className='side-elephant' src="https://cdn.pixabay.com/photo/2016/11/02/14/12/elephant-1791663_960_720.png" alt="elephant" />
    </div>
    }
    </>
   
  )
}

export default LoginPage