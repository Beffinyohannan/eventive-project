import React from 'react'
import Header from '../../Components/User/Header/Header'
import Inbox from '../../Components/User/Inbox/Inbox'
import InboxUser from '../../Components/User/Inbox/InboxUser'
import BottomNavbar from '../../Components/User/Sidebar/BottomNavbar'
import Sidebar from '../../Components/User/Sidebar/Sidebar'

function InboxPage() {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <InboxUser/>
        <BottomNavbar/>
    </div>
  )
}

export default InboxPage