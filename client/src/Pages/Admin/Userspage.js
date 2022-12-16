import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import Users from '../../Components/Admin/Users/Users'

function Userspage() {
  return (
    <div className='flex'>
        <AdminSidebar/>
        <Users/>
    </div>
  )
}

export default Userspage