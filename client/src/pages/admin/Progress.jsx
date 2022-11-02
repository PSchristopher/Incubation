import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Progress() {
    const navigate = useNavigate()
    const [applicationList, setApplicationList] = useState([]);

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
                navigate('/admin/progress')
                console.log(response.data.auth)
            } else { navigate('/adminlogin') }
        });
    };

    useEffect(() => {
      axios.get('http://localhost:5000/admin/progress').then((response)=>{
        console.log(response.data)
        setApplicationList(response.data)
      })
    
    }, [])
    
    return (
        <div>
            <div>

                <section className="py-1 bg-blueGray-50">
                    <div className="w-full">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                            <div className="rounded-t mb-0 px-4 py-3 border-0 bg-[#3b87ce]">
                                <div className="flex flex-wrap items-center">
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                        <h3 className="font-semibold text-base text-blueGray-700">Appliction List</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="block w-full overflow-x-auto">
                                <table className="items-center bg-transparent w-full border-collapse ">
                                    <thead>
                                        <tr>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                SI NO
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Name
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Email
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                company_name
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Status </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            applicationList.map((list, index) => {
                                                return (
                                                    <tr className='border-b-2  capitalize'>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{index + 1}</td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list.name}</td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list.email}</td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list.company}</td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 w-[30%]" >
                                                            <div className="mb-1 text-base font-medium  capitalize dark:text-white"><small>{list.status}</small></div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                                                                <div className={` h-2.5 rounded-full ${list.status === "approved" ? "w-[75%] bg-blue-600 dark:bg-blue-500" : list.status === "rejceted" ? "w-[50%] bg-red-600 dark:bg-red-500" : list.status === "pending" ? "w-[25%] bg-orange-600 dark:bg-orange-500" : list.status === "booked" ? "w-[100%] bg-green-600 dark:bg-green-500" : ''}`}></div>
                                                            </div>
                                                        </td>
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
            </div>
        </div>
    )
}

export default Progress