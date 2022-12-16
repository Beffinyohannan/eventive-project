import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const CompanyLoginProtect=()=> {
    let auth = {'token':localStorage.getItem('company-token')} 
    return (
      !auth.token ? <Outlet/> : <Navigate to={"/company/homepage"} />
    )
}

export default CompanyLoginProtect