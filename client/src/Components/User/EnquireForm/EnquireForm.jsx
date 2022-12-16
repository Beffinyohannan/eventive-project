import React, { useContext, useState } from 'react'
import axios from '../../../api/axios'
import { UserContext } from '../../../Store/UserContext'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'


function EnquireForm() {

    const initialValues = { name: "", email: "", phone: "", eventDate: "", guestNumber: "", budget: "", eventType: "", address: "", food: "", venue: "", programme: "", light: "", guest: "", camera: "", anchor: "", other: "", notes: "" }
    const [formValues, setFormValues] = useState(initialValues)
    const { userDetails, setUserDetails } = useContext(UserContext)
    const userId = userDetails._id
    const [state, setState] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [com, setCom] = useState([])
    const navigate = useNavigate()



    const handleChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
        console.log(formValues);

    }
    const fullDetails = (e) => {
        e.preventDefault()
        axios.get('/view-companies').then((res) => {
            console.log(res.data);
            setState(res.data)
        })
        setShowModal(true)

    }
    const handleCompany = (id) => {
        setCom([...com, 
         id
        ])
    }
    console.log(com, '000000000000000');

//   const  companyData=[
//         ...com
    
//   ]

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`/eventEnquire?userId=${userId}&companyId=${formValues}`,{com,...formValues}).then((res) => {
            console.log(res);
            if (res.data.form == 'sended') {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'form submitted sucessfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                setCom('')
                setFormValues('')
                setShowModal(false)
                navigate('/inbox')
                // console.log(formValues);
            }
        })
    }

    const handleDone = (e) => {
        e.preventDefault()
        setFormValues('')
        setShowModal(false)
        navigate('/inbox')
    }

    return (
        <div className=' flex justify-center md:justify-end'>

            <div className="w-full md:w-10/12 pt-20 overflow-scroll  bg-slate-50 shadow-sm flex items-center justify-center" >
                <div className="bg-white py-6 px-10 w-4/5 md:w-3/5 mb-3 ">
                    <div className="sm:text-3xl text-2xl font-semibold text-center text-sky-600  mb-12">
                        Enquire Form
                    </div>
                    <form>
                        <div className="">
                            <div className='flex gap-2'>

                                <input type="text" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8" name='name' placeholder="Name " value={formValues.name} onChange={handleChange} />

                                <input type="email" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8" name='email' placeholder="Eamil Adress " value={formValues.email} onChange={handleChange} />

                            </div>
                            <div className='flex gap-2 '>
                                <input type="date" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8" name='eventDate' placeholder="Date Of Event " value={formValues.eventDate} onChange={handleChange} />

                                <input type="phone" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8" name='phone' placeholder="Phone " value={formValues.phone} onChange={handleChange} />
                            </div>
                            <div className="flex gap-2">
                                <input type="text" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8" name='guestNumber' placeholder="No. Of Guests " value={formValues.guestNumber} onChange={handleChange} />
                                <input type="text" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8" name='budget' placeholder="Budget " value={formValues.budget} onChange={handleChange} />
                            </div>
                            <div className="">
                                <input type="text" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8" name='eventType' placeholder="Type of Event " value={formValues.eventType} onChange={handleChange} />
                            </div>
                            <div className="">
                                <input type="text" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8" name='address' placeholder="Address " value={formValues.address} onChange={handleChange} />
                            </div>

                            <div className="flex ">
                                <div className="flex">
                                    <input type="checkbox" className="border-sky-400 " name='food' value="Food Arrangements" checked={formValues.food} onChange={handleChange} />
                                    <div className="px-3 text-gray-500">
                                        Food Arrangements
                                    </div>
                                </div>
                                {/* <input type="" className="focus:outline-none border-b  pb-2 border-sky-400 placeholder-gray-500 "  placeholder="Food Arrangements " /> */}
                            </div>
                            <div className="flex ">
                                <div className="flex">
                                    <input type="checkbox" className="border-sky-400 " name='venue' value="Venue Decoration" checked={formValues.venue} onChange={handleChange} />
                                    <div className="px-3 text-gray-500">
                                        Venue Decoration
                                    </div>
                                </div>
                                {/* <input type="" className="focus:outline-none border-b  pb-2 border-sky-400 placeholder-gray-500 "  placeholder="Food Arrangements " /> */}
                            </div>
                            <div className="flex ">
                                <div className="flex">
                                    <input type="checkbox" className="border-sky-400 " name='programme' value="Entertainment Program" checked={formValues.programme} onChange={handleChange} />
                                    <div className="px-3 text-gray-500">
                                        Entertainment Program
                                    </div>
                                </div>
                                {/* <input type="" className="focus:outline-none border-b  pb-2 border-sky-400 placeholder-gray-500 "  placeholder="Food Arrangements " /> */}
                            </div>
                            <div className="flex ">
                                <div className="flex">
                                    <input type="checkbox" className="border-sky-400 " name='light' value="Light Arrangements" checked={formValues.light} onChange={handleChange} />
                                    <div className="px-3 text-gray-500">
                                        Light Arrangements
                                    </div>
                                </div>
                                {/* <input type="" className="focus:outline-none border-b  pb-2 border-sky-400 placeholder-gray-500 "  placeholder="Food Arrangements " /> */}
                            </div>
                            <div className="flex ">
                                <div className="flex">
                                    <input type="checkbox" className="border-sky-400 " name='guest' value="Guset Managemenet" checked={formValues.guest} onChange={handleChange} />
                                    <div className="px-3 text-gray-500">
                                        Guset Managemenet
                                    </div>
                                </div>
                                {/* <input type="" className="focus:outline-none border-b  pb-2 border-sky-400 placeholder-gray-500 "  placeholder="Food Arrangements " /> */}
                            </div>
                            <div className="flex ">
                                <div className="flex">
                                    <input type="checkbox" className="border-sky-400 " name='camera' value="Photography & Videography" checked={formValues.camera} onChange={handleChange} />
                                    <div className="px-3 text-gray-500">
                                        Photography & Videography
                                    </div>
                                </div>
                                {/* <input type="" className="focus:outline-none border-b  pb-2 border-sky-400 placeholder-gray-500 "  placeholder="Food Arrangements " /> */}
                            </div>
                            <div className="flex ">
                                <div className="flex">
                                    <input type="checkbox" className="border-sky-400 " name='anchor' value="Anchoring" checked={formValues.anchor} onChange={handleChange} />
                                    <div className="px-3 text-gray-500">
                                        Anchoring
                                    </div>
                                </div>
                                {/* <input type="" className="focus:outline-none border-b  pb-2 border-sky-400 placeholder-gray-500 "  placeholder="Food Arrangements " /> */}
                            </div>

                            <div className="pt-5">
                                <input type="text" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8" name='other' placeholder="Other Elements" value={formValues.other} onChange={handleChange} />
                            </div>
                            <div className="">
                                <input type="text" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8" name='notes' placeholder="Notes" value={formValues.notes} onChange={handleChange} />
                            </div>

                            <div className="flex justify-center my-6">
                                <p className=" rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-center text-lg font-semibold " onClick={fullDetails}>
                                    Submit
                                </p>
                            </div>

                        </div>
                        {showModal ? (
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                                >
                                    <div className="relative w-3/5 md:w-2/5 my-6 mx-auto max-w-3xl">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-5 mb-2 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="text-xl font-semibold">send to companies</h3>
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

                                            <div className='pb-2'>

                                                {state.map((obj) => {
                                                    return (

                                                        <div className="relative p-1 w-full flex-auto">
                                                            <div className=' flex justify-between  py-2 px-4  h-16 bg-white   rounded-2xl border-slate-200 border-t shadow-md'>
                                                                <div className='m-1 ml-3 flex'>
                                                                    <img src="https://imgs.search.brave.com/JC3yuRG8o8d2G-kk-gDv7DrSKVLLPa5QoIK2uoMr9QE/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/enVZTVhkQjNEUFVu/UE9ld2hha0N3SGFG/ZSZwaWQ9QXBp" className='rounded-full' width={38} alt="" />
                                                                    <div>
                                                                        <h1 className='text-md md:text-lg font-medium  ml-5  cursor-pointer'>{obj.companyName}</h1>
                                                                        <p className='pl-5 text-sm '>{obj.email}</p>
                                                                    </div>
                                                                </div>

                                                                <div className='mt-1'>
                                                                    {com.includes(obj._id) ? 
                                                                    <p className='font-semibold p-2'>sended</p>:
                                                                    <p className='ml-4 my-1  bg-slate-900 text-white px-4 py-0.5 rounded-xl' onClick={(e) => { handleCompany(obj._id) }}  > send</p>
                                                                    }
                                                                    {/* <input type="checkbox" className="border-sky-400 " name='company' value={obj._id} checked={formValues.company} onChange={handleChange} /> */}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                })}
                                            </div>
                                            <div className='flex justify-end pb-2 pr-1'>

                                                <button className=" rounded-full  p-1 w-full sm:w-32   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-center text-lg font-semibold " onClick={handleSubmit}>Done</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EnquireForm