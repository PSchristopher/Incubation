import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import jwtDecode from 'jwt-decode'




function Home() {
    const navigate = useNavigate()
    const initialValues = { Uname: "", address: "", city: "", state: "", email: "", phone: "", company: "", image: "", incubation: "" }
    const [values, setValues] = useState(initialValues)
    const [Something, setSomething] = useState('')

    useEffect(() => {
        userAuthenticeted()
    }, [])

    const userAuthenticeted = () => {
        axios.get("http://localhost:5000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((response) => {
            if (response.data.auth) {
                
                setSomething(jwtDecode(localStorage.getItem("token")).user)

                navigate('/')
            }
            else navigate('/login')
        });
    };
    const logout = () => {

        Swal.fire({
            title: 'Do you want to save the changes?',
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            // denyButtonText: `Don't save`,
        }).then((result) => {

            if (result.isConfirmed) {
                Swal.fire('LOGGED OUT!', 'C U AGAIN', 'success')
                // } else if (result.isDenied) {
                //   Swal.fire('Changes are not saved', '', 'info')
                localStorage.removeItem('token');
                navigate("/login");
            }
        })


    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
        console.log(values);
    }
    // const fileUpload = (e) => {
    //     console.log(e.target.files[0].name)

    //     setValues({
    //         ...values,
    //         image: e.target.files[0]
    //     })
    // }
    const handleSubmit = (e) => {
        e.preventDefault()
        setValues(values)
        console.log(values);
        axios.post('http://localhost:5000/', { ...values }).then((response) => {
        })
        navigate('/success')
    }
    return (

        <div>
            <nav className='flex gap-72  h-16 place-items-center bg-sky-200'>
                <div className='text-2xl font-bold ml-6'>
                    <h2>REVA NEST</h2>
                </div>
                <div className='menu '>
                    {/* <ul className='flex gap-4 ml-4'>
                        <li>
                            <a>HOME</a>
                        </li>
                        <li>
                            <a>ABOUT</a>
                        </li>
                        <li>
                            <a>SERVICE</a>
                        </li>
                    </ul> */}
                </div>
                <div className='user '>
                    <h2 className=''>Welcome : {Something}   </h2>
                </div>
                <div>
                    <button onClick={logout}>
                        LOGOUT
                    </button>
                </div>
            </nav>
            <form onSubmit={handleSubmit}>
                <div className='flex place-content-center flex-col items-center '>
                    <h1 className='text-2xl font-bold'>INCUBATION</h1>
                    <div className='w-2/5 pt-8 '>
                        <div className='bg-gray-100  grid grid-cols-2  pt-6'>
                            <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="text" name='Uname' placeholder='Name' value={setValues.Uname} required onChange={handleChange} />
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>

                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="text" name='address' placeholder='Address  ' value={setValues.address} required onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-100  grid grid-cols-2 '>
                            <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="text" name='city' placeholder='City' value={setValues.city} required onChange={handleChange} />
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="text" name='state' placeholder='State' value={setValues.state} required onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-100  grid grid-cols-2 '>
                            <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="email" name='email' placeholder='Email' value={setValues.email} required onChange={handleChange} />
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="number" name='phone' placeholder='Phone Number' value={setValues.phone} required onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-100  grid grid-cols-2 '>
                            <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="text" name='company' placeholder='Company Name' value={setValues.company} required onChange={handleChange} />
                                </div>
                            </div>
                            {/* <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="file" name='image' placeholder='Image' onChange={fileUpload} />
                                </div>
                            </div> */}
                        </div>
                        <p className='bg-gray-100 pl-6 pb-3'>Type of Incubation Needed :</p>
                        <div className='bg-gray-100 flex gap-3  pl-6 pb-3'>
                            <div>
                                <label for='physical'>Physical </label>
                                <input id='physical' name='incubation' value={"physical"} type="radio" required onChange={handleChange} />
                            </div>
                            <div>
                                <label for='virtual'>Virtual </label>
                                <input id='virtual' name='incubation' value={"virtual"} type="radio" required onChange={handleChange} />
                            </div>

                        </div>
                        <div className='bg-gray-100 flex gap-2  pl-4  '>
                            <div className='px-5 w-fit mx-auto pb-5'>
                                <button className='border-2 text-sky-300  border-sky-300 rounded-full px-12 py-2 inline-block font-semibold hover:bg-sky-300 hover:text-white' >Submit</button>
                            </div>
                        </div>

                    </div>
                </div>
            </form >
        </div>

    )
}

export default Home