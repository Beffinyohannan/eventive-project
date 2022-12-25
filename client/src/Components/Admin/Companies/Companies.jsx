import React,{useState,useEffect} from 'react'
import axios from '../../../api/axios';
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import Swal from 'sweetalert2'
import { companyView } from '../../../api/AdminRequest';
import adminInstance from '../../../axios/adminAuth';

function Companies() {

  const [state, setState] = useState([])
    const [block,setBlock]=useState(false)


    useEffect(() => {

        const viewCompany=async()=>{
            try {
              const {data} =await companyView() 
              setState(data) 
            } catch (error) {
                console.log(error.message);
            }
        }
        viewCompany()
       
    },[block])

    const blockUser = (id) => {
      confirmAlert({
          title: 'Confirm your submit',
          message: 'Are you sure to Block the User.',
          buttons: [
              {
                  label: 'Yes',
                  onClick: () => {
                      adminInstance.post("/admin/block-company/" + id).then((response) => {
                          console.log(response, 'reject');
                          if (response.status === 200) {
                              console.log(response.data, 'rejjjjjjjjjjjjjj');
                              setBlock(!block)
                              // alert('Form Rejected Sucessfully')
                              Swal.fire({
                                  position: 'top-end',
                                  icon: 'success',
                                  title: 'User Blocked Sucessfully',
                                  showConfirmButton: false,
                                  timer: 1500
                              })
                          } else {
                              console.log('rejected not completed ');
                              // alert('Something Went Wrong')
                              Swal.fire({
                                  position: 'top-end',
                                  icon: 'success',
                                  title: 'Something Went Wrong',
                                  showConfirmButton: false,
                                  timer: 1500
                              })
                          }
                      }).catch((error) => {
                          console.log(error.message, 'rrrrrrrrrrrr');
                          // alert(error.message)
                          Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: error.message,
                              showConfirmButton: false,
                              timer: 1500
                          })
                      })
                  }
              },
              {
                  label: 'No',
                  // onClick: () => alert('Click No')
              }
          ]
      });
  }

  const unblockUser = (id) => {
      confirmAlert({
          title: 'Confirm your submit',
          message: 'Are you sure to Unblock the User.',
          buttons: [
              {
                  label: 'Yes',
                  onClick: () => {
                      adminInstance.post("/admin/unblock-company/" + id).then((response) => {
                          console.log(response, 'reject');
                          if (response.status === 200) {
                              console.log(response.data, 'rejjjjjjjjjjjjjj');
                              setBlock(!block)
                              // alert('Form Rejected Sucessfully')
                              Swal.fire({
                                  position: 'top-end',
                                  icon: 'success',
                                  title: 'User Unblocked Sucessfully',
                                  showConfirmButton: false,
                                  timer: 1500
                              })
                          } else {
                              console.log('rejected not completed ');
                              // alert('Something Went Wrong')
                              Swal.fire({
                                  position: 'top-end',
                                  icon: 'success',
                                  title: 'Something Went Wrong',
                                  showConfirmButton: false,
                                  timer: 1500
                              })
                          }
                      }).catch((error) => {
                          console.log(error.message, 'rrrrrrrrrrrr');
                          // alert(error.message)
                          Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: error.message,
                              showConfirmButton: false,
                              timer: 1500
                          })
                      })
                  }
              },
              {
                  label: 'No',
                  // onClick: () => alert('Click No')
              }
          ]
      });
  }

  return (
    <div className='w-4/5'>
    {/* <div className='m-6 pb-2 pr-7'>
   <button className='border w-50 px-4 py-1 rounded-full float-right  bg-slate-700  hover:bg-slate-600  text-white' >Logout</button>

    </div> */}
    <div class="bg-white p-8 rounded-md  ">

        <div class=" flex items-center justify-between pb-6 ">

            <div>
                <h2 class="text-gray-600 font-semibold">USERS LIST</h2>
                {/* <span class="text-xs">Pending Companies</span> */}
            </div>

            <div class="flex items-center justify-between">
               
            </div>
        </div>
        <div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-7 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    ID
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Company Type
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Company Address
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    phone
                                </th>

                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th
                                    class="px-16 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.map((obj, index) => {

                                    return (

                                        <tr>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div class="flex items-center">
                                                    <div class="ml-3">
                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                            {obj._id}

                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {obj.companyName}

                                                </p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {obj.email}

                                                </p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {obj.companyType}

                                                </p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {obj.companyAddress}

                                                </p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {obj.phone}

                                                </p>
                                            </td>

                                            <td class="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                                            {obj.status === 'Active' ? <span
                                                            class="relative inline-block px-1 py-1 font-semibold text-green-900 leading-tight">
                                                            <span aria-hidden
                                                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                            <span class="relative">
                                                                {obj.status}

                                                            </span>
                                                        </span>
                                                            :  <span
                                                                class="relative inline-block px-1  py-1 font-semibold text-slate-900 leading-tight">
                                                                <span aria-hidden
                                                                    class="absolute inset-0 bg-slate-400 opacity-50 rounded-full"></span>
                                                                <span class="relative">
                                                                    {obj.status}

                                                                </span>
                                                            </span>
                                                        }
                                            </td>
                                            <td className='flex m-5'>
                                                {obj.status === "Active" ?

                                                    <button className='border w-full  my-1 py-2  rounded-full bg-indigo-600  hover:bg-indigo-500 relative text-white' onClick={(e) => { blockUser(obj._id) }}>block</button> :

                                                    <button className='border w-full my-1  py-2 rounded-full bg-slate-800  hover:bg-slate-600 relative text-white' onClick={(e) => { unblockUser(obj._id) }}  >unblock</button>
                                                }
                                            </td>

                                        </tr>
                                    )
                                })
                            }




                        </tbody>
                    </table>


                    {/* <div
               class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
               <span class="text-xs xs:text-sm text-gray-900">
                   Showing 1 to 10 of 50 Entries
               </span>
               <div class="inline-flex mt-2 xs:mt-0">
                   <button
                       class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                       Prev
                   </button>
                   &nbsp; &nbsp;
                   <button
                       class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                       Next
                   </button>
               </div>
           </div> */}
                </div>
            </div>
        </div>
    </div>
</div >
  )
}

export default Companies