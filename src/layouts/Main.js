import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Main = () => {
    return (
        <div>
            <Header />
            <div id="layoutSidenav" className='pt-2'>
                <Sidebar />
                <div style={{height:"calc(100vh - 16vh)", overflowY: "scroll", width:"100%"}}>
                <Outlet />
                </div>
                
            </div>
            <nav className="navbar sticky-bottom navbar-light bg-light d-flex justify-content-center " style={{height:"10px"}}>
                <a className="navbar-brand center mt-1" href="#">Ban Công nghệ thông tin Quân khu 7</a>
            </nav>
        </div>
    )
}

export default Main