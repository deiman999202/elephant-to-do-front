export async function getTodo(setTodoArr, username){
    await fetch('http://localhost:5000/authtodo', {
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
        await fetch('http://localhost:5000/profile', {
        credentials: 'include'
      }).then(response => {
        response.json().then(info => {
          setUserInfo(info)
        })
      })
    return "okay"
}

export async function fetchLogout(){
  await fetch('http://localhost:5000/logout', {
    method: 'POST',
    credentials: "include"
  })
}