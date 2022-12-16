import React, { useState, useEffect } from 'react'
import axios from '../../../api/axios';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import Swal from 'sweetalert2'
import { format } from 'timeago.js'
import Moment from 'moment'
import { viewPostAdmin } from '../../../api/AdminRequest';


function Posts() {

  const [state, setState] = useState([])
  const [block, setBlock] = useState(false)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  // console.log(PF,"pfff");


  useEffect(() => {
    const postView =async()=>{
      try {
        const {data} = await viewPostAdmin()
        setState(data)
      } catch (error) {
        console.log(error.message);
      }
    }
    postView()
    
  }, [block])

  const blockUser = (id) => {
    confirmAlert({
      title: 'Confirm your submit',
      message: 'Are you sure to Block the Post.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.post("/admin/block-post/" + id).then((response) => {
              console.log(response, 'reject');
              if (response.status == 200) {
                console.log(response.data, 'rejjjjjjjjjjjjjj');
                setBlock(!block)
                // alert('Form Rejected Sucessfully')
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Post Blocked Sucessfully',
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
      message: 'Are you sure to Unblock the Post.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.post("/admin/unblock-post/" + id).then((response) => {
              console.log(response, 'reject');
              if (response.status == 200) {
                console.log(response.data, 'rejjjjjjjjjjjjjj');
                setBlock(!block)
                // alert('Form Rejected Sucessfully')
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Post Unblocked Sucessfully',
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

  const [showModal, setShowModal] = useState(false);
  const [viewAllComment, setViewAllComment] = useState('')

  const [modalData, setModalData] = useState({});

  const fullDetails = (id) => {
    state.filter((obj) => {
      if (obj._id === id) {
        // setModalData(
        //   obj.comments
        // )
        setViewAllComment(obj.comments)
        setShowModal(true)
      }
    })
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
                      class="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Post ID
                    </th>
                    <th
                      class="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Company Name
                    </th>

                    <th
                      class="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th
                      class="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th
                      class="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Report
                    </th>
                    <th
                      class="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                          <td class="px-1 py-5 border-b border-gray-200 bg-white text-sm">
                            <div class="flex items-center">
                              {/* <div className='mr-4'>{index}</div> */}

                              <div class="flex-shrink-0 w-10 h-10">
                                <img class="w-full h-full rounded-full"
                                  src={PF + obj.image}
                                  alt="" />
                              </div>
                              <div class="ml-3">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  {obj._id}


                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="px-1 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {obj.companyName}

                            </p>
                          </td>

                          <td class="px-1 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {obj.description}

                            </p>
                          </td>
                          <td class="px-1 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {Moment(obj.date).format("MMM Do YY")}

                            </p>
                          </td>
                          <td class="px-1 py-5 pl-3 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {obj.reports.length}

                            </p>
                          </td>


                          <td class="px-1 py-5 border-b border-gray-200 bg-white text-sm">
                            {obj.status == true ? <span
                              class="relative inline-block px-1 py-1 font-semibold text-green-900 leading-tight">
                              <span aria-hidden
                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                              <span class="relative">
                                Active

                              </span>
                            </span>
                              : <span
                                class="relative inline-block px-1  py-1 font-semibold text-slate-900 leading-tight">
                                <span aria-hidden
                                  class="absolute inset-0 bg-slate-400 opacity-50 rounded-full"></span>
                                <span class="relative">
                                  Blocked

                                </span>
                              </span>
                            }
                          </td>
                          <td className='flex m-5 gap-1'>
                            <button className='border w-full  my-1  px-1  rounded-full bg-gray-600  hover:bg-gray-500 relative text-white text-sm' onClick={(e) => { fullDetails(obj._id) }}>View Comment</button>

                            {obj.status == true ?

                              <button className='border w-full  my-1 py-2  rounded-full bg-indigo-600  hover:bg-indigo-500 relative text-white text-sm' onClick={(e) => { blockUser(obj._id) }}>block</button> :

                              <button className='border w-full my-1  py-2 rounded-full bg-slate-800  hover:bg-slate-600 relative text-white text-sm' onClick={(e) => { unblockUser(obj._id) }}  >unblock</button>
                            }
                          </td>

                          {showModal ? (
                            <>
                              <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                              >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                  {/*content*/}
                                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">


                                    {/*body*/}
                                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none" id="modal">
                                      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                                        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400  ">

                                          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Post Comments</h1>
                                          <div className=' max-h-40 overflow-auto scrollbar-hide' >
                                            {viewAllComment.map((com, i) => {
                                              return (

                                                <div className="flex gap-3 py-2 pl-3 items-center bg-white">
                                                  <div>
                                                    {/* <img className="w-8 rounded-full" src='' alt="profile" /> */}
                                                    <img src="https://imgs.search.brave.com/JC3yuRG8o8d2G-kk-gDv7DrSKVLLPa5QoIK2uoMr9QE/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/enVZTVhkQjNEUFVu/UE9ld2hha0N3SGFG/ZSZwaWQ9QXBp" className='rounded-full' width={30} height={30} alt="" />
                                                  </div>
                                                  <div>
                                                    <div>
                                                      <span className="font-medium text-sm mr-2">{com.name}</span>
                                                      <span className="">{com.comment}</span>
                                                    </div>
                                                    <p className="text-slate-500 text-xs ">{format(com.created)}</p>
                                                  </div>

                                                </div>
                                              )
                                            })}
                                          </div>

                                          <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={() => setShowModal(false)} >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                              <path stroke="none" d="M0 0h24v24H0z" />
                                              <line x1="18" y1="6" x2="6" y2="18" />
                                              <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                          </button>

                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </div>
                              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                          ) : null}
                        </tr>

                      )
                    })
                  }




                </tbody>
              </table>




              {/* <div
             class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between ">
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

export default Posts