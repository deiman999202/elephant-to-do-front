import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import IndexPage from './Pages/IndexPage/IndexPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import DashboardPage from './Pages/DashboardPage/DashboardPage'
import { UserContextProvider } from './UserContext'
import { TodoContextProvider } from './TodoContext'

const App = () => {
  return (
    <UserContextProvider>
      <TodoContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<RegisterPage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
          </Route>
        </Routes>
      </TodoContextProvider>
    </UserContextProvider>
  )
}

export default App