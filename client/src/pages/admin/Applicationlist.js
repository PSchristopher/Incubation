import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Applicationlist() {
    const navigate = useNavigate()
    const [ApplicationList, setApplicationList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [apps, setapps] = useState(false)
    const [modalData, setModalData] = useState({
        name: '', address: '', email: '',
        phone: '', company_name: '', Incubation: '',
        status: ''
    });
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
                navigate('/admin/applicationlist')
                console.log(response.data.auth)
            } else { navigate('/adminlogin') }
        });
    };

    useEffect(() => {

        axios.get("http://localhost:5000/admin/home").then((response) => {
            console.log(response.data)
            if (response.data) {
                setApplicationList(response.data)
            }
        })
        return () => { setapps(false) }
    }, [apps])

    const fullDetails = (id) => {
        ApplicationList.filter((obj) => {
            console.log(obj);
            if (obj._id === id) {
                setModalData({
                    name: obj.name, address: obj.address, email: obj.email,
                    phone: obj.phone, company_name: obj.company, Incubation: obj.incubation,
                    status: obj.status
                })
                setShowModal(true)
            }
        })
    }
    const approveForm = (id) => {
        console.log(id);
        Swal.fire({
            title: 'Are you sure to Approve?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Approved!',
                    'Your file has been Approved.',
                    'success'
                )
                axios.post('http://localhost:5000/admin/approve/' + id).then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        console.log("changed")
                        alert("The slected Form has been approved successfully")
                        setapps(true)
                    } else {
                        alert("Something went wrong")
                    }
                })
            }
        })

    }
    const rejectForm = (id) => {

        Swal.fire({
            title: 'Are you sure to Reject?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Rejected!',
                    'Your file has been Rejected.',
                    'success'
                )

                axios.post("http://localhost:5000/admin/reject/" + id).then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        console.log("mattitund")
                        alert("The selected Form has been rejected successfully")
                        setapps(true)
                    } else {
                        alert("Something wnet wrong ")
                    }
                })
            }
        })


    }

    return (
        <div>

            <section className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg">

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-sky-900">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-white uppercase ">S/No</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-white uppercase ">Name</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-white uppercase ">Email</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-white uppercase ">COMPANY NAME</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-white uppercase "></th>
                                        <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-white uppercase ">ACTION</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-white uppercase "></th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {
                                        ApplicationList.map((obj, index) => {
                                            return (


                                                <tr>

                                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{index + 1}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{obj.name}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{obj.email}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{obj.company}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"><button className="text-green-500 hover:text-green-700" onClick={() => { fullDetails(obj._id) }} >OPEN</button> </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"><button className="text-sky-500 hover:text-sky-700 pl-10 pr-10" onClick={() => { approveForm(obj._id) }} > APPROVE </button> </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"><button className="text-red-500 hover:text-red-700" onClick={() => { rejectForm(obj._id) }} > REJECT </button> </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">{modalData.company_name}</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ??
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <table>
                                        <tbody className='flex flex-col '>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Name : </th>
                                                <td width="200px">{modalData.name}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Email : </th>
                                                <td width="200px">{modalData.email}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Phone : </th>
                                                <td width="200px">{modalData.phone}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%] align-top'>Address : </th>
                                                <td width="200px">{modalData.address}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Incubation : </th>
                                                <td width="200px"> {modalData.Incubation}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Status : </th>
                                                <td width="200px">{modalData.status}</td>
                                            </tr>
                                            {/* <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%] align-top'>Logo : </th>
                                                <td width="200px"><img src={`/images/${modalData.image}`} alt="" className='w-[100px] ' /></td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    )
}

export default Applicationlist