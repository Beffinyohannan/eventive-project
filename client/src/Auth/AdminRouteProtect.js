import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRouteProtect=()=> {
    let auth = {'token':localStorage.getItem('admin-token')} 
    return (
      auth.token ? <Outlet/> : <Navigate to={"/admin/login"} />
    )
}

export default AdminRouteProtect