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

function HeaderCompany() {
    const { companyDetails, setCompanyDetails } = useContext(CompanyContext)
    const companyId = companyDetails?._id
    const [showSearch, setShowSearch] = useState(false)
    const [openProfile, setOpenProfile] = useState(false);


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
    const handlebtn =()=>{
        setShowSearch(!showSearch)
        setSearchUser([])
    }

    const navigate = useNavigate()


    const logout = (() => {
        console.log('gfdghsfgdfjgjhkj');
        // removeCookie("admin-token")
        // alert('Logout Sucessfully')
        // window.location.href="/admin-login"
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
                            navigate('/company/login')
                        })
                    }
                },
                {
                    label: 'No',
                    onClick:()=>{setOpenProfile(!openProfile)}
                }
            ]
        });

    })

    return (
        <div className='bg-slate-100 fixed inset-x-0 top-0 z-10 border-b-2 border-slate-200 md:hidden'>

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
                                    {/* <button class="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  items-center" type="button" id="button-addon2">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                </svg>
                            </button> */}
                                </div>
                            </div>
                        </div>
                        : ""}

                    {serachUser.length !== 0 ?
                        <div className='absolute mt-32 mr-32 lg:mr-60'>
                            {serachUser.map((obj) => (
                                <div>
                                    <Link to={`/company/profile/${obj._id}`}>
                                        <a class="flex items-center px-3 py-2 text-sm transition duration-150  ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                                            <img class="object-cover w-10 h-10 rounded-full"
                                                src={'/images/' + obj.profilePicture} alt="username" />
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

                        <FaSearch size={20} className='h-12 mt-2 ml-3' onClick={handlebtn} />
                        {/* <TfiBell className='h-15 ml-3 mt-3' /> */}
                    </div>
                    <div>
                        <div className='flex items-center space-x-2' onClick={() => setOpenProfile(!openProfile)}>
                            <img src="https://imgs.search.brave.com/JC3yuRG8o8d2G-kk-gDv7DrSKVLLPa5QoIK2uoMr9QE/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/enVZTVhkQjNEUFVu/UE9ld2hha0N3SGFG/ZSZwaWQ9QXBp" className='rounded-full' width={40} height={40} alt="" />
                            <div>
                                <Link  className='font-medium'>{companyDetails.companyName}</Link>
                            </div>
                        </div>
                        {openProfile ?
                        <div className='absolute mt-2  border shadow-md rounded-xl px-5 py-2  cursor-pointer text-xl font-medium bg-slate-50'>
                            <ul >
                                <li className='hover:bg-gray-200 rounded-md px-2 py-2'><Link to={`/company/profile/${companyId}`}>Profile</Link> </li>
                                <li className='hover:bg-gray-200 rounded-md px-2 py-2' onClick={logout}>  Logout</li>
                            </ul>
                        </div>
                            : null}
                    </div>

                </div>


            </div>

        </div>
    )
}

export default HeaderCompany