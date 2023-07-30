export const baseUrl = "http://localhost:5000"

//"https://elephant-to-do-back.onrender.com"

export async function getTodo(setTodoArr, username){
    await fetch(baseUrl + '/authtodo', {
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
        await fetch(baseUrl + '/profile', {
        method: 'POST',
        body: JSON.stringify({token}),
        headers: {'Content-Type': 'application/json'}
      }).then(response => {
        response.json().then(info => {
          setUserInfo(info.userDoc)
        })
      })
    return "okay"
}

export async function fetchLogout(){
  await fetch(baseUrl + '/logout', {
    method: 'POST',
    credentials: "include"
  })
}