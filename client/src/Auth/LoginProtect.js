import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const LoginProtect=()=> {
    let auth = {'token':localStorage.getItem('token')}
    return(
        !auth.token ? <Outlet/> : <Navigate to={"/homepage"} />
       
    )
}

export default LoginProtect