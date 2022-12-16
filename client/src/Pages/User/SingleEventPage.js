import React from 'react'
import SingleView from '../../Components/User/Event/SingleView'
import Header from '../../Components/User/Header/Header'
import BottomNavbar from '../../Components/User/Sidebar/BottomNavbar'
import Sidebar from '../../Components/User/Sidebar/Sidebar'

function SingleEventPage() {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className='w-full flex justify-center h-full  md:justify-end lg:justify-center  pt-3 bg-slate-50 '>
                <div className='w-full sm:w-4/5  md:pl-5 md:pr-3  flex justify-center lg:justify-end'>
                    <SingleView/>
                </div>
            </div>
        <BottomNavbar/>
    </div>
  )
}

export default SingleEventPage