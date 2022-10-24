import React from 'react'


function home() {
    return (

        <div>
            <nav className='flex gap-80  h-16 place-items-center bg-sky-200'>
                <div className='text-2xl font-bold ml-6'>
                    <h2>REVA NEST</h2>
                </div>
                <div className='menu '>
                    <ul className='flex gap-4 ml-4'>
                        <li>
                            <a>HOME</a>
                        </li>
                        <li>
                            <a>ABOUT</a>
                        </li>
                        <li>
                            <a>SERVICE</a>
                        </li>
                    </ul>
                </div>
                <div className='user'>
                    <h2>WELCOME : </h2>
                </div>
                <div>
                    <button>
                        LOGOUT
                    </button>
                </div>
            </nav>
            <form action="">
                <div className='flex place-content-center flex-col items-center '>
                    <h1 className='text-2xl font-bold'>INCUBATION</h1>
                    <div className='w-2/5 pt-8 '>
                        <div className='bg-gray-100  grid grid-cols-2  pt-6'>
                            <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="text" name='name' placeholder='Name'  />
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>

                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="text" name='address' placeholder='Address  '  />
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-100  grid grid-cols-2 '>
                            <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="text" name='city' placeholder='City'  />
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="text" name='state' placeholder='State'  />
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-100  grid grid-cols-2 '>
                            <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="email" name='email' placeholder='Email'  />
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="number" name='phone' placeholder='Phone Number' />
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-100  grid grid-cols-2 '>
                            <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="text" name='company' placeholder='Company Name'  />
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='bg-white w-64 p-2 flex items-center mb-3'>
                                    <input type="file" name='image' placeholder='Image'  />
                                </div>
                            </div>
                        </div>
                        <p className='bg-gray-100 pl-6 pb-3'>Type of Incubation Needed :</p>
                        <div className='bg-gray-100 flex gap-3  pl-6 pb-3'>
                            <div>
                                <label for='physical'>Physical </label>
                                <input id='physical' name='radio' type="radio" />
                            </div>
                            <div>
                                <label for='virtual'>Virtual </label>
                                <input id='virtual' name='radio' type="radio" />
                            </div>

                        </div>
                        <div className='bg-gray-100 flex gap-2  pl-4  '>
                            <div className='px-5 w-fit mx-auto pb-5'>
                                <button className='border-2 text-sky-300  border-sky-300 rounded-full px-12 py-2 inline-block font-semibold hover:bg-sky-300 hover:text-white'>Submit</button>
                            </div>
                        </div>

                    </div>
                </div>
            </form >
        </div>

    )
}

export default home