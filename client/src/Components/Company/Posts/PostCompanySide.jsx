import React, { useState, useEffect, useContext } from 'react'
import axios from '../../../api/axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { HiPhotograph } from "react-icons/hi";

import { CompanyContext } from '../../../Store/CompanyContext'
import Post from '../../User/Post/Post';
import { eventShow, postViewCompany, viewEvents } from '../../../api/CompanyRequest';


function PostCompanySide() {

    const [showImage, setShowImage] = useState()
    const [file, setFile] = useState('')
    const [description, setDescription] = useState('')
    const [event,setEvent] = useState('')
    const [eventShow,setEventShow] = useState([])
    const navigate = useNavigate()
    const { companyDetails, setCompanyDetails } = useContext(CompanyContext)
    const [postView, setPostView] = useState([])
    const [block, setBlock] = useState(false)


    // const comp = JSON.parse(localStorage.getItem('company'))
    // console.log(comp, 'mmmmmmmmmmmmmm');
    console.log(event,'ooooooo42oooooooooooo');


    const onInuputChange = (e) => {
        // console.log( e.target.files[0]);

        setShowImage(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])

        console.log(file);

    }



    const onFormsubmit = (e) => {
        e.preventDefault()

        // const postDetails ={
        //     // userId:userData._id,
        //     descriptions:description



        //  }
        //  console.log(description);

        const formData = new FormData()
        const id = companyDetails._id
        const name = companyDetails.companyName
        const des = description
        formData.append('image', file)
        formData.append('companyId', id)
        formData.append('companyName', name)
        formData.append('description', des)
        formData.append('evntType',event)
        // postDetails.image=fileName

        console.log(formData, '/////////');

        const config = {
            header: {
                'content-type': 'multipart/form-data',
            }
        }
        axios.post('/company/post-upload', formData).then((response) => {
            console.log('image added');
            console.log(response.data);
            if (response.data.posted == true) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Post Added',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {

                    setShowImage('')
                    setDescription('')
                    setEvent('')
                    setBlock(!block)
                    navigate('/company/homepage')
                })
            }
        }).catch((err) => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        const viewPost = async () => {
            try {
                const { data } = await postViewCompany()
                // console.log(data);
                setPostView(data)
            } catch (error) {
                console.log(error);
            }
        }
        viewPost()
    }, [block])

    useEffect(()=>{
        const showEvent=async()=>{
            try {
                const {data} = await viewEvents()
                setEventShow(data)
                // console.log(eventShow,']]]]]]]');
            } catch (error) {
                console.log(error);
            }
        }
        showEvent()
    },[])


    return (
        <div className='w-full sm:w-4/5 pt-24 flex flex-col items-center lg:justify-start '>
            <div className=' sm:w-full  lg:w-10/12  flex flex-col items-center   '>
                <div className='flex flex-col items-center lg:pl-12 xl:pl-0 xl:pr-28'>
                    <div className='p-5 md:mx-12 lg:mx-16 xl:mx-24 bg-white  mt-3 mb-5 rounded-2xl border-slate-200 border-t shadow-md '>
                        <div className='flex items-center space-x-2'>
                            {/* <img src="https://imgs.search.brave.com/JC3yuRG8o8d2G-kk-gDv7DrSKVLLPa5QoIK2uoMr9QE/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/enVZTVhkQjNEUFVu/UE9ld2hha0N3SGFG/ZSZwaWQ9QXBp" className='rounded-full ' width={40} height={40} alt="" /> */}
                            <div>
                                <p className='font-medium'>Create Post</p>
                                {/* <p className='text-xs text-gray-400'>22/11/22</p> */}
                            </div>
                        </div>
                        <div className='mt-3 '>
                            <label htmlFor="favColor">select the event type?</label>
                            <br />
                            <select id="favColor" className='pt-3' onChange={(e) => { setEvent(e.target.value) }}>
                                {eventShow.map((obj)=>(
                                    <option value={obj._id} >{obj.event}</option>
                                ))}
                                {/* <option value="orange">Orange</option>
                                <option value="yellow">Yellow</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                                <option value="indigo">Indigo</option>
                                <option value="violet">Violet</option> */}
                            </select>
                        </div>
                        <div className='p-2 mt-2'>
                            <textarea className='border w-full h-12 md:w-full' name="" id="" cols="70" rows="21" value={description}
                                onChange={(e) => { setDescription(e.target.value) }}></textarea>
                        </div>
                        <img src={showImage} alt="" className='w-32' />
                        <div className='flex justify-between'>

                            <label className='p-2 cursor-pointer' htmlFor="img-upload"><HiPhotograph size={26} />  </label>
                            <input type="file" id="img-upload" name='image' onChange={onInuputChange} className='hidden' />
                            <button className='bg-slate-900 text-white px-4 ' type='submit' onClick={onFormsubmit} >Post</button>

                        </div>

                    </div>
                    {/* <FeedCompany/> */}
                    {postView.map((obj, i) => (

                        <Post obj={obj} setBlock={setBlock} company={true} />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default PostCompanySide