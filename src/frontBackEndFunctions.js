export const baseUrl = "https://elephant-to-do-back.onrender.com"

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

  export async function getUser(setUserInfo){
        await fetch(baseUrl + '/profile', {
        credentials: 'include'
      }).then(response => {
        response.json().then(info => {
          setUserInfo(info)
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