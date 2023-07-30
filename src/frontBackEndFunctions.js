import { Navigate } from "react-router-dom"

export async function getTodo(setTodoArr, username){
    await fetch(process.env.REACT_APP_BASEURL + '/authtodo', {
      method: 'POST',
      body: JSON.stringify({username}),
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      response.json().then(todo => {
        setTodoArr(todo)
      })
    })
    return "okay"
  }

  export async function getUser(setUserInfo, token = ""){
        await fetch(process.env.REACT_APP_BASEURL + '/profile', {
        method: 'POST',
        body: JSON.stringify({token}),
        headers: {'Content-Type': 'application/json'}
      }).then(response => {
        response.json().then(info => {
          setUserInfo(info.userDoc)
        })
      }).catch(() => {
        return 0
      })
    return "okay"
}

export async function fetchLogout(){
  await fetch(process.env.REACT_APP_BASEURL + '/logout', {
    method: 'POST',
    credentials: "include"
  })
  return <Navigate to={'/'} />
}