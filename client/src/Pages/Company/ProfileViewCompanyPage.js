import React from 'react'
import HeaderCompany from '../../Components/Company/Header/HeaderCompany'
import ProfileCompany from '../../Components/Company/Profile/ProfileCompany'
import CompanyBottomNavbar from '../../Components/Company/Sidebar/CompanyBottomNavbar'
import CompanySidebar from '../../Components/Company/Sidebar/CompanySidebar'

function ProfileViewCompanyPage() {
  return (
    <div>
        <HeaderCompany/>
        <CompanySidebar/>
        <ProfileCompany/>
        <CompanyBottomNavbar/>
    </div>
  )
}

export default ProfileViewCompanyPage