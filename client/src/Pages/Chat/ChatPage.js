import React from 'react'
import Chat from '../../Components/Chat/Chat'
import Header from '../../Components/User/Header/Header'
import BottomNavbar from '../../Components/User/Sidebar/BottomNavbar'
import Sidebar from '../../Components/User/Sidebar/Sidebar'

function ChatPage() {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <Chat/>
        <BottomNavbar/> 
    </div>
  )
}

export default ChatPage