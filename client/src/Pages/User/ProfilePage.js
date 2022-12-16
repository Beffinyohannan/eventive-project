import React from 'react'
import Header from '../../Components/User/Header/Header'
import Profile from '../../Components/User/Profile/Profile'
import BottomNavbar from '../../Components/User/Sidebar/BottomNavbar'
import Sidebar from '../../Components/User/Sidebar/Sidebar'

function ProfilePage() {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <div>
            <Profile/>
        </div>
        <BottomNavbar/>
    </div>
  )
}

export default ProfilePage