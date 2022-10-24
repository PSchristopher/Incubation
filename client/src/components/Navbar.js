

import React, { useState } from 'react'
import {FaFirstdraft,FaAtlas,FaCubes,FaFileAlt,FaDatabase} from 'react-icons/fa'


function Navbar() {
    const [open, setOpen] = useState(true)
    const Menus = [
        { title: 'Application List', src: <FaAtlas/> },
        { title: 'Approved List', src: <FaFirstdraft/> },
        { title: 'Rejected List', src: <FaCubes/> },
        { title: 'Booking Slots', src:  <FaDatabase/>  },
        { title: 'Progress', src:  <FaFileAlt/>  },
    ]
    return (
        <div >
           
            <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen p-5 pt-8 bg-dark-purple relative`}>
                <img src='/assets/control.png' className={`absolute cursor-pointer rounded-full right-0.5 top-9 w-7 border-2 border-dark-purple ${!open && "rotate-180"} `}
                    onClick={() => { setOpen(!open) }} />
                <div className='flex gap-x-4 items-center'>
                    <img src='./assets/logo.png' className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"} `} />
                    <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>Admin</h1>
                </div>
                <ul className='pt-16'>
                    {Menus.map((menu, index) => (
                        <li key={index} className={`text-gray-300 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-5 ${index === 0 && 'bg-lime-white'}`}  >
                            {menu.src}
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
           
            
        </div>
    )
}

export default Navbar