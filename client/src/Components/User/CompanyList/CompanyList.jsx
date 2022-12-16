import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../../api/axios'
import { UserContext } from '../../../Store/UserContext'

function CompanyList() {
    const [state, setState] = useState([])
    const [block, setBlock] = useState(false)
    const { userDetails, setUserDetails } = useContext(UserContext)
    const userId = userDetails._id
    const [follow, setFollow] = useState(false)



    useEffect(() => {
        axios.get("/view-companies").then((response) => {
            // console.log(response.data);
            const { data } = response
            if (response.data) {
                setState(data)
                // console.log(state, 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');

            }
        }).catch((error) => {
            console.log(error.message);
        })
    }, [block, follow])

    const handleFollow = (id) => {
        axios.put(`/follow/${userId}`, { id }).then((res) => {
            console.log(res);
            setFollow(!follow)

        })
    }


    return (
        <div className=' mt-28 mb-4  lg:w-3/5 flex flex-col  '>
            <div class="flex justify-center mb-4">
                <div class="mb-3 xl:w-96">
                    <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
                        <input type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"/>
                            {/* <button class="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  items-center" type="button" id="button-addon2">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                </svg>
                            </button> */}
                    </div>
                </div>
            </div>
            {
                state.map((obj, index) => {

                    return (
                        <div className=' flex justify-between p-1 px-1 mb-3 bg-white  rounded-2xl border-slate-200 border-t shadow-md '>
                            <div className='flex'>
                                <div className='m-2 py-3 px-1'>
                                    <img src="https://imgs.search.brave.com/JC3yuRG8o8d2G-kk-gDv7DrSKVLLPa5QoIK2uoMr9QE/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/enVZTVhkQjNEUFVu/UE9ld2hha0N3SGFG/ZSZwaWQ9QXBp" className='rounded-full' width={70} height={60} alt="" />
                                </div>
                                <div className='ml-2 p-1 '>
                                    <Link to={`/profile/company/${obj._id}`} className='text-md sm:text-xl font-medium pb-1 cursor-pointer'>{obj.companyName}</Link>
                                    <p >{obj.email}</p>
                                    <p>{obj.companyType}</p>
                                </div>
                            </div>
                            <div className='m-2 py-5'>
                                <button className='ml-4 w-24 bg-slate-900 text-white px-2 py-0.5 rounded-2xl' onClick={(e) => { handleFollow(obj._id) }} > {!obj.followers.includes(userId) ? ' follow ' : 'unfollow'}</button>
                            </div>
                        </div>
                    )
                }
                )}
        </div>
    )
}

export default CompanyList