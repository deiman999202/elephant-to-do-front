import React, {useState} from 'react'
import "./Password.scss"
import eyeOn from '../../images/eye-svgrepo-com.png'
import eyeOff from '../../images/eye-off-svgrepo-com.png'

const Password = ({password, setPassword}) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    

  return (
    <div className="password-input"> <label htmlFor="password" className='input-name'>Password</label>  <input id='password' type={passwordVisible ? "text" : "password"} placeholder='Enter your password' minLength={8} required value={password} onChange={e => setPassword(e.target.value)}/> <img onClick={() => setPasswordVisible(!passwordVisible)} className='password-eye' src={passwordVisible ? eyeOn : eyeOff} alt="eye" /></div> 
  )
}

export default Password