import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Applicationlist() {
    const [ApplicationList, setApplicationList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/admin/home").then((response) => {
            console.log(response.data)
            if (response.data) {
                setApplicationList(response.data)
            }
        })

        console.log("hii hello")
        console.log(ApplicationList)
    }, [])

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-sky-900">
                                <tr>
                                    <th scope="col"className="px-6 py-3 text-xs font-bold text-left text-white uppercase ">S/No</th>
                                    <th scope="col"className="px-6 py-3 text-xs font-bold text-left text-white uppercase ">Name</th>
                                    <th scope="col"className="px-6 py-3 text-xs font-bold text-left text-white uppercase ">Email</th>
                                    <th scope="col"className="px-6 py-3 text-xs font-bold text-right text-white uppercase ">COMPANY NAME</th>
                                    <th scope="col"className="px-6 py-3 text-xs font-bold text-right text-white uppercase ">ACTIONS</th>
                                    </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {
                                    ApplicationList.map((obj, index) => {
                                        return (


                                            <tr>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{index+1}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{obj.name}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{obj.email}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{obj.company}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <a className="text-green-500 hover:text-green-700" href="#">OPEN</a>
                                                    <a className="text-sky-500 hover:text-sky-700 pl-10 pr-10" href="#"> APPROVE </a>
                                                    <a className="text-red-500 hover:text-red-700" href="#" > REJECT </a>
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
        </div>
    )
}

export default Applicationlist