export async function getTodo(setTodoArr, username){
    await fetch('https://elephant-to-do-back.onrender.com/authtodo', {
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
        await fetch('https://elephant-to-do-back.onrender.com/profile', {
        credentials: 'include'
      }).then(response => {
        response.json().then(info => {
          setUserInfo(info)
        })
      })
    return "okay"
}

export async function fetchLogout(){
  await fetch('https://elephant-to-do-back.onrender.com/logout', {
    method: 'POST',
    credentials: "include"
  })
}