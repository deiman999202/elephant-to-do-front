import './DashboardPage.scss'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { fetchLogout } from '../../frontBackEndFunctions'
import { UserContext } from '../../UserContext'


const DashboardPage = () => {
    const {userInfo, setUserInfo} = useContext(UserContext)

    async function deleteUser(){
        await fetch (process.env.REACT_APP_BASEURL + '/user', {
            method: "DELETE",
            body: JSON.stringify({id: userInfo._id}),
            headers: {'Content-Type': 'application/json'}
        })
        setUserInfo({})
        fetchLogout()
        return <Navigate to={'/'} />
    }
  return (
    <section>
        <h1>Your dashboard</h1>
        <div className="options">
            <span>If you want to delete you account click here --{'>'} </span> <button onClick={deleteUser} className='orange-btn'>Delete account</button>
        </div>
    </section>
  )
}

export default DashboardPage