import React,{useContext} from 'react'
import { FaSearch } from 'react-icons/fa'
import { TfiBell } from "react-icons/tfi";

function HeaderCompany() {

    // const {userDetails,setUserDetails}=useContext(UserContext)

  return (
    <div className='bg-slate-100 fixed inset-x-0 top-0 z-10 border-b-2 border-slate-200 md:hidden'>

    <div className='flex items-center justify-between'>
        <div className='h-16'>

        <img className='ml-6 ' src="https://imgs.search.brave.com/BgRuRD-2-DzB2DshFR9kH3yUajnrNb5ym7t3Y3nOKeA/rs:fit:512:512:1/g:ce/aHR0cHM6Ly9pbWFn/ZXMudmV4ZWxzLmNv/bS9tZWRpYS91c2Vy/cy8zLzE0NTIzNC9p/c29sYXRlZC9wcmV2/aWV3LzkzMWNkMjYx/YWQ3OGQwYzRmMGIy/Y2VkYTg5M2UxNDJi/LWV2ZW50LXBsYW5u/aW5nLWxvZ290eXBl/LWJ5LXZleGVscy5w/bmc" alt="" width={85} height={80} layout='fixed' />
        </div>

        <div className='flex items-center cursor-pointer md:px-10 sm:h-14 justify-evenly mr-3'>
            <div className='flex pr-5'>
            <FaSearch className='h-15' />
            <TfiBell className='h-15 ml-3' />
            </div>
            <div>
                    <div className='flex items-center space-x-2'>
                        <img src="https://imgs.search.brave.com/JC3yuRG8o8d2G-kk-gDv7DrSKVLLPa5QoIK2uoMr9QE/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/enVZTVhkQjNEUFVu/UE9ld2hha0N3SGFG/ZSZwaWQ9QXBp" className='rounded-full' width={40} height={40} alt="" />
                        <div>
                            <p className='font-medium'>company</p>
                        </div>
                </div>
            </div>

        </div>


    </div>

</div>
  )
}

export default HeaderCompany