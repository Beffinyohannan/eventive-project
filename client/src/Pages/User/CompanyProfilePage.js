import React, { useContext } from 'react'
import ProfileCompany from '../../Components/Company/Profile/ProfileCompany'
import Header from '../../Components/User/Header/Header'
import BottomNavbar from '../../Components/User/Sidebar/BottomNavbar'
import Sidebar from '../../Components/User/Sidebar/Sidebar'
import { UserContext } from '../../Store/UserContext'

function CompanyProfilePage() {

  const { userDetails } = useContext(UserContext)
  const userId = userDetails?._id

  return (
    <div>
        <Header/>
        <Sidebar/>
        <div>
            <ProfileCompany userId={userId}/>
        </div>
        <BottomNavbar/>
    </div>
  )
}

export default CompanyProfilePage