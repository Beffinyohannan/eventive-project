import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from '../../../api/axios'
import { CompanyContext } from '../../../Store/CompanyContext'


function SecondModal({user}) {

    const initialValues = { foodAmount: "", venueAmount: "", programmeAmount: "", lightAmount: "", guestAmount: "", cameraAmount: "", anchorAmount: "" }
    const [formValues, setFormValues] = useState(initialValues)
    const [userId,setUserId] = useState('')
    const [showSecondModal, setShowSecondModal] = useState(false)
    const { companyDetails, setCompanyDetails } = useContext(CompanyContext)
    const companyId = companyDetails._id


    useEffect(()=>{
        setShowSecondModal(true)
        setUserId(user)
    },[])

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
    <div>
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
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <label for="Note" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Note</label>
                                                            <div className="relative mb-5 mt-2">

                                                                <input id="Note" type='text' className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="" />
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
    </div>
  )
}

export default SecondModal