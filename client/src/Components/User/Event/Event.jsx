import React, { useContext, useEffect, useState } from 'react'
import { HiPhotograph } from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../api/axios';
import { postEvent, viewEvents } from '../../../api/CompanyRequest';
import { CompanyContext } from '../../../Store/CompanyContext';
import EventsView from './EventsView';


function Event({company}) {

    const [showSecondModal, setShowSecondModal] = useState(false)
    const [showImage, setShowImage] = useState()
    const [file, setFile] = useState('')
    const [description, setDescription] = useState('')
    const [event, setEvent] = useState('')
    const { companyDetails, setCompanyDetails } = useContext(CompanyContext)
    const [eventView, setEventView] = useState([])
    const [change,setChange] = useState(false)


    const onInuputChange = (e) => {
        // console.log( e.target.files[0]);

        setShowImage(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])

        console.log(file);

    }


    const onFormsubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        const id = companyDetails._id
        const name = event
        const des = description
        formData.append('image', file)
        formData.append('companyId', id)
        formData.append('event', name)
        formData.append('description', des)

        // const config = {
        //     header: {
        //         'content-type': 'multipart/form-data',
        //     }
        // }
        console.log(formData, '@@@@@@@@@');
        // try {
        //     const {data} = await postEvent(formData)
        // } catch (error) {
        //     console.log(error.message);
        // }
        axios.post('http://localhost:5000/company/addEvent', formData).then((response) => {
            console.log('image added');
            console.log(response.data);
            if (response.data.event) {
                toast.success('New Event Added', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setShowSecondModal(false)
                setEvent('')
                setDescription('')
                setFile('')
                setShowImage('')
                setChange(!change)
            }
        }).catch((err) => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        const viewEvent = async () => {
            try {
                const { data } = await viewEvents()
                console.log(data, "lknjbhgvg");
                setEventView(data)
                console.log(eventView);
            } catch (error) {
                console.log(error.message);
            }
        }
        viewEvent()
        // axios.get('/company/viewEvent').then((res)=>{
        //     console.log(res.data);
        // })
    }, [change])



    return (
        <div className=' mt-28 mb-4  lg:w-4/5 flex flex-col'>
            {company?
            <div className='flex justify-end'>
                <button className="mb-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e) => setShowSecondModal(true)}>Add A New Event</button>
            </div>
            :''}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>

            {eventView.map((obj, i) => (
                <div >

                    <EventsView obj={obj} company={company} />
                </div>
            ))}
            </div>
            {showSecondModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto bg-transparent fixed inset-0 z-50 outline-none focus:outline-none" >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            {/* <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none"> */}


                            {/*body*/}
                            <div className='p-5 md:mx-12 lg:mx-16 xl:mx-24 bg-white  mt-3 mb-5 rounded-2xl border-slate-200 border-t shadow-md '>
                                <div className='flex items-center space-x-2 justify-between'>
                                    <p className='font-medium'>Create A New Event</p>
                                    {/* <img src="https://imgs.search.brave.com/JC3yuRG8o8d2G-kk-gDv7DrSKVLLPa5QoIK2uoMr9QE/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/enVZTVhkQjNEUFVu/UE9ld2hha0N3SGFG/ZSZwaWQ9QXBp" className='rounded-full ' width={40} height={40} alt="" /> */}
                                    <div className='flex'>
                                        <button
                                            className="p-1 pb-4 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowSecondModal(false)}
                                        >
                                            <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                        {/* <p className='text-xs text-gray-400'>22/11/22</p> */}
                                    </div>
                                </div>
                                <div className='flex flex-col p-2 mt-4'>
                                    <label htmlFor="" className='font-semibold'>Event</label>
                                    <input className='border' type="text" name='event' onChange={(e) => { setEvent(e.target.value) }} />
                                </div>
                                <div className='p-2'>
                                    <label htmlFor="" className='font-semibold'>Description</label>
                                    <textarea className='border w-full h-12 md:w-full' name="" id="" cols="70" rows="21" value={description}
                                        onChange={(e) => { setDescription(e.target.value) }}></textarea>
                                </div>
                                <img src={showImage} alt="" className='w-32' />
                                <div className='flex justify-between'>

                                    <label className='p-2 cursor-pointer' htmlFor="img-upload"><HiPhotograph size={26} />  </label>
                                    <input type="file" id="img-upload" name='image' onChange={onInuputChange} className='hidden' />
                                    <button className='bg-slate-900 text-white px-4 ' type='submit' onClick={onFormsubmit} >Add</button>

                                </div>

                            </div>

                            {/* <button className="cursor-pointer absolute top-0 right-0 mt-8   mr-5 text-black hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={() => setShowSecondModal(false)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button> */}

                            {/* </div> */}
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>

            ) : null}
            <ToastContainer />
        </div>
    )
}

export default Event