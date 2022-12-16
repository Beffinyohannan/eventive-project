import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import Companies from '../../Components/Admin/Companies/Companies'

function CompaniesPage() {
  return (
    <div className='flex'>
        <AdminSidebar/>
        <Companies/>
    </div>
  )
}

export default CompaniesPage