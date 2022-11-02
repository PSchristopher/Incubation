import React from 'react'
import SideNav from '../../components/Navbar'
import Head from '../../components/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

function Admindashboard() {
    const navigate = useNavigate()
    
    useEffect(() => {
        userAuthenticeted()
    }, [])

    const userAuthenticeted = () => {
        axios.get("http://localhost:5000/admin/isAdminAuth", {
            headers: {
                "x-access-token": localStorage.getItem("adminToken"),
            },
        }).then((response) => {
            console.log(response);
            if (response.data.auth) {
                navigate('/admin/applicationlist')
                console.log(response.data.auth)
            } else { navigate('/adminlogin') }
        });
    };
    
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