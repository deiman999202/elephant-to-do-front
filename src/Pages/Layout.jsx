import React from 'react'
import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'


const Layout = () => {
  let {pathname} = useLocation()
  return (
    <main className={pathname === "/signup" || pathname === "/login" ? "registration" : ""}>
        <Header />
        <Outlet />
        <Footer />
    </main>
  )
}

export default Layout