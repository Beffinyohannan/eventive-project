import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { findSearch } from '../../../api/UserRequest'

function Rightbar() {

  /* ------------------------------ SEARCH USERS ------------------------------ */

  const [serachUser, setSearchUser] = useState([])

  const handleSearch = async (e) => {
    const val = e.target.value
    if (val == '') {
      setSearchUser([])
    }
    try {
      const { data } = await findSearch(val)
      console.log(data, 'jjjjjj');
      setSearchUser(data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=' mb-4 hidden xl:block fixed right-0 top-0 bg-slate-100 h-full '>
      <div className='flex justify-center '>
        <div className=' w-80 mt-4 px-3'>
          <h1 className='font-semibold text-lg my-4'>Search Companies</h1>

          <div class="flex justify-center mb-4">
            <div class="mb-3 xl:w-96">
              <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
                <input type="search" onChange={handleSearch} class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
              
              </div>
              {serachUser.length !== 0 ?
                serachUser.map((obj) => (
                  <div>
                    <Link to={`/profile/company/${obj._id}`}>
                      <a class="flex items-center px-3 py-2 text-sm transition duration-150  ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                        <img class="object-cover w-10 h-10 rounded-full"
                          src={'/images/' + obj.profilePicture} alt="username" />
                        <div class="w-full pb-2">
                          <div class="flex justify-between">
                            <span class="block ml-2 font-semibold text-gray-600">{obj.companyName}</span>
                          </div>
                          <span class="block ml-2 text-sm text-gray-400">{obj.companyType}</span>
                        </div>
                      </a></Link>

                  </div>
                ))
                : null}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Rightbar