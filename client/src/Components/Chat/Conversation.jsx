import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/CompanyRequest'
import { getUserDetail } from '../../api/UserRequest'

function Conversation({ data, currentUserId ,online}) {

  const [userData, setUserData] = useState({})

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId)
    console.log(userId,'!!!!!!!!');
    const getUserData = async () => {
      try {

        const { data } = await getUser(userId)
        setUserData(data)
        console.log(userData,'______________');
        
      } catch (error) {
        console.log(error);
      }
    }
    getUserData()
  }, [])

  return (
    <div>
      <div
        className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
        <img className="object-cover w-10 h-10 rounded-full"
          src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg" alt="username" />
        <div className="w-full pb-2">
          <div className="flex justify-between">
            <span className="block ml-2 font-semibold text-gray-600">{userData.companyName}</span>
            <span className="block ml-2 text-sm text-gray-600">25 minutes</span>
          </div>
          <span className="block ml-2 text-sm text-gray-600">{online? "Online": "Offline"}</span>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Conversation