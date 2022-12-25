import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../api/axios'
import { UserContext } from '../../../Store/UserContext'
import Post from '../Post/Post'
import nopost from '../../../assets/camera.png'
import RightbarUser from '../Sidebar/RightbarUser'
import { Link } from 'react-router-dom'
import userInstance from '../../../axios/userAuth'


function Feed() {

  const [posts, setPosts] = useState([])
  const [block, setBlock] = useState('')

  const { userDetails } = useContext(UserContext)
  const userId = userDetails?._id
  const [follow, setFollow] = useState(false)
  const [state, setState] = useState([])
  // console.log(posts,'zxcvbnm,');

  useEffect((e) => {
    // console.log('useeffect called');
    userInstance.get(`/viewPosts/${userId}`).then((response) => {
      console.log(response.data);
      setPosts(response.data)
      console.log(posts);

    })
  }, [block, follow])

  /* ------------------------------- follow user ------------------------------ */






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
  state.length = 3

  const handleFollow = (id) => {
    userInstance.put(`/follow/${userId}`, { id }).then((res) => {
      console.log(res);
      setFollow(!follow)

    })
  }


  return (
    <div className='w-full  mb-24 sm:w-4/5 pt-24 flex flex-col items-center lg:justify-start '>
      {/* <div className=' sm:w-full  lg:w-10/12  flex flex-col items-center xl:items-start  '> */}

      {/* <div className='flex flex-col items-center lg:pl-12 xl:pl-0 xl:pr-28'> */}
      {posts?.length === 0 ?
        <div className='mt-20'>
          <img className='w-52 ml-3' src={nopost} alt="" />
          <h1 className='pl-14 pt-3 text-lg font-semibold'>No Post Yet</h1>
          <p className='pl-8 pt-3'>Please Follow Some One...</p>
          <div className='mt-8'>
            {
              state.map((obj, index) => {

                return (
                  <div >
                    {!obj.followers.includes(userId) ?
                      <div className=' flex justify-between py-2 px-4 mb-3 h-16 bg-white   rounded-2xl border-slate-200 border-t shadow-md'>
                        <div className='flex'>
                          <div className='m-1 '>
                            <img src={obj.profilePicture} className='rounded-full' width={32} alt="" />
                          </div>
                          <div className='ml-3'>
                            <Link to={`/profile/company/${obj._id}`} className='text-md font-medium pb-1 cursor-pointer'>{obj.companyName}</Link>
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
        </div>

        : ""}

      {
        posts.sort((a, b) => {
          return new Date(b.date) - new Date(a.date)
        }).map((obj, i) => (

          <Post key={obj._id} setBlock={setBlock} obj={obj} user={userId} />

        ))
      }

      {posts?.length === 0 ? "" :
        <RightbarUser />
      }

      {/* </div> */}
      {/* </div> */}
    </div>
  )
}

export default Feed