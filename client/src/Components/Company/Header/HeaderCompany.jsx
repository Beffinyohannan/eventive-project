import React, { useContext } from 'react'
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import { TfiBell } from "react-icons/tfi";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { findSearch } from '../../../api/UserRequest';
import { CompanyContext } from '../../../Store/CompanyContext';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { findSearchCompany, getUser, notificationCount, notificationStatus } from '../../../api/CompanyRequest';
import { useEffect } from 'react';
import {socket} from '../../../Store/Socket'
function HeaderCompany() {
    const { companyDetails, setCompanyDetails } = useContext(CompanyContext)
    const companyId = companyDetails?._id
    // console.log(companyId,'qwertyuiop');
    const [showSearch, setShowSearch] = useState(false)
    const [openProfile, setOpenProfile] = useState(false);
    const [details, setDetails] = useState('')
    const [likes,setLikes]=useState('')
    const [notCount,setNotCount] = useState([])
    const [notificationCounts,setNotificationCounts] =useState('')
    const [notifiModal, setNotifiModal] = useState(false)
    const [notificationData, setNotificationData] = useState('')
    

    useEffect(() => {
        socket?.emit("new-user-add", companyId)

        getCompany()
        fetchNotificationCount()

    },[notifiModal])

    const getCompany =async () => {
        try {
            const  {data}  =await getUser(companyId)
            console.log(data,'---////////////--');
            setDetails(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchNotificationCount=async()=>{
        try {
            const {data}=await notificationCount(companyId)
            console.log(data,'count.........');
            setNotificationCounts(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        console.log('useeffect called');
        socket?.on("get-notification",(data)=>{
            console.log(data,'qwertyuio');
            fetchNotificationCount()
            getCompany()
            setNotCount((prev)=>[...prev,data])
        })
        setLikes(new Date())
    },[socket])

    /* ------------------------------ SEARCH USERS ------------------------------ */

    const [serachUser, setSearchUser] = useState([])

    const handleSearch = async (e) => {
        const val = e.target.value
        if (val == '') {
            setSearchUser([])
        }
        try {
            const { data } = await findSearchCompany(val)
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

    const navigate = useNavigate()


    const logout = (() => {
        console.log('gfdghsfgdfjgjhkj');
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to Logout.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        // removeCookie("company-token")
                        localStorage.removeItem("company-token")
                        localStorage.removeItem("company")
                        //    navigate("/admin-login")
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'You are successfully logged out',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            navigate('/company-login')
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

   
    const handleNotficationBtn =async () => {
        // console.log('tyui');
        try {
            const {data} = notificationStatus(companyId)
            console.log(data,'qwertyu');
        } catch (error) {
            console.log(error.message);
        }
        
        getCompany()
        setNotifiModal(!notifiModal)
    }

    return (
        <div className='bg-slate-100 fixed inset-x-0 top-0 z-10 border-b-2 border-slate-200 '>

            <div className='flex items-center justify-between'>
                <div className='h-16'>

                    <img className='ml-6  ' src="https://imgs.search.brave.com/BgRuRD-2-DzB2DshFR9kH3yUajnrNb5ym7t3Y3nOKeA/rs:fit:512:512:1/g:ce/aHR0cHM6Ly9pbWFn/ZXMudmV4ZWxzLmNv/bS9tZWRpYS91c2Vy/cy8zLzE0NTIzNC9p/c29sYXRlZC9wcmV2/aWV3LzkzMWNkMjYx/YWQ3OGQwYzRmMGIy/Y2VkYTg5M2UxNDJi/LWV2ZW50LXBsYW5u/aW5nLWxvZ290eXBl/LWJ5LXZleGVscy5w/bmc" alt="" width={85} height={80} layout='fixed' />
                </div>

                <div className='flex items-center cursor-pointer md:px-10 sm:h-14 justify-evenly mr-3'>
                    {showSearch ?
                        <div class="flex justify-center mt-8 mb-4">
                            <div class=" xl:w-96">
                                <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
                                    <input type="search" onChange={handleSearch} class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />

                                </div>
                            </div>
                        </div>
                        : ""}

                    {serachUser.length !== 0 ?
                        <div className='absolute mt-32 mr-32 lg:mr-60'>
                            {serachUser.map((obj) => (
                                <div>
                                    <Link to={`/company-profile/${obj._id}`}>
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

                    <div className='flex pr-5 '>

                        <FaSearch size={20} className='  my-3 ml-4 lg:hidden' onClick={handlebtn} />
                        <TfiBell size={24} className=' my-2 ml-4 font-semibold' onClick={handleNotficationBtn} />
                        <span class="inline-block py-0.4 px-1 leading-none text-center whitespace-nowrap top-1 align-baseline font-semibold  bg-red-600 text-white rounded-full ml-16 absolute">{notificationCounts==0? '': notificationCounts}</span>
                    </div>
                    <div>
                        <div className='flex items-center space-x-2' onClick={() => setOpenProfile(!openProfile)}>
                            <img src={details?.profilePicture} className='rounded-full w-10 h-10' alt="" />
                            <div>
                                <Link className='font-medium'>{details?.companyName}</Link>
                            </div>
                        </div>
                        {openProfile ?
                            <div className='absolute mt-2  border shadow-md rounded-xl px-5 py-2  cursor-pointer text-xl font-medium bg-slate-50'>
                                <ul >
                                    <li className='hover:bg-gray-200 rounded-md px-2 py-2'><Link to={`/company-profile/${companyId}`}>Profile</Link> </li>
                                    <li className='hover:bg-gray-200 rounded-md px-2 py-2' onClick={logout}>  Logout</li>
                                </ul>
                            </div>
                            : null}
                    </div>

                </div>


            </div>

            {
                notifiModal ?

                    <div class="absolute right-20 max-h-48 z-20 w-60 py-2  overflow-y-scroll no-scrollbar scrollbar-hide  rounded-md shadow-xl dark:bg-slate-100 top-16 bg-sky-100  ">
                        {details?.notification?.map((obj) => {

                    return (

                        <div class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">

                            <img class="flex-shrink-0 object-cover mx-1 rounded-full w-10 h-10" src={obj?.senderId?.profilePicture} />


                            <div class="mx-1 flex ">
                                <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-900 ">{obj?.senderId?.username}</h1>
                                <p class="text-sm font-semibold text-gray-700 dark:text-gray-900 pl-2">{obj.description}</p>

                            </div>
                        </div>

                         )
                })
                } 
                    </div>

                    : ""
            }

        </div>
    )
}

export default HeaderCompany