import React, { useState, useEffect, useContext } from 'react'
// import feedImage from '../../../assets/stone.webp'

import { AiOutlineHeart, AiOutlinePlus, AiFillHeart } from 'react-icons/ai'
import { FaRegComment, FaRegHeart, FaEllipsisV } from 'react-icons/fa'
import { FcLike } from "react-icons/fc"

import { FiSend } from 'react-icons/fi'
import { BsBookmark, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import axios from '../../../api/axios'
import { format } from 'timeago.js'
import { UserContext } from '../../../Store/UserContext'
import { Link } from 'react-router-dom'
import { reportUserPost } from '../../../api/UserRequest'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userInstance from '../../../axios/userAuth'
import companyInstance from '../../../axios/companyAuth'
import { socket } from '../../../Store/Socket'

function Post({ obj, setBlock, company, user }) {

    const [likes, setlikes] = useState(false)
    const [count, setCount] = useState(obj.likes.length)
    const { userDetails } = useContext(UserContext)
    const userId = user
    const [comment, setComment] = useState('')
    const [viewComment, setViewComment] = useState(false)
    const [viewAllComment, setViewAllComment] = useState('')
    const [viewCmt, setViewCmt] = useState(false)
    const [error, setError] = useState({})
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false)



    /* ----------------------------- likes useEffect ---------------------------- */

    useEffect(() => {
        console.log('useeffect called');
        setlikes(obj?.likes?.includes(userId))
        // setViewAllComment(obj.comments)
        // console.log(likes, 'likessssss');
    }, [])

    /* ------------------------- view comments useEffect ------------------------ */

    useEffect(() => {
        if(company){
            companyInstance.get(`/post/viewComments/${obj._id}`).then((res) => {
                const data = res.data[0]
                setViewAllComment(res.data[0].comments)
                // console.log(viewAllComment,'&&&&&&&&&&');
            })
        }else{
            userInstance.get(`/post/viewComments/${obj._id}`).then((res) => {
                const data = res.data[0]
                setViewAllComment(res.data[0].comments)
                // console.log(viewAllComment,'&&&&&&&&&&');
            }) 
        }
    }, [viewCmt])

    /* ------------------------------- post likes ------------------------------- */

    const handleLike = (id) => {
        // console.log('hiiiiiiiiiiiiii');
        userInstance.put('/post/like/' + id, { userId }).then((res) => {
            if (res.status == '200') {
                console.log(res);
                setlikes(!likes)
                setCount(likes ? count - 1 : count + 1)
                // console.log(count, 'qwertyuiop');

                socket.emit("send-notification",{
                    senderId:userId,
                    receiverId:obj.companyId._id,
                    type:"liked your post"
                })

            }
        })
    }

    /* --------------------------------- post comment  -------------------------------- */

    const handleComment = (e) => {
        e.preventDefault()

        const datas = {

            postBy: userId,
            username: userDetails.username,
            comment: comment
        }

        const errors = validateForm(comment)
        setError(errors)
        // console.log(error, 'mmmmmmmmmmmmmmmmmmmmmmmmm');
        // console.log(Object.keys(errors).length, 'llkklk');
        if (Object.keys(errors).length == 0) {
            userInstance.put(`/post/comment/${obj._id}`, datas).then((res) => {
                console.log(res);
                setComment('')
                setViewCmt(!viewCmt)
                socket.emit("send-notification",{
                    senderId:userId,
                    receiverId:obj?.companyId?._id,
                    type:"commented your post"
                })
            })

        }


    }

    const handleSetComment = (e) => {
        // console.log('call');
        if (/^\s/.test(e.target.value)) {
            setComment('')
        } else {
            setComment(e.target.value)
        }
    }

    const handleviewComment = (e) => {
        e.preventDefault()
        setViewComment(!viewComment)

    }

    const validateForm = (data) => {
        const error = {};
        if (!data) {
            error.comment = "write your comment"
        }

        return error;
    }


    /* ------------------------------- BLOCK POST ------------------------------- */

    const [reason, setReason] = useState('')


    const handleBlock = async () => {
        console.log('blockkk');
        try {
            const { data } = await reportUserPost(reason, obj._id, userId)
            setReason('')
            console.log(data.report, 'block response');
            setBlock(Date.now())
            if (data.report) {
                // console.log('12345678901234567890-');
                toast.success('Post Reported', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setShowModal(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose =()=>{
        setShowModal(false)
        setOpen(false)
    }

    return (

        <div className='flex flex-col mt-3 mb-3   w-full md:w-4/5 lg:w-9/12 xl:w-3/6 border rounded-2xl '>
            
            <div className='p-5 bg-white   rounded-t-2xl border-slate-200 border-t shadow-md'>
                <div className='flex justify-between'>
                    <div className='flex items-center space-x-2'>
                        <img src={obj?.companyId?.profilePicture} className='rounded-full w-12 h-12'  alt="" />
                        <div>
                            {/* <p className='font-medium'>{obj.companyId.companyName}</p> */}
                            {company?
                            <Link  to={`/company-profile/${obj.companyId._id}`} className='font-medium'>{obj.companyName}</Link>:
                            <Link  to={`/profile/company/${obj.companyId._id}`} className='font-medium'>{obj.companyName}</Link>
                            }
                            <p className='text-xs text-gray-400'>{format(obj.date)}</p>
                        </div>
                    </div>
                    <div className='pt-4 '>
                        <div className='flex justify-end cursor-pointer'>
                            <FaEllipsisV onClick={() => setOpen(!open)} />
                        </div>
                        {open ?
                            <ul className='border shadow-md rounded px-2 mr-6 cursor-pointer'>
                                <li onClick={(e) => setShowModal(true)}>report</li>
                            </ul>
                            : null}
                    </div>
                </div>
                <p className='pt-4'>{obj.description}</p>
            </div>
            <div className='relative w-full   bg-white '>
                <img className='object w-[800px] h-[350px]' src={obj?.image} alt="" />
            </div>

            <div className='flex justify-between rounded-b-2xl items-center  bg-white  text-gray-400 border-t '>
                <div className='w-20  flex justify-between items-center space-x-4 p-2'>
                    {company ?
                        <div className='text-lg flex font-medium text-slate-900'   >
                            {count == '0' ? '' :
                                <span className='text-lg ml-2'>{count}</span>
                            }
                            <p className='pl-1'>Likes</p>
                        </div>
                        :
                        <div className='text-2xl flex text-slate-900 hover:cursor-pointer ' onClick={(e) => { handleLike(obj._id) }}  >
                            {likes ? <FcLike /> : <AiOutlineHeart />}
                            {count == '0' ? '' :
                                <span className='text-lg ml-2'>{count}</span>
                            }
                        </div>
                    }
                    <div className='text-xl flex text-slate-900 cursor-pointer ' onClick={handleviewComment}>
                        <div className='py-1'>
                            <FaRegComment />
                        </div>
                        {
                            viewAllComment.length == '0' ? '' :

                                <span className='ml-2 text-lg'>{viewAllComment.length}</span>
                        }
                    </div>
                    {/* <div className='text-xl'><FiSend /> </div> */}

                </div>
                {/* <div className='text-xl p-2 '><BsBookmark /> </div> */}
            </div>
            {viewComment ?


                <div className='flex flex-col '>
                    <div className={` max-h-32 overflow-auto scrollbar-hide ${company? 'rounded-b-2xl   shadow-md':'' } `} >
                        {viewAllComment.length == 0 ? (<h1 className='bg-white ml-5'>No comments</h1>):
                        viewAllComment.map((com, i) => {
                            return (

                                <div className="flex gap-3 py-2 pl-3 items-center bg-white">
                                    <div>
                                        {/* <img className="w-8 rounded-full" src='' alt="profile" /> */}
                                        <img src={com?.postedBy?.profilePicture} className='rounded-full w-10 h-10'  alt="" />
                                    </div>
                                    <div>
                                        <div>
                                            <span className="font-medium text-sm mr-2">{com.name}</span>
                                            <span className="">{com.comment}</span>
                                        </div>
                                        <p className="text-slate-500 text-xs ">{format(com.created)}</p>
                                    </div>

                                </div>
                            )
                        })}
                    </div>

                    {company ? '' :

                        <div className=' flex rounded-b-2xl pl-5 p-1 pb-2  bg-white shadow-md text-gray-400 '>
                            <form className='flex justify-between w-full'>

                                <textarea
                                    name='comment'
                                    id='comment'
                                    rows='1'
                                    value={comment}
                                    onChange={handleSetComment}
                                    placeholder='comment...'
                                    className='w-full rounded-md p-1 text-gray-800 bg-slate-100'

                                ></textarea>
                                <div className='pl-3 py-1 pr-2 '>
                                    {comment ?
                                        <button className=' font-semibold text-blue-700 hover:text-blue-900 disabled:opacity-50' onClick={handleComment}>Post</button> :
                                        <p className='font-semibold'>Post</p>
                                    }
                                </div>
                            </form>

                        </div>
                    }

                </div> : ''

            }

            {showModal ? <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-sm">
                        {/* {/content/} */}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* {/header/} */}
                            <div className="flex gap-3  justify-between items-center p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-md text-black font-semibold inline">
                                    Why are you reporting this post?
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={handleClose}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/* {/body/} */}

                            <div className='flex flex-col m-2 justify-center  gap-3 max-h-50 overflow-y-auto no-scrollbar'>
                                <div className="px-3">
                                    <input type="radio" required className="mr-2" value="It's spam" name="reason" onChange={(e) => setReason(e.target.value)} />
                                    <label htmlFor="reason">It's spam</label>
                                </div>
                                <div className="px-3">
                                    <input type="radio" className="mr-2" name="reason" value="I just don't like it" onChange={(e) => setReason(e.target.value)} />
                                    <label htmlFor="reason">I just don't like it</label>
                                </div>
                                <div className="px-3">
                                    <input type="radio" className="mr-2" name="reason" value='false Information' onChange={(e) => setReason(e.target.value)} />
                                    <label htmlFor="reason">false Information</label>
                                </div>
                                <div className="px-3">
                                    <input type="radio" className="mr-2" name="reason" value='Scam or Fraud' onChange={(e) => setReason(e.target.value)} />
                                    <label htmlFor="reason">Scam or Fraud</label>
                                </div>
                                <div className="px-3">
                                    <input type="radio" className="mr-2" name="reason" value='Hate speech or symbols' onChange={(e) => setReason(e.target.value)} />
                                    <label htmlFor="reason">Hate speech or symbols</label>
                                </div>
                            </div>
                            {/* {/footer/} */}
                            <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-gray-500 background-transparent font-bold uppercase px-6  text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleClose}>
                                    Close
                                </button>
                                <button class="bg-cyan-600 hover:bg-red-400 text-white font-bold py-1 px-4 rounded inline-flex items-center disabled:bg-cyan-100"
                                    onClick={handleBlock} disabled={!reason}>
                                    <span>Submit</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </> : null}
            <ToastContainer />
        </div>






    )
}

export default Post