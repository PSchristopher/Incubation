import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Header() {

  const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('adminToken');
        navigate("/adminlogin");
    };
    return (
        <div>
            <nav className='flex justify-between pr-5  h-16 place-items-center bg-dark-purple '>
                <div className='text-2xl  font-bold ml-6 text-center'>
                    <h2 className='text-white '>REVA NEST</h2>
                </div>
              
                <div >
                    <button onClick={logout} className='text-dark-purple bg-white text-md h-6 w-24 rounded-lg '>
                        LOGOUT
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Header