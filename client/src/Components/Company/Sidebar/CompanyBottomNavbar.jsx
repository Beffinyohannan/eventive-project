import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {HiMenuAlt3,HiOutlineBell,HiOutlineCog,HiOutlineClipboardList,HiOutlineGlobeAlt,HiOutlineTable,HiUserCircle} from 'react-icons/hi'
import {AiOutlineHome} from 'react-icons/ai'

function CompanyBottomNavbar() {

    const Menus=[
        {name:'Home',link:'/company/homepage',icon:AiOutlineHome},
        {name:'Notification',link:'#',icon:HiOutlineBell},
        // {name:'Add Post',link:'/companies',icon:HiOutlineGlobeAlt},
        {name:'Profile',link:'/company/profile',icon:HiUserCircle},
        {name:'Settings',link:'#',icon:HiOutlineCog},
        // {name:'Enquire Event',link:'#',icon:HiOutlineClipboardList},
    ]

    const [active,setActive]=useState(0)
    console.log(active);

  return (
    <div className='bg-slate-100 max-h-[4.4rem] px-6 pb-5 rounded-t-xl md:hidden fixed inset-x-0 bottom-0'>
    <ul className='flex relative justify-between'>
            {/* <span className={`bg-rose-600 duration-500 ${Menus[active].dis} border-4 border-white h-16 w-16  -top-5 rounded-full`}></span> */}

        {Menus.map((menu,i)=>(
            <li key={i} className="w-16" onClick={()=>setActive(i)}>
                <Link to={menu?.link} className='flex flex-col  pt-6' >
                <span className={`text-xs ${active === i ? "translate-y-4 duration-700 opacity-100" : "opacity-0 translate-y-10 hidden"}` }>{menu.name}</span>
                <span className={`text-xl pl-2 cursor-pointer duration-500 ${i=== active && "-mt-6 text-blue-900"}`}>{React.createElement(menu?.icon,{size:"20"})}</span>

                </Link>
            </li>
        ))}
    </ul>
</div>
  )
}

export default CompanyBottomNavbar