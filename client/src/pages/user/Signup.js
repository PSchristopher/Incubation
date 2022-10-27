import React, { useState, useEffect } from 'react'
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate()
    const initialValues = { userName: "", email: "", phone: "", password: "" }
    const [formValues, setformValues] = useState(initialValues)
    const [logErr, setLogErr] = useState({
        userName: true,
        email: true,
        password: true,
        phone: true,
        msg: ''
    })

    useEffect(() => {
        userAuthenticeted()
    }, [])

    const userAuthenticeted = () => {
        axios.get("http://localhost:5000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((response) => {
            if (response.data.auth) navigate('/')
            else navigate('/signup')
        });
    };


    const handleChange = (e) => {

        const { name, value } = e.target
        setformValues({ ...formValues, [name]: value })

        console.log(formValues)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formValues.userName == '') {
            setLogErr({
                userName: false,
                email: true,
                password: true,
                phone: true,
                msg: 'Name is required'
            })
        } else if (formValues.userName.length < 3) {
            setLogErr({
                userName: false,
                email: true,
                password: true,
                phone: true,
                msg: 'Minimum length is 3'
            })
        } else if (!formValues.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
            setLogErr({
                userName: true,
                email: false,
                password: true,
                phone: true,
                msg: 'Email is required'
            })
        } else if (formValues.password.length < 6) {
            setLogErr({
                userName: true,
                email: true,
                password: false,
                phone: true,
                msg: 'Minimum length is 6 '
            })
        } else if (formValues.phone.length < 10) {
            setLogErr({
                userName: true,
                email: true,
                password: false,
                phone: true,
                msg: 'Mobile number must be 10 digits '
            })
        } else {
            setformValues(formValues)


            axios.post('http://localhost:5000/signup', { ...formValues }).then((data) => {
                if (data.data.msg) {
                    setLogErr({
                        userName: true,
                        email: false,
                        password: true,
                        phone: true,
                        msg: 'This mail id is already used'
                    })
                } else {
                    setLogErr({
                        userName: true,
                        email: true,
                        password: true,
                        phone: true,
                        msg: ''
                    })
                    console.log(data.data);
                    navigate('/login')
                }
            }).catch(error => console.log(error))
            // }
        }
    }


    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100'>
            <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
                <div className='bg-white rounded-2xl shadow-2xl flex flex-row w-2/3 max-w-4xl'>

                    <div className='w-2/5 bg-sky-900 text-white rounded-l-2xl py-36 px-12'>
                        <h2 className='text-3xl  font-bold mb-2'>Hello Friends !</h2>
                        <div className='border-2 w-10 border-white inline-block mb-1'></div>
                        <p className='mb-10'>IF You already Own a account Sign in bellow</p>
                        <Link to='/login' className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-sky-900'>Sign In</Link>
                    </div>
                    <div className='w-3/5 p-5'>
                        <div className='text-right font-bold'>
                            MY <span className='text-sky-900'> INCUB</span>
                        </div>
                        <div className='py-10'>
                            <h2 className='text-3xl font-bold text-sky-900 mb-2'>Sign Up To Create</h2>
                            <div className='border-2 w-20 border-sky-900 inline-block'></div>
                            {/* <div className='flex justify-center my-2'>
                                <a href='' className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                                    <FaFacebookF className='text-sm' />
                                </a>
                                <a href='' className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                                    <FaLinkedinIn className='text-sm' />
                                </a>
                                <a href='' className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                                    <FaGoogle className='text-sm' />
                                </a>
                            </div> */}
                            <p className='text-gray-400 my-3'>Or use your email Account</p>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col items-center'>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'><FaRegEnvelope className='text-gray-400 m-3' />
                                        <input type="name" name='userName' placeholder='Username' className=' bg-gray-100 flex-1' value={formValues.userName} onChange={handleChange} />
                                    </div>
                                    <p className='font-normal text-xs m-0  mb-3 text-left text-red-600'>{logErr.userName ? '' : logErr.msg}</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'><FaRegEnvelope className='text-gray-400 m-3' />
                                        <input type="email" name='email' placeholder='Email' className=' bg-gray-100 flex-1' value={formValues.email} onChange={handleChange} />
                                    </div>
                                    <p className='font-normal text-xs m-0  mb-3 text-left text-red-600'>{logErr.email ? '' : logErr.msg}</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'><FaRegEnvelope className='text-gray-400 m-3' />
                                        <input type="number" name='phone' placeholder='Mobile' className=' bg-gray-100 flex-1' value={formValues.phone} onChange={handleChange} />

                                    </div>
                                    <p className='font-normal text-xs m-0  mb-3 text-left text-red-600'>{logErr.phone ? '' : logErr.msg}</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'><MdLockOutline className='text-gray-400 m-3' />
                                        <input type="password" name='password' placeholder='Password' className=' bg-gray-100 flex-1' value={formValues.password} onChange={handleChange} />

                                    </div>
                                    <p className='font-normal text-xs m-0  mb-3 text-left text-red-600'>{logErr.password ? '' : logErr.msg}</p>
                                    {/* <div className='flex justify-between w-64 mb-5'>
                                        <label className='flex items-center text-xs'>
                                            <input type='checkbox' name='remember' className='mr-1' />Remember Me
                                        </label>
                                        <a href='#' className='text-xs'>Forgot Password</a>
                                    </div> */}
                                    <button className='border-2 border-sky-900 rounded-full px-12 py-2 inline-block font-semibold hover:bg-sky-900 hover:text-white'>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Signup