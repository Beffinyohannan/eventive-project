import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../api/axios';
import { UserContext } from '../../../Store/UserContext'
import Swal from 'sweetalert2';
import userInstance from '../../../axios/userAuth';


function Profile() {

    const { userDetails, setUserDetails } = useContext(UserContext)
    const [showEditModal, setShowEditModal] = useState(false)
    const [Image, setImage] = useState("");
    const [approve, setApprove] = useState(false)
    const [details, setDetails] = useState('')

    // console.log(userDetails, 1223123);
    const userId = userDetails._id


    useEffect(() => {
        userInstance.get(`/profile/${userId}`).then((res) => {
            // console.log(res.data, 'gggggggggggggg');
            // setUserDetails(res.data)
            setDetails(res.data)
        })
    }, [approve, showEditModal])

    const handleEditModal = () => {
        setShowEditModal(false)
        setImage('')
        setImageUpload('')
    }

    const handleProfile = (e) => {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value,
        });

        // console.log(details);
    };

    const [imageUpload, setImageUpload] = useState('')
    const fileUpload = (e) => {
        // console.log("file upload ann");
        setImage(URL.createObjectURL(e.target.files[0]));

        setImageUpload(e.target.files[0])
        // setDetails({
        //     ...details,
        //     profilePicture: e.target.files[0],
        // });
    };

    const handleEdit = async (e) => {
        e.preventDefault()
        // console.log(details, '77777777777777');

        try {

            const data = new FormData();
            const fileName = imageUpload.name
            data.append('file', imageUpload)
            data.append("name", fileName)

            if (imageUpload) {

                await axios.post('/company/post/upload', data).then((response) => {
                    // console.log(response, 'qqqqqqqqqqqqqqq');
                    details.profilePicture = 'https://drive.google.com/uc?export=view&id=' + response.data
                })
            }

            userInstance.post(`/edit-profile/${userId}`, details).then((res) => {
                if (res.data.Update == true) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Profile Updated sucessfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setShowEditModal(false)
                    setApprove(!approve)
                }
            })
        } catch (error) {
            console.log(error.message);
        }
        // const formData = new FormData();
        // for (let key in details) {
        //     formData.append(key, details[key]);
        // }
        // console.log(formData, '||||||||||||||||||||');

        // axios.post(`/edit-profile/${userId}`, formData).then((res) => {
        //     if (res.data.Update == true) {
        //         Swal.fire({
        //             position: 'top-end',
        //             icon: 'success',
        //             title: 'Profile Updated sucessfully',
        //             showConfirmButton: false,
        //             timer: 1500
        //         })
        //         setShowEditModal(false)
        //         setApprove(!approve)
        //     }
        // })
    }


    return (
        <div className=' flex justify-center md:justify-end'>

            {/* <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css">
<link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"> */}

            <section className="pt-20 w-full   md:w-4/5">
                <div className="w-full md:w-10/12    px-4 mx-auto ">
                    <div className="relative flex flex-col min-w-0 break-words  w-full  mb-6   mt-16">
                        <div className="px-6 border bg-white shadow-lg rounded-lg ">
                            <div className="flex flex-wrap p-2 justify-center  ">
                                <div className='w-full flex justify-end'>
                                    <button className='m-5 bg-slate-400 rounded-md px-2' onClick={() => setShowEditModal(true)}>Edit</button>
                                </div>
                                <div className="w-full px-4 flex  justify-center">
                                    <div className="relative">
                                        <img src={details.profilePicture} alt="" className="shadow-xl rounded-full  w-32 sm:w-52 h-32 sm:h-52 align-middle border-none " />
                                        {/* <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/> */}
                                    </div>
                                </div>
                                <div className="text-center mt-5">
                                    <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                                        {details.username}
                                    </h3>

                                </div>
                                <div className="w-full px-4 text-center mt-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className=" text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                {details?.following?.length}
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
                                            Name - {details.username}
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-2">
                                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                            Email - {details.email}
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-2">
                                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                            Phone - {details.phone}
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-2">
                                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                            Address - {details.address}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                {showEditModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        {/* {errorMessage && (
                                            <div
                                                className="p-2 text-center mb-2 text-sm w-44 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mx-auto"
                                                role="alert"
                                            >
                                                {" "}
                                                {errorMessage}
                                            </div>
                                        )} */}

                                        <h3 className="text-3xl font-semibold">
                                            Edit your details
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={handleEditModal}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    <div className="relative p-6 flex-auto">
                                        <label className="p-2 font-semibold text-blue-400" htmlFor=""> User Name:</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={details.username}
                                            placeholder="Change Username"
                                            onChange={handleProfile}
                                        />
                                        <label className="p-2 font-semibold text-blue-400" htmlFor="" > Email: </label>
                                        <input
                                            className='w-60'
                                            type="email"
                                            name="email"
                                            value={details.email}
                                            placeholder="Email"
                                            onChange={handleProfile}
                                        />
                                        <br /> <br />

                                        <label className="p-2 font-semibold text-blue-400" htmlFor=""> Contact-No:</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            value={details.phone}
                                            placeholder="Contact-No"
                                            onChange={handleProfile}
                                        />
                                        <label className="p-2 font-semibold text-blue-400" htmlFor="" >  Address:</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={details.address}
                                            placeholder="Address"
                                            onChange={handleProfile}
                                        />
                                        <br /> <br />
                                        <label className="p-2 mt-3 font-semibold text-blue-400" htmlFor=""> Profile Picture:</label>
                                        <img src={Image} alt="" className='w-32' />
                                        <input
                                            className=""
                                            type="file"
                                            name="profilePicture"
                                            id="file"
                                            onChange={fileUpload}
                                        />



                                    </div>

                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={handleEditModal}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={handleEdit}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>

                ) : null}

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