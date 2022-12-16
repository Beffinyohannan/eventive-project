import React from 'react'
import ProfileCompany from '../../Components/Company/Profile/ProfileCompany'
import Header from '../../Components/User/Header/Header'
import BottomNavbar from '../../Components/User/Sidebar/BottomNavbar'
import Sidebar from '../../Components/User/Sidebar/Sidebar'

function CompanyProfilePage() {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <div>
            <ProfileCompany/>
        </div>
        <BottomNavbar/>
    </div>
  )
}

export default CompanyProfilePage