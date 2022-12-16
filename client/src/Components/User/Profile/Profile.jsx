import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../api/axios';
import { UserContext } from '../../../Store/UserContext'

function Profile() {

    const { userDetails, setUserDetails } = useContext(UserContext)
    console.log(userDetails,1223123);
  const   userId = userDetails._id
    useEffect(()=>{
        axios.get(`/profile/${userId}`).then((res)=>{
            console.log(res.data,'gggggggggggggg');
            setUserDetails(res.data)
        })
    },[])


    return (
        <div className=' flex justify-center md:justify-end'>

            {/* <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css">
<link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"> */}

            <section className="pt-20 w-full   md:w-4/5">
                <div className="w-full md:w-10/12    px-4 mx-auto ">
                    <div className="relative flex flex-col min-w-0 break-words  w-full  mb-6   mt-16">
                        <div className="px-6 border bg-white shadow-lg rounded-lg ">
                            <div className="flex flex-wrap p-2 justify-center  ">
                                <div className="w-full px-4 flex  justify-center">
                                    <div className="relative">
                                        <img src="https://imgs.search.brave.com/JC3yuRG8o8d2G-kk-gDv7DrSKVLLPa5QoIK2uoMr9QE/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/enVZTVhkQjNEUFVu/UE9ld2hha0N3SGFG/ZSZwaWQ9QXBp" alt="" className="shadow-xl rounded-full  w-32 sm:w-52 h-32 sm:h-52 align-middle border-none " />
                                        {/* <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/> */}
                                    </div>
                                </div>
                                <div className="text-center mt-5">
                                    <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                                        {userDetails.username}
                                    </h3>

                                </div>
                                <div className="w-full px-4 text-center mt-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className=" text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                               {userDetails.following.length}
                                            </span>
                                            <span className="text-sm text-blueGray-400">Following</span>
                                        </div>
                                        {/* <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                10
                                            </span>
                                            <span className="text-sm text-blueGray-400">Photos</span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                89
                                            </span>
                                            <span className="text-sm text-blueGray-400">Comments</span>
                                        </div> */}
                                    </div>
                                </div>

                            </div>
                            <div className=" py-10 border-t-2  w-full text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className=" flex flex-col items-start  px-4">
                                        <div className="mb-2 text-blueGray-600 mt-5">
                                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                            Name - {userDetails.username}
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-2">
                                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                            Email - {userDetails.email}
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-2">
                                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                            Phone - {userDetails.phone}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                {/* <footer className="relative  pt-8 pb-6 mt-8">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-6/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1">
          Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
        </div>
      </div>
    </div>
  </div>
</footer> */}
            </section >
        </div >
    )
}

export default Profile