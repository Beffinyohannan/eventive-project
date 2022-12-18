import React, { useContext } from 'react'
import HeaderCompany from '../../Components/Company/Header/HeaderCompany'
import ProfileCompany from '../../Components/Company/Profile/ProfileCompany'
import CompanyBottomNavbar from '../../Components/Company/Sidebar/CompanyBottomNavbar'
import CompanySidebar from '../../Components/Company/Sidebar/CompanySidebar'
import { CompanyContext } from '../../Store/CompanyContext'

function ProfileCompanyPage() {
  const { companyDetails, setCompanyDetails } = useContext(CompanyContext)
   const companyId = companyDetails._id
  return (
    <div>
        <HeaderCompany/>
        <CompanySidebar/>
        <ProfileCompany company={companyId}/>
        <CompanyBottomNavbar/>
    </div>
  )
}

export default ProfileCompanyPage