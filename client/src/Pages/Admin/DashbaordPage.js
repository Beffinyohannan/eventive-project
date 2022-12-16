import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import Dashboard from '../../Components/Admin/Dashboard/Dashboard'

function DashbaordPage() {
  return (
    <div className='flex'>
        <AdminSidebar/>
        <Dashboard/>
    </div>
  )
}

export default DashbaordPage