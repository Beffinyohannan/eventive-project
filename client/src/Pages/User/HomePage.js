import React from 'react'
import Feed from '../../Components/User/Feed/Feed'
import Header from '../../Components/User/Header/Header'
import RightbarUser from '../../Components/User/Sidebar/RightbarUser'
import BottomNavbar from '../../Components/User/Sidebar/BottomNavbar'
import Sidebar from '../../Components/User/Sidebar/Sidebar'

function HomePage() {

  return (
    <div >
        <Header/>
        <Sidebar />
        <div className=' flex min-h-screen justify-center md:justify-end bg-slate-50'>
        <div className='w-full sm:w-4/5  flex justify-center lg:justify-end xl:justify-start '>
        <Feed/>
        </div>
        {/* <RightbarUser/> */}
        </div>
        <BottomNavbar/>
        
    </div>
  )
}

export default HomePage