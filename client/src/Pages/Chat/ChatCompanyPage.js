import React from 'react'
import ChatCompany from '../../Components/Chat/ChatCompany'
import HeaderCompany from '../../Components/Company/Header/HeaderCompany'
import CompanyBottomNavbar from '../../Components/Company/Sidebar/CompanyBottomNavbar'
import CompanySidebar from '../../Components/Company/Sidebar/CompanySidebar'

function ChatCompanyPage() {
  return (
    <div>
      <HeaderCompany/>
        <CompanySidebar/>
        {/* <Chat/> */}
        <ChatCompany/>
        <CompanyBottomNavbar/>
    </div>
  )
}

export default ChatCompanyPage