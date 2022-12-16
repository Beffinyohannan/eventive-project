import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const CompanyRouteProtect=()=> {
    let auth = {'token':localStorage.getItem('company-token')} 
  return (
    auth.token ? <Outlet/> : <Navigate to={"/company/login"} />
  )
}
 

export default CompanyRouteProtect