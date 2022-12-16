import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../api/axios'
import { UserContext } from '../../../Store/UserContext'
import Post from '../Post/Post'


function Feed() {

  const [posts, setPosts] = useState([])
  const [block, setBlock] = useState('')

  const { userDetails } = useContext(UserContext)
  const userId = userDetails?._id
  // console.log(posts,'zxcvbnm,');

  useEffect((e) => {
    // console.log('useeffect called');
    axios.get(`/viewPosts/${userId}`).then((response) => {
      // console.log(response.data);
      setPosts(response.data)

    })
  }, [block])


  return (
    <div className='w-full sm:w-4/5 pt-24 flex flex-col items-center lg:justify-start '>
      <div className=' sm:w-full  lg:w-10/12  flex flex-col items-center xl:items-start  '>

        <div className='flex flex-col items-center lg:pl-12 xl:pl-0 xl:pr-28'>
          {
            posts.map((obj, i) => (

              <Post key={obj.companyId} setBlock={setBlock} obj={obj} user={userId} />

            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Feed