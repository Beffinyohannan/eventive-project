import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../../api/axios'
import userInstance from '../../../axios/userAuth'
import { UserContext } from '../../../Store/UserContext'
function RightbarUser() {

    const [state, setState] = useState([])
    const [block, setBlock] = useState(false)
    const { userDetails } = useContext(UserContext)
    const userId = userDetails?._id
    const [follow, setFollow] = useState(false)


    useEffect(() => {
        userInstance.get("/view-companies").then((response) => {
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
        userInstance.put(`/follow/${userId}`, { id }).then((res) => {
            console.log(res);
            setFollow(!follow)

        })
    }

    return (
        <div className='bg-slate-100 w-80 pt-28 px-5 h-full hidden xl:block fixed right-0 top-0'>

            <h1 className='mb-3 '>Sugesstions</h1>
            {
                state.map((obj, index) => {

                    return (
                        <div>
                            {!obj.followers.includes(userId) ?
                                <div className=' flex justify-between py-2 px-4 mb-3 h-16 bg-white   rounded-2xl border-slate-200 border-t shadow-md'>
                                    <div className='flex'>
                                        <div className='m-1'>
                                            <img src={obj.profilePicture} className='rounded-full w-10 ' alt="" />
                                        </div>
                                        <div className='ml-3'>
                                            <Link to={`/profile/company/${obj._id}`} className='text-md font-medium pb-1 cursor-pointer '>{obj.companyName}</Link>
                                            {/* <p>description about the companies are  provides here</p> */}
                                        </div>
                                    </div>
                                    <div className='mt-1 '>
                                        <button className='ml-4  bg-slate-900 text-white px-4 py-0.5 rounded-xl' onClick={(e) => { handleFollow(obj._id) }} > {!obj.followers.includes(userId) ? 'follow' : 'unfollow'}</button>
                                    </div>
                                </div>
                                : ''}
                        </div>
                    )
                }
                )}
        </div>
    )
}

RightbarUser.propTypes = {}

export default RightbarUser
