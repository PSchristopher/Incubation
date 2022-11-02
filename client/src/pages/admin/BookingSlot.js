import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';




function BookingSlot() {
    const navigate = useNavigate()
    const [sloatBooking, setsloatBooking] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [appList, setappList] = useState([])
    const [apps, setapps] = useState(false)
    const [selected, setSelected] = useState({
        id: '',
        index: ''
    })
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
                navigate('/admin/bookingSlots')
                console.log(response.data.auth)
            } else { navigate('/adminlogin') }
        });
    };
    useEffect(() => {

        axios.get('http://localhost:5000/admin/showSlots').then((response) => {

            setsloatBooking(response.data)
        })

        axios.get('http://localhost:5000/admin/approved').then((response) => {
            console.log("response")
            console.log(response)
            setappList(response.data)
        })

        return () => {
            setapps(false)
        }
    }, [apps])
    const fullDetails = (no) => {
        setSelected({
            ...selected,

            index: no
        })
        setShowModal(true)
    }
    const bookSloat = () => {
        axios.get(`http://localhost:5000/admin/slotBooking?slotId=${selected.index}&companyId=${selected.id}`).then((response => {
           
            setSelected({
                id: '',
                index: ''
            })
            setShowModal(false)
            setapps(true)
        })).catch(error => console.log(error))

    }
    return (
        <div>
            <section className="py-1 bg-blueGray-50">
                <div className="w-full">
                    <div className="relative grid p-5 grid-cols-10 text-center min-w-0 break-words bg-white w-full mb-4 shadow-lg rounded ">
                        {
                            sloatBooking.map((items) => {
                                return (
                                    <div className={`h-[100px] w-[100px] hover:cursor-pointer flex items-center mb-4 justify-center bg-sky-500  ${items.status ? "bg-gray-400" : "bg-blue-500"} `} onClick={() => { items.status ? alert("This sloat is Already Booked") : fullDetails(items.slotNo) }} > {items.slotNo}</div>
                                )
                            })
                        }

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
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full min-w-[400px] bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Modal Title
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex justify-center">
                                    <select label="Select Version border-solid border-2 border-gray "
                                        onChange={(e) => {
                                            setSelected({
                                                ...selected,
                                                id: e.target.value,
                                            })
                                        }}
                                    >
                                        <option hidden selected value='' >Select</option>
                                        {
                                            appList.map((iteams, index) => {
                                                return (
                                                    <option value={iteams._id}  >{iteams.company}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => selected.id != '' ? bookSloat() : ''}
                                    >
                                        Save
                                    </button>
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

export default BookingSlot