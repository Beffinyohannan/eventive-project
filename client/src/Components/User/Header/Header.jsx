import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'
import { TfiBell } from "react-icons/tfi";
import { UserContext } from '../../../Store/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { findSearch } from '../../../api/UserRequest';
import logo from '../../../assets/logo.webp'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import Swal from 'sweetalert2'
import userInstance from '../../../axios/userAuth';
import { socket } from '../../../Store/Socket';



function Header() {
    const { userDetails, setUserDetails } = useContext(UserContext)
    // console.log(userDetails,'//////////////////////////');
    useEffect(() => {
        // console.log(userDetails,',,,,,,,,,,,,,,,,,,,,,,,,,,,,');
    }, [])
    const [isOpen, setOpen] = useState(false);
    const userId = userDetails?._id
    const [details, setDetails] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [openProfile, setOpenProfile] = useState(false);
    const navigate = useNavigate()



    const handleDropDown = () => {
        setOpen(!isOpen);
    };

    useEffect(() => {
        
        userInstance.get(`/profile/${userId}`).then((res) => {
            console.log(res.data, 'gggggggggggggg');
            // setUserDetails(res.data)
            setDetails(res.data)
        })
        socket.emit("new-user-add", userId)
    }, [socket])


    /* ------------------------------ SEARCH USERS ------------------------------ */

    const [serachUser, setSearchUser] = useState([])

    const handleSearch = async (e) => {
        const val = e.target.value
        if (val == '') {
            setSearchUser([])
        }
        try {
            const { data } = await findSearch(val)
            console.log(data, 'jjjjjj');
            setSearchUser(data)
        } catch (error) {
            console.log(error);
        }
    }
    const handlebtn = () => {
        setShowSearch(!showSearch)
        setSearchUser([])
    }

    const logout = (() => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to Logout.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'You are successfully logged out',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            navigate('/login')
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { setOpenProfile(!openProfile) }
                }
            ]
        });

    })

    /* ------------------------------ notification ------------------------------ */

    const [notifiModal, setNotifiModal] = useState(false)
    const [notificationData,setNotificationData] = useState('')
    const handleNotficationBtn = () => {
        console.log('tyui');
        setNotifiModal(!notifiModal)
    }

    return (
        <div className='bg-slate-100 fixed inset-x-0 top-0 z-10 border-b-2 border-slate-200' >

            <div className='flex items-center justify-between'>

                <img className='ml-6  w-20' src={logo} alt="" layout='fixed' />

                <div className='flex items-center cursor-pointer md:px-10 sm:h-14 justify-evenly mr-3'>
                    {showSearch ?
                        <div class="flex justify-center mt-5 ">
                            <div class=" xl:w-96">
                                <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
                                    <input type="search" onChange={handleSearch} class="form-control relative flex-auto min-w-0 block w-32 md:w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                                </div>
                            </div>
                        </div>
                        : ""}

                    {serachUser.length !== 0 ?
                        <div className='absolute mt-32 mr-32 lg:mr-60'>
                            {serachUser.map((obj) => (
                                <div>
                                    <Link to={`/profile/company/${obj._id}`}>
                                        <a class="flex items-center px-3 py-2 text-sm transition duration-150  ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                                            <img class="object-cover w-10 h-10 rounded-full"
                                                src={obj.profilePicture} alt="username" />
                                            <div class="w-full pb-2">
                                                <div class="flex justify-between">
                                                    <span class="block ml-2 font-semibold text-gray-600">{obj.companyName}</span>
                                                </div>
                                                <span class="block ml-2 text-sm text-gray-400">{obj.companyType}</span>
                                            </div>
                                        </a></Link>

                                </div>
                            ))}
                        </div>
                        : null}

                    <div className='flex pr-5'>
                        <FaSearch size={20} className='h-12 mt-2 ml-3' onClick={handlebtn} />
                        <TfiBell size={24} className='h-12 my-2 ml-4 ' onClick={handleNotficationBtn} />
                    </div>
                    <div>
                        <div className='flex items-center space-x-2' onClick={() => setOpenProfile(!openProfile)} >
                            <img src={details.profilePicture} className='rounded-full w-10 h-10' alt="" />
                            <div>
                                <Link className='font-medium'>
                                    {details?.username}
                                </Link>
                            </div>
                        </div>
                        {openProfile ?
                            <div className='absolute mt-2  border shadow-md rounded-xl px-5 py-2  cursor-pointer text-xl font-medium bg-slate-50'>
                                <ul >
                                    <li className='hover:bg-gray-200 rounded-md px-2 py-2'><Link to={'/profile'}>Profile</Link> </li>
                                    <li className='hover:bg-gray-200 rounded-md px-2 py-2' onClick={logout}>  Logout</li>
                                </ul>
                            </div>
                            : null}
                    </div>

                </div>


            </div>

            {
                notifiModal ?
                  
                <div class="absolute right-20 max-h-48 z-20 w-60 py-2  overflow-y-scroll no-scrollbar  rounded-md shadow-xl dark:bg-blue-200 top-16 bg-sky-100  ">
                {/* {notificationData.map((obj) => {

                    return ( */}

                        <div class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                          
                                <img class="flex-shrink-0 object-cover mx-1 rounded-full w-10 h-10" src='' />
                                

                            <div class="mx-1 flex ">
                                <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-900 ">qwertyu</h1>
                                <p class="text-sm font-semibold text-gray-700 dark:text-gray-900 pl-2">qwertyu</p>

                            </div>
                        </div>

                    {/* )
                })
                } */}
            </div>
                    
                    : ""
            }

        </div>
    )
}

export default Header