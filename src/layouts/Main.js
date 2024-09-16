import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Main = () => {
    return (
        <div>
            <Header />
            <div id="layoutSidenav" className='pt-1 mb-1'>
                <Sidebar />
                <div style={{height:"calc(100vh - 9vh)", overflowY: "scroll", width:"100%"}}>
                <Outlet />
                </div>
                
            </div>
            {/* <nav className="sticky-bottom navbar-light bg-light d-flex justify-content-center mt-0 mb-0" style={{height:"12px"}}>
                <a className="navbar-brand center mt-3" href="#">Ban Công nghệ thông tin Quân khu 7</a>
            </nav> */}
        </div>
    )
}

export default Main