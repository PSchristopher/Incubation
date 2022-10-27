import React from 'react'
import SideNav from '../../components/Navbar'
import Head from '../../components/Header'
import { Outlet } from 'react-router-dom'

function Admindashboard() {
    return (
        <div className='flex'>

            <SideNav />
            <div className='flex-1' >
                <Head />
                <div className='p-8'>
                   <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Admindashboard