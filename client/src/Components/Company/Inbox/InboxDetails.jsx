import React, { useContext, useState } from 'react'
import { format } from 'timeago.js'
import Moment from 'moment'
import Swal from 'sweetalert2'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from '../../../api/axios';
import { approveEnq, rejectEnq } from '../../../api/CompanyRequest';
import SecondModal from './SecondModal';
import { CompanyContext } from '../../../Store/CompanyContext';
import { approveQuotation, rejectQuotation } from '../../../api/UserRequest';
import { Link } from 'react-router-dom';

function InboxDetails({ user, data, approved, pending, approve, setApprove }) {
    console.log(user);

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [showSecondModal, setShowSecondModal] = useState(false)
    // const [approve, setApprove] = useState(false)

    const { companyDetails, setCompanyDetails } = useContext(CompanyContext)
    const companyId = companyDetails?._id




    const fullDetails = (id) => {
        if (user) {
            setModalData({
                companyName: data.companyId.companyName, date:data.date, foodAmount: data.foodAmount, guestAmount: data.guestAmount, lightAmount: data.lightAmount,
                programmeAmount: data.programmeAmount, cameraAmount: data.cameraAmount, anchorAmount: data.anchorAmount, note: data.note, username: data.username,status: data.status
            })
        } else {

            setModalData({
                name: data.name, username: data.userId.username, address: data.address, email: data.email,
                phone: data.phone, companyname: data.companyId.companyName,
                status: data.status, budget: data.budget, date: data.date, guestNumber: data.guestNumber, eventType: data.eventType,
                food: data.food, programme: data.programme, camera: data.camera, anchor: data.anchor, venue: data.venue, light: data.light, guest: data.guest
            })
        }
        setShowModal(true)

    }

    const approveEnquiry = (id) => {
        confirmAlert({
            title: 'Confirm your submit',
            message: 'Are you sure to Accept.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        if (user) {
                            const { data } = await approveQuotation(id)
                            if (data.update == true) {
                                console.log(data.data, 'heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
                                setApprove(!approve)
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Form Accepted Sucessfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
    
                            } else {
                                console.log(' error somthing went wrong');
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Something Went Wrong',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
    
                            }
                        }else{
                            const { data } = await approveEnq(id)
                            if (data.update == true) {
                                console.log(data.data, 'heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
                                setApprove(!approve)
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Form Accepted Sucessfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
    
                            } else {
                                console.log(' error somthing went wrong');
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Something Went Wrong',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
    
                            }
                        }
                        

                    }
                },
                {
                    label: 'No',
                    // onClick: () => alert('Click No')
                }
            ]
        });
    }

    const rejectEnquiry = (id) => {
        confirmAlert({
            title: 'Confirm your submit',
            message: 'Are you sure to Reject.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        if (user) {
                            const { data } = await rejectQuotation(id)
                            if (data.update == true) {
                                console.log(data.data, 'rejjjjjjjjjjjjjj');
                                setApprove(!approve)
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Form Rejected Sucessfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } else {
                                console.log('rejected not completed ');
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Something Went Wrong',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        }else{
                            const { data } = await rejectEnq(id) 
                            if (data.update == true) {
                                console.log(data.data, 'rejjjjjjjjjjjjjj');
                                setApprove(!approve)
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Form Rejected Sucessfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } else {
                                console.log('rejected not completed ');
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Something Went Wrong',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        }

                    }
                },
                {
                    label: 'No',
                    // onClick: () => alert('Click No')
                }
            ]
        });
    }

    const [userId, setUserId] = useState('')
    const replayEnquiry = (id) => {
        console.log('12345678');
        // <SecondModal user={id}/>
        setShowSecondModal(true)
        setUserId(id)


    }

    const initialValues = { foodAmount: "", venueAmount: "", programmeAmount: "", lightAmount: "", guestAmount: "", cameraAmount: "", anchorAmount: "", note: "", username: "" }
    const [formValues, setFormValues] = useState(initialValues)

    const handleChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
        console.log(formValues);

    }

    const handleSubmit = (id) => {
        // e.preventDefault()

        axios.post(`/company/eventQuotation?userId=${userId}&companyId=${companyId}`, { ...formValues }).then((res) => {
            console.log(res);
            if (res.data.form == 'sended') {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'form submitted sucessfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                setFormValues('')
                setShowSecondModal(false)

                // console.log(formValues);
            }
        })
    }

    return (
        <>
        <div className=' flex justify-between p-1 px-4 mb-3 bg-white   rounded-2xl border-slate-200 border-t shadow-md'>
            <div className='ml-2 w-52'>
                <h1 className='text-xl text-black font-medium pb-1 pt-1 cursor-pointer'>{user ? data.companyId.companyName : data.name}</h1>
                <p>{format(data.date)}</p>
            </div>
            <h2 className='mt-4'>{data.eventType}</h2>
            <div className='m-2'>
                <button className='ml-2 my-3 bg-blue-800 text-white px-6 py-0.5 rounded-xl' onClick={(e) => { fullDetails(data._id) }}>View</button>
                {pending ?
                    <span>
                        <button className='ml-2 my-3 bg-slate-900 text-white px-3 py-0.5 rounded-xl' onClick={(e) => { approveEnquiry(data._id) }}>Accept</button>
                        <button className='ml-2 my-3 bg-gray-600 text-white px-5 py-0.5 rounded-xl' onClick={(e) => { rejectEnquiry(data._id) }}>Reject</button>
                    </span>
                    : ''}
                {approved ?
                    (user?
                        <Link to={'/chat'} className='ml-2 my-3 bg-slate-900 text-white px-3 py-0.5 rounded-xl' >Message</Link>
                        :
                        <button className='ml-2 my-3 bg-slate-900 text-white px-3 py-0.5 rounded-xl' onClick={(e) => { replayEnquiry(data.userId._id) }}>Replay</button>
                        )
                    : ""
                    }
            </div>
        </div>
        {user ?
                <div>
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
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                            <table>
                                                <tbody className='flex flex-col '>
                                                    <tr className='pt-2'>
                                                        <th className='text-right pr-2 '>Company Name : </th>
                                                        <td width="200px">{modalData.companyName}</td>
                                                    </tr>
                                                    <tr className='pt-2'>
                                                        <th className='text-right pr-2 '>Date : </th>
                                                        <td width="200px">{modalData.date}</td>
                                                    </tr>
                                                    <tr className='pt-2'>
                                                        <th className='text-right pr-2  align-top'>Event Type : </th>
                                                        <td width="200px">{modalData.eventType}</td>
                                                    </tr>
                                                    <tr className='pt-2'>
                                                        <th className='text-right pr-2 '>User Name : </th>
                                                        <td width="200px">{modalData.username}</td>
                                                    </tr>
                                                    <tr className='pt-2'>
                                                        <th className='text-right pr-2 '>Food Arrangements : </th>
                                                        <td width="200px">{modalData.foodAmount}</td>
                                                    </tr>
                                                    <tr className='pt-2'>
                                                        <th className='text-right pr-2  align-top'>Guest Management : </th>
                                                        <td width="200px">{modalData.guestAmount}</td>
                                                    </tr>
                                                    

                                                    <tr className='pt-2'>
                                                        <th className='text-right pr-2  align-top'>Light Arrangements : </th>
                                                        <td width="200px">{modalData.lightAmount}</td>
                                                    </tr>
                                                    <tr className='pt-2'>
                                                        <th className='text-right pr-2  align-top'>Programme  : </th>
                                                        <td width="200px">{modalData.programmeAmount}</td>
                                                    </tr>
                                                    <tr className='pt-2'>
                                                        <th className='text-right pr-2  align-top'>Photography Work : </th>
                                                        <td width="200px">{modalData.cameraAmount}</td>
                                                    </tr>
                                                    <tr className='pt-2'>
                                                        <th className='text-right pr-2  align-top'>Anchoring  : </th>
                                                        <td width="200px">{modalData.anchorAmount}</td>
                                                    </tr>

                                                    <tr className='pt-2'>
                                                        <th className='text-right pr-2 '>Status : </th>
                                                        <td width="200px">{modalData.status}</td>
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
                :

                <div>
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
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                            <table>
                                                <tbody className='flex flex-col '>
                                                    <tr className='pt-2'>
                                                        <th className='text-right pr-2 '>Name : </th>
                                                        <td width="200px">{modalData.name}</td>
                                                    </tr>
                                                    <tr className='pt-2'>
                                                        <th className='text-right pr-2 '>username : </th>
                                                        <td width="200px">{modalData.username}</td>
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
                                                        <th className='text-right pr-2  align-top'>Event Type : </th>
                                                        <td width="200px">{modalData.eventType}</td>
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
                                                        <th className='text-right pr-2 w-[35%] underline'>Need Things  </th>
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
            }

            {showSecondModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">


                                {/*body*/}
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none" id="modal">
                                    <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                                        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400  ">
                                            {/* <div className="w-full flex justify-start text-gray-600 mb-3">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width="52" height="52" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                                                <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                                                            </svg>
                                                        </div> */}
                                            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Enter Quotation Details</h1>
                                            <form >
                                                <div className='w-4/5 flex flex-col pt-4'>
                                                    <div className='flex gap-3 justify-between'>
                                                        <div>
                                                            <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Description</label>
                                                            <p className='pt-5  text-black'>Food Arrangements</p>
                                                        </div>
                                                        <div>
                                                            <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Amount</label>
                                                            <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border-b" placeholder="₹" name='foodAmount' value={formValues.foodAmount} onChange={handleChange} />
                                                        </div>

                                                    </div>
                                                    <div className='flex gap-5 justify-between'>
                                                        <div>
                                                            <p className='pt-5  text-black'>venue Decoration</p>
                                                        </div>
                                                        <div>
                                                            <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border-b" placeholder="₹" name='venueAmount' value={formValues.venueAmount} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-3 justify-between'>
                                                        <div>
                                                            <p className='pt-5  text-black'>Guest Management</p>
                                                        </div>
                                                        <div>
                                                            <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border-b" placeholder="₹" name='guestAmount' value={formValues.guestAmount} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-3 justify-between'>
                                                        <div>
                                                            <p className='pt-5  text-black'>Programme Management</p>
                                                        </div>
                                                        <div>
                                                            <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border-b" placeholder="₹" name='programmeAmount' value={formValues.programmeAmount} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-3 justify-between'>
                                                        <div>
                                                            <p className='pt-5  text-black'>Light Arrangements</p>
                                                        </div>
                                                        <div>
                                                            <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border-b" placeholder="₹" name='lightAmount' value={formValues.lightAmount} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-3 justify-between'>
                                                        <div>
                                                            <p className='pt-5  text-black'>Photography</p>
                                                        </div>
                                                        <div>
                                                            <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border-b" placeholder="₹" name='cameraAmount' value={formValues.cameraAmount} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-3 justify-between'>
                                                        <div>
                                                            <p className='pt-5  text-black'>Anchoring</p>
                                                        </div>
                                                        <div>
                                                            <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border-b" placeholder="₹" name='anchorAmount' value={formValues.anchorAmount} onChange={handleChange} />
                                                            <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 items-center pl-3 text-sm border-gray-300 rounded border-b hidden" name='username' value={formValues.username} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                </div>


                                                <label for="Note" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Note</label>
                                                <div className="relative mb-5 mt-2">

                                                    <input id="Note" type='text' className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="" name='note' value={formValues.note} onChange={handleChange} />
                                                </div>
                                                <div className="flex items-center justify-start w-full">
                                                    <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm cursor-pointer" onClick={handleSubmit}>Submit</p>
                                                    {/* <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onclick="modalHandler()">Cancel</button> */}
                                                </div>
                                            </form>
                                            <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={() => setShowSecondModal(false)} >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <line x1="18" y1="6" x2="6" y2="18" />
                                                    <line x1="6" y1="6" x2="18" y2="18" />
                                                </svg>
                                            </button>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>

            ) : null}
        </>
    )
}

export default InboxDetails