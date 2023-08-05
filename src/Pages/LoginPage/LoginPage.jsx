import './LoginPage.scss'
import { Link, Navigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import Cookies from 'js-cookie';
import { UserContext } from '../../UserContext'
import { getUser } from '../../frontBackEndFunctions'
import Password from '../../Components/Password/Password'


const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const [loading, setLoading] = useState(false)
  const {setUserInfo} = useContext(UserContext)

  async function login(e){
    e.preventDefault()
    const response = await fetch(process.env.REACT_APP_BASEURL + '/login', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if(response.status === 404){
      alert("No such user")
      return
    }
    if (response.status === 400){
      alert("Wrong password")
      return
    }
    if (response.ok){
      response.json().then(async (userInfo) => {
        const token = userInfo; 
        Cookies.set('token', token, { expires: 1 }); 
        const myToken = Cookies.get()
        setLoading(true)
        const userResponse = await getUser(setUserInfo, myToken.token)
        if(userResponse){
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
        <small className="change-page">Don’t have an account? <Link to={'/signup'}>Sign up</Link></small>
      </form>
      <img className='side-elephant' src="https://cdn.pixabay.com/photo/2016/11/02/14/12/elephant-1791663_960_720.png" alt="elephant" />
    </div>
    }
    </>
   
  )
}

export default LoginPage