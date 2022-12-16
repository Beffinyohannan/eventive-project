import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'
import { TfiBell } from "react-icons/tfi";
import { UserContext } from '../../../Store/UserContext';
import { Link } from 'react-router-dom';



function Header() {
    const { userDetails, setUserDetails } = useContext(UserContext)
    // console.log(userDetails,'//////////////////////////');
    useEffect(() => {
        // console.log(userDetails,',,,,,,,,,,,,,,,,,,,,,,,,,,,,');
    }, [])
    const [isOpen, setOpen] = useState(false);

    const handleDropDown = () => {
        setOpen(!isOpen);
    };
    // document.addEventListener('',()=>{
    //     setOpen(false)
    // })


    return (
        <div className='bg-slate-100 fixed inset-x-0 top-0 z-10 border-b-2 border-slate-200' >

            <div className='flex items-center justify-between'>
                <div className='h-16'>

                    <img className='ml-6 ' src="https://imgs.search.brave.com/BgRuRD-2-DzB2DshFR9kH3yUajnrNb5ym7t3Y3nOKeA/rs:fit:512:512:1/g:ce/aHR0cHM6Ly9pbWFn/ZXMudmV4ZWxzLmNv/bS9tZWRpYS91c2Vy/cy8zLzE0NTIzNC9p/c29sYXRlZC9wcmV2/aWV3LzkzMWNkMjYx/YWQ3OGQwYzRmMGIy/Y2VkYTg5M2UxNDJi/LWV2ZW50LXBsYW5u/aW5nLWxvZ290eXBl/LWJ5LXZleGVscy5w/bmc" alt="" width={85} height={80} layout='fixed' />
                </div>

               


                {/* <button id="dropdownDefault" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={handleDropDown} >Dropdown button <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>

                <div id="dropdown" class={`z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 ${isOpen ? "block" : "hidden"
                    }`} >
                    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault" >
                        <li>
                            <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                        </li>
                    </ul>
                </div> */}



                <div className='flex items-center cursor-pointer md:px-10 sm:h-14 justify-evenly mr-3'>
                    <div className='flex pr-5'>
                        <FaSearch className='h-15' />
                        <TfiBell className='h-15 ml-3' />
                    </div>
                    <div>
                        <div className='flex items-center space-x-2'>
                            <img src="https://imgs.search.brave.com/JC3yuRG8o8d2G-kk-gDv7DrSKVLLPa5QoIK2uoMr9QE/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/enVZTVhkQjNEUFVu/UE9ld2hha0N3SGFG/ZSZwaWQ9QXBp" className='rounded-full' width={40} height={40} alt="" />
                            <div>
                                <Link to={'/profile'} className='font-medium'>
                                    {userDetails.username}
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default Header