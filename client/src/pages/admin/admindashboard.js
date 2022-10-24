import React from 'react'
import SideNav from '../../components/Navbar'
import Head from '../../components/header'
import { Outlet } from 'react-router-dom'

function admindashboard() {
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

export default admindashboard