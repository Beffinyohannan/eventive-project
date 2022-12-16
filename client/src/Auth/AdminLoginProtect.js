import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminLoginProtect=()=> {
    let auth = {'token':localStorage.getItem('admin-token')} 
    return (
      !auth.token ? <Outlet/> : <Navigate to={"/admin/dashboard"} />
    )
}

export default AdminLoginProtect