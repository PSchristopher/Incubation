import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactJsAlert from "reactjs-alert"
import { useNavigate } from 'react-router-dom'

function CreateSlots() {
    
    const navigate = useNavigate()
    const initialValues = { slotCode: '', slotNo: '', status: '' }
    const [formValues, setFormvalues] = useState(initialValues)
    const [slotError, setslotError] = useState('')

    const [status, setStatus] = useState(false);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        userAuthenticeted()
    }, [navigate])

    const userAuthenticeted = () => {
        axios.get("http://localhost:5000/admin/isAdminAuth", {
            headers: {
                "x-access-token": localStorage.getItem("adminToken"),
            },
        }).then((response) => {
            console.log(response);
            if (response.data.auth) {
                navigate('/admin/createSlot')
                console.log(response.data.auth)
            } else { navigate('/adminlogin') }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormvalues({ ...formValues, [name]: value })

    }
    const handleSubmit = (e) => {

        e.preventDefault()
        axios.post('http://localhost:5000/admin/create_slot', { ...formValues }).then((response) => {
            console.log(response.data)
            if (response.data.msg) {

                setslotError(response.data.message)
                setStatus(true)
                setType("error")
                setTitle(response.data.message)

                setFormvalues(initialValues)
            } else {


                setStatus(true)
                setTitle(response.data.message)
                setType("success")
                setFormvalues(initialValues)
            }

        }).catch((err) => {
            console.log(err.response, 'tttttt');
            alert(err.response.data)
            setFormvalues(initialValues)
        })
    }


    return (


        <div className=' flex flex-col justify-center h-full'>


            <form onSubmit={handleSubmit} className='h-full' >


                <div className='w-[30%] mx-auto shadow py-4 px-7 flex items-center flex-col'>
                    {status ? <ReactJsAlert
                        status={status} // true or false
                        type={type} // success, warning, error, info
                        title={title}
                        Close={() => setStatus(false)} />
                        : null}
                    <h2 className='mb-9 text-2xl font-semibold'>Create Slot</h2>
                    <div className="mb-6">
                        <label htmlFor="username-success" className=" mb-2 text-sm font-medium text-green-700 dark:text-green-500">Slot Code</label>
                        <input type="text" name='slotCode' id="username-success" className="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-26 p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Slot Code.." value={formValues.slotCode} onChange={handleChange} required/>

                    </div>
                    <div>
                        <label htmlFor="username-error" className=" mb-2 text-sm font-medium text-red-700 dark:text-red-500">SlotNo</label>
                        <input type="number" name='slotNo' id="username-error" className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-26 p-2.5 dark:bg-red-100 dark:border-red-400" placeholder="Slot No." value={formValues.slotNo} onChange={handleChange} required/>

                    </div>

                    <button className='w-40 my-5 py-2 bg-blue-700 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>SUBMIT</button>
                </div>
            </form>

        </div>

    )
}

export default CreateSlots