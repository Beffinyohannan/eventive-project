import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../api/axios'
import { UserContext } from '../../../Store/UserContext'
import { format } from 'timeago.js'
import Swal from 'sweetalert2'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import userInstance from '../../../axios/userAuth'

function Inbox() {

    const { userDetails, setUserDetails } = useContext(UserContext)
    const userId = userDetails._id
    const [state, setState] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({
        name: '', address: '', email: '',
        phone: '', companyname: '',
        //  Incubation: '',
        image: '', status: ''
    });
    const [approve, setApprove] = useState(false)


    const fullDetails = (id) => {
        state.filter((obj) => {
            if (obj._id === id) {
                setModalData({
                    name: obj.name, address: obj.address, email: obj.email,
                    phone: obj.phone, companyId: obj.companyId,
                    status: obj.status, budget: obj.budget, date: obj.date, guestNumber: obj.guestNumber,
                    food: obj.food, programme: obj.programme, camera: obj.camera, anchor: obj.anchor, venue: obj.venue, light: obj.light, guest: obj.guest
                })
                setShowModal(true)
            }
        })
    }

    const cancelEnquiry = (id) => {
        confirmAlert({
            title: 'Confirm your submit',
            message: 'Are you sure to Cancel the Enquiry.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        userInstance.put("/cancelEnquiry/" + id).then((response) => {
                            console.log(response, 'reject');
                            if (response.status == 200) {
                                // console.log(response.data, 'rejjjjjjjjjjjjjj');
                                setApprove(!approve)
                                // alert('Form Rejected Sucessfully')
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Form Cancelled Sucessfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } else {
                                // console.log('rejected not completed ');
                                // alert('Something Went Wrong')
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Something Went Wrong',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        }).catch((error) => {
                            console.log(error.message, 'rrrrrrrrrrrr');
                            // alert(error.message)
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: error.message,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        })
                    }
                },
                {
                    label: 'No',
                    // onClick: () => alert('Click No')
                }
            ]
        });

    }


    useEffect(() => {
        userInstance.get(`/inbox/${userId}`).then((res) => {
            // console.log(res.data);
            setState(res.data)
        })
    }, [approve])
    return (
        <div className="w-full md:w-4/5 min-h-screen mx-auto px-5 py-2 bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100 mb-5">
                <h2 className="font-semibold text-gray-800">Sented Enquiries</h2>
            </header>
            {
                state.map((obj, index) => {
                    return (

                        <div className=' flex justify-between  p-1 px-4 mb-3 bg-white   rounded-2xl border-slate-200 border-t shadow-md'>
                            <div className='ml-2 w-52'>
                                <h1 className='text-xl text-black font-medium pb-1 pt-1 cursor-pointer'>{obj.name}</h1>
                                {/* <h2>sent to : {obj.companyId.companyName} </h2> */}
                                <p>{format(obj.date)}</p>
                            </div>
                            <h2 className='my-4 w-20 md:w-44 font-medium'>{obj.companyId.companyName}</h2>
                            <div className='m-2 '>
                                <button className='ml-2 my-3 bg-blue-800 text-white px-6 py-0.5 rounded-xl' onClick={(e) => { fullDetails(obj._id) }}>View</button>
                                {obj.status == 'pending'?
                                <button className='ml-2 my-3 bg-slate-900 text-white px-5 py-0.5 rounded-xl' onClick={(e) => { cancelEnquiry(obj._id) }}>Cancel</button>:
                                <button className='ml-2 my-3 px-3 py-0.5 rounded-xl'>{obj.status}</button>
                                }



                            </div>
                        </div>

                        // <div className=' flex justify-between p-1 px-4 mb-3 bg-white   rounded-2xl border-slate-200 border-t shadow-md'>

                        //     <div className='ml-2'>
                        //         <h1 className='text-xl text-black font-medium pb-1 cursor-pointer'>{obj.name}</h1>
                        //         <p>{format(obj.date)}</p>
                        //     </div>
                        //     <div>
                        //         <h4 className='mt-2 py-2'>{obj.eventType}</h4>
                        //     </div>
                        //     <div className='m-2 flex'>
                        //         <button className='ml-6 my-2 bg-blue-800 text-white px-5 py-0.5 rounded-xl'  onClick={(e) => { fullDetails(obj._id) }}>View</button>
                        //         {obj.status=='cancelled'? 
                        //         <p className='px-5 py-3 font-semibold'>Cancelled</p>:
                        //         <button className='ml-6 my-2 bg-slate-900 text-white px-5 py-0.5 rounded-xl' onClick={(e) => { cancelEnquiry(obj._id) }}>Cancel</button>
                        //     }
                        //     </div>
                        // </div>
                    )
                })}

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
                                    <h3 className="text-3xl font-semibold">Details</h3>
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
                                        <tbody className='flex flex-col text-black'>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 '>Username : </th>
                                                <td width="200px">{modalData.name}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 '>Email : </th>
                                                <td width="200px">{modalData.email}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 '>Phone : </th>
                                                <td width="200px">{modalData.phone}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2  align-top'>Address : </th>
                                                <td width="200px">{modalData.address}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2   align-top'>Company Names : </th>
                                                {/* {modalData.companyId.map((obj, index) => {
                                                    return (
                                                        <div className='flex'>
                                                            <td width="200px">{obj.companyName}</td>
                                                        </div>
                                                    )
                                                })} */}
                                                <td width="200px">{modalData.companyId.companyName}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2  align-top'>Date : </th>
                                                <td width="200px">{modalData.date}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2  align-top'>Event Budget : </th>
                                                <td width="200px">{modalData.budget}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2  align-top'>No of Guest : </th>
                                                <td width="200px">{modalData.guestNumber}</td>
                                            </tr>

                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 '>Status : </th>
                                                <td width="200px">{modalData.status}</td>
                                            </tr>
                                            <tr className='pt-2 flex flex-col'>
                                                <th className='text-right pr-2 w-[36%] underline'>Need Things  </th>
                                                <td width="200px">{modalData.food}</td>
                                                <td width="200px">{modalData.venue}</td>
                                                <td width="200px">{modalData.guest}</td>
                                                <td width="200px">{modalData.light}</td>
                                                <td width="200px">{modalData.programme}</td>
                                                <td width="200px">{modalData.camera}</td>
                                                <td width="200px">{modalData.anchor}</td>
                                            </tr>

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

export default Inbox