import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  let {pathname} = useLocation()
  return (
    <main className={pathname === "/signup" || pathname === "/login" ? "registration" : ""}>
        <Header />
        <Outlet />
    </main>
  )
}

export default Layout