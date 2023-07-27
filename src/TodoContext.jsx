import { createContext, useState } from "react";

export const TodoContext = createContext([])

export function TodoContextProvider({children}){
    const [todoArr, setTodoArr] = useState([])
    return(
        <TodoContext.Provider value={{todoArr, setTodoArr}}>
            {children}
        </TodoContext.Provider>
    )
}