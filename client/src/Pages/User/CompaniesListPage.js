import React from 'react'
import CompanyList from '../../Components/User/CompanyList/CompanyList'
import Header from '../../Components/User/Header/Header'
import BottomNavbar from '../../Components/User/Sidebar/BottomNavbar'
import Sidebar from '../../Components/User/Sidebar/Sidebar'

function CompaniesListPage() {
  return (
    <div className='flex bg-slate-50 h-screen'>
      <Header />
      <Sidebar />
      <div className='w-full flex justify-center  md:justify-end lg:justify-center  pt-3  '>
        <div className='w-4/5  md:pl-5 md:pr-3  flex justify-center'>
          <CompanyList />
        </div>
      </div>

      <BottomNavbar />
    </div>
  )
}

export default CompaniesListPage