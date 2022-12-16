import React from 'react'
import EnquireForm from '../../Components/User/EnquireForm/EnquireForm'
import Header from '../../Components/User/Header/Header'
import BottomNavbar from '../../Components/User/Sidebar/BottomNavbar'
import Sidebar from '../../Components/User/Sidebar/Sidebar'

function EnquireFormPage() {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <EnquireForm/>
        <BottomNavbar/>
    </div>
  )
}

export default EnquireFormPage