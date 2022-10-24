import React from 'react'

function header() {
    return (
        <div>
            <nav className='flex justify-between pr-5  h-16 place-items-center bg-dark-purple '>
                <div className='text-2xl  font-bold ml-6 text-center'>
                    <h2 className='text-white '>REVA NEST</h2>
                </div>
              
                <div >
                    <button className='text-dark-purple bg-white text-md h-6 w-24 rounded-lg '>
                        LOGOUT
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default header