import React from 'react'
import Event from '../../Components/User/Event/Event'
import Header from '../../Components/User/Header/Header'
import BottomNavbar from '../../Components/User/Sidebar/BottomNavbar'
import Sidebar from '../../Components/User/Sidebar/Sidebar'

function EventPage() {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className='w-full flex justify-center h-full  md:justify-end lg:justify-center  pt-3 bg-slate-50  '>
        <div className='w-4/5  md:pl-5 md:pr-3  flex justify-center lg:justify-end'>
        <Event/>
        </div>
      </div>
        
        <BottomNavbar/>
    </div>
  )
}

export default EventPage