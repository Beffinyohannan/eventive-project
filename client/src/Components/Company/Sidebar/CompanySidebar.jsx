import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiMenuAlt3, HiOutlineBell, HiOutlineCog, HiOutlineClipboardList, HiOutlineGlobeAlt, HiOutlineTable, HiUserCircle, HiLogout } from 'react-icons/hi'
import { AiOutlineHome } from 'react-icons/ai'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie'
// import '../../../App.css'
import './sidebar.css'
import { CompanyContext } from '../../../Store/CompanyContext'

function CompanySidebar() {
    const { companyDetails, setCompanyDetails } = useContext(CompanyContext)
     const companyId = companyDetails._id
     console.log(companyId);

    const Menus = [
        { name: 'Home', link: '/company/homepage', icon: AiOutlineHome },
        { name: 'Inbox', link: '/company/inbox', icon: HiOutlineBell },
        // {name:'Add Post',link:'/companies',icon:HiOutlineGlobeAlt},
        { name: 'Profile', link: `/company/profile/${companyId}`, icon: HiUserCircle },
        { name: 'Events', link: '/company/events', icon: HiOutlineTable },
        // { name: 'Settings', link: '#', icon: HiOutlineCog },
        // {name:'Logout',link:'',icon:HiLogout},
        // {name:'Enquire Event',link:'#',icon:HiOutlineClipboardList},
    ]

    const [open, setOpen] = useState(true)
    const [active,setActive]=useState()
    

    const handleClick=()=>{
        setActive(current=>!current)
    }


    const [cookies, setCookie, removeCookie] = useCookies('');
    const navigate = useNavigate()


    const logout = (() => {
        console.log('gfdghsfgdfjgjhkj');
        // removeCookie("admin-token")
        // alert('Logout Sucessfully')
        // window.location.href="/admin-login"
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to Logout.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        // removeCookie("company-token")
                        localStorage.removeItem("company-token")
                        localStorage.removeItem("company")
                        //    navigate("/admin-login")
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'You are successfully logged out',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            navigate('/company/login')
                        })
                    }
                },
                {
                    label: 'No',
                    // onClick: () => alert('Click No')
                }
            ]
        });

    })

    return (
        <div className={`bg-slate-100 min-h-screen ${open ? 'w-72' : 'w-16'} duration-500  text-black px-4 hidden  md:w-40 lg:w-72 md:block fixed border `}>
            <div className='flex justify-between'>
                <div>
                    <img className={`whitespace-pre duration-500  ${!open && 'hidden '} `} src="https://imgs.search.brave.com/BgRuRD-2-DzB2DshFR9kH3yUajnrNb5ym7t3Y3nOKeA/rs:fit:512:512:1/g:ce/aHR0cHM6Ly9pbWFn/ZXMudmV4ZWxzLmNv/bS9tZWRpYS91c2Vy/cy8zLzE0NTIzNC9p/c29sYXRlZC9wcmV2/aWV3LzkzMWNkMjYx/YWQ3OGQwYzRmMGIy/Y2VkYTg5M2UxNDJi/LWV2ZW50LXBsYW5u/aW5nLWxvZ290eXBl/LWJ5LXZleGVscy5w/bmc" alt="" width={80} height={80} layout='fixed' />

                    {/* <h1 className={`whitespace-pre duration-500 font-bold text-lg ml-5 mt-5 ${!open && 'hidden '} `}>Eventive</h1> */}
                </div>
                <div className='py-3 flex justify-end'>
                    {/* <HiMenuAlt3 size={26} className="cursor-pointer" onClick={()=>setOpen(!open)} />  */}
                </div>
            </div>
            <div className='mt-4 flex flex-col gap-4 relative'>
                {
                    Menus?.map((menu, i) => (
                        <Link to={menu?.link} key={i} className="group flex items-center text-lg gap-3.5 font-medium p-2 hover:bg-gray-200 rounded-md" onClick={()=>setActive(i)} >
                            <div>{React.createElement(menu?.icon, { size: "24" })}</div>
                            <h2
                                style={{ transitionDelay: `${i + 2}00ms`, }}
                                className={`whitespace-pre duration-500 ${active=== i ? "bg-slate-200":""}  `} >{menu?.name}</h2>
                            
                        </Link>
                    ))
                }
                <button
                    class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-900 border border-transparent rounded-lg active:bg-green-700 hover:bg-green-800 focus:outline-none focus:shadow-outline-purple"
                    onClick={logout}
                >
                    Logout
                    {/* <span class="ml-2" aria-hidden="true">+</span> */}
                </button>
            </div>
        </div>
    )
}

export default CompanySidebar