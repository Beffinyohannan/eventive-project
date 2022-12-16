import React from 'react'
import HeaderCompany from '../../Components/Company/Header/HeaderCompany'
import InboxCompany from '../../Components/Company/Inbox/InboxCompany'
import CompanyBottomNavbar from '../../Components/Company/Sidebar/CompanyBottomNavbar'
import CompanySidebar from '../../Components/Company/Sidebar/CompanySidebar'

function InboxCompanyPage() {
  return (
    <div>
        <HeaderCompany/>
        <CompanySidebar/>
        <InboxCompany/>
        <CompanyBottomNavbar/>
    </div>
  )
}

export default InboxCompanyPage