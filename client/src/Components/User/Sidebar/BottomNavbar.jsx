import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {HiOutlineBell,HiOutlineCog,HiOutlineClipboardList,HiOutlineGlobeAlt,HiOutlineTable} from 'react-icons/hi'
import {AiOutlineHome} from 'react-icons/ai'

function BottomNavbar() {

    const Menus=[
        // {name:'Settings',link:'#',icon:HiOutlineCog,dis:"translate-x-64"},
        {name:'Enquire',link:'/enquire-form',icon:HiOutlineClipboardList,dis:"translate-x-82"},
        {name:'Company',link:'/companies',icon:HiOutlineGlobeAlt,dis:"translate-x-32"},
        {name:'Home',link:'/homepage',icon:AiOutlineHome,dis:"translate-x-0"},
        {name:'Events',link:'/events',icon:HiOutlineTable,dis:"translate-x-48"},
        {name:'Notification',link:'/inbox',icon:HiOutlineBell,dis:"translate-x-16"},
    ]

    const [active,setActive]=useState()

  return (
    <div className='bg-slate-100 max-h-[4.4rem] px-6 pb-5 rounded-t-xl md:hidden fixed inset-x-0 bottom-0'>
        <ul className='flex relative justify-between'>
                {/* <span className={`bg-rose-600 duration-500 ${Menus[active].dis} border-4 border-white h-16 w-16  -top-5 rounded-full`}></span> */}

            {Menus.map((menu,i)=>(
                <li key={i} className="w-16">
                    <Link to={menu?.link} className='flex flex-col  pt-6' onClick={()=>setActive(i)}>
                    <span className={`text-xl pl-2 cursor-pointer duration-500 ${i=== active && "-mt-6 text-blue-900"}`}>{React.createElement(menu?.icon,{size:"20"})}</span>

                    <span className={`text-xs ${active === i ? "translate-y-4 duration-700 opacity-100" : "opacity-0 translate-y-10 hidden"}` }>{menu.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default BottomNavbar