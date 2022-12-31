import React, { useState } from 'react'
import landingImg from '../../../assets/company.webp'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPInput from "otp-input-react"
import Countdown from "react-countdown"
import { resendOtpCall, sendOtp, validateOtp } from '../../../api/UserRequest';


function CompanySignup() {

  const initialValues = { companyName: '', email: '', companyType: '', registerNo: '', phone: '', companyAddress: '', password: '' }
  const [formValues, SetFormValues] = useState(initialValues)
  const navigate = useNavigate()
  const [error, setError] = useState({});

  const signupData = {
    ...formValues
  }

  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target
    SetFormValues({ ...formValues, [name]: value })
    // console.log(formValues);
  }

  const [formError, setFormError] = useState("")
  /* ----------------------------------- otp ---------------------------------- */

  const [otp, setOtp] = useState()
  const [otpError, setOtpError] = useState("")

  const [otpModal, setOtpModal] = useState(false)

  const handleSubmit =async (e) => {
    e.preventDefault()

    const errors = validateForm(signupData)
    setError(errors)

    console.log(Object.keys(errors).length, 'llkklk');
    if (Object.keys(errors).length == 0) {
      console.log("hello");

      try {
        const { data } = await sendOtp(signupData)
        console.log(data, '******************  ')
        toast.success(data.message)
        if (data.status) {
          setOtpModal(true)
          setTimeout(() => {
            console.log("Otp send in");
            setResend(true)
          }, "60000")
        } else {
          console.log('otp not send failure');
        }
      } catch (error) {
        console.log(error, "send otp error")
        // setFormError(error.response.data.message)
        toast.warn(error.response.data.message)
      }

      
    }

  }

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (otp.length < 6) {
      setOtpError("Provide a 6 digit OTP")
    } else {
      const details = {
        otp: otp,
        email: formValues.email,
      }
      setOtp('')
      try {
        const { data } = await validateOtp(details)
        console.log(data, "uuuu")
        if (data.auth) {
          setOtpModal(false)
          try {
            axios.post('/company/signup', { ...formValues }).then((response) => {
              console.log(response);
              if (response.data.insert === true) {
      
                navigate('/company/login')
              }
            })
            // const { data } = await userSignup(signupData)
            // if (data == 'Signup Sucess') {
            //   toast.success('Signup Sucess,Please Login...')
            //   navigate('/login')
            // } else {
            //   toast.warn(data)
            // }

          } catch (error) {
            console.log(error, "oooii")
          }
        } else {
          toast.warn("enter a valid otp")
        }
      } catch (error) {
        if (error.response.status === 403) {
          toast.warn(error.response.data.message)
        }
      }
    }
  }

  /* ------------------------------- RESEND OTP ------------------------------- */
  const [resend, setResend] = useState(false)

  const resendOtp = async () => {
    setOtp('')

    try {
      const { data } = await resendOtpCall(formValues.email)
      // console.log(data);
      if (data.status) {
        toast.success(data.message)
        setResend(false)
        setTimeout(() => {
          console.log("Send otp in 1 second...")
          setResend(true)
        }, "60000")
      }
    } catch (error) {
      console.log(error)
    }
  }


  const validateForm = (data) => {
    const error = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!data.companyName) {
      error.companyName = "company name required"
    }
    //    else if (!userRegex.test(data.companyName)) {
    //       error.companyName = "Invalide user name"
    //   }
    if (!data.companyType) {
      error.companyType = "company type required"
    }
    if (!data.email) {
      error.email = "email required"
    } else if (!regex.test(data.email)) {
      error.email = "enter valide email address"
    }
    if (!data.registerNo) {
      error.registerNo = "register no. required"
    }
    if (!data.phone) {
      error.phone = " phone number required"
    } else if (data.phone.length !== 10) {
      error.phone = "number should be 10 digits"
    }
    if (!data.companyAddress) {
      error.companyAddress = "company address required"
    }
    if (!data.password) {
      error.password = "password required"
    } else if (data.password.length !== 6) {
      error.password = "password should be 6 digit"
    }

    return error;
  }

  return (
    <div>
      <div className='w-full h-screen flex'>
        <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[650px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
          <div className=' w-full text-center  h-[650px] hidden md:block' style={{ backgroundImage: `url(${landingImg})` }}>
            {/* <img className='w-full h-full' src={landingImg} alt="" /> */}
            <h1 className='text-5xl m-5 pt-52   font-bold  text-slate-200'>Eventive</h1>
            <p className='text-slate-100 font-bold'>Have a opertunity to being ourself.</p>
          </div>
          <div className='p-4   flex flex-col justify-around items-center'>
            <form className='w-3/4 mt-4 ' onSubmit={handleSubmit}>
              <h2 className='text-4xl font-bold text-center mb-8'>Company Signup</h2>
              <div >
                <div className='flex gap-2'>

                  <div >
                    <input className='border p-2 mb-2 mr-2 w-full' placeholder='Company Name' name='companyName' type="text" value={formValues.companyName} onChange={handleChange} />
                    <p className='text-red-500'>{error.companyName}</p>
                  </div>

                  <div >
                    <input className='border p-2 mb-2 w-full' placeholder='Company Type' name='companyType' type="text" value={formValues.companyType} onChange={handleChange} />
                    <p className='text-red-500'>{error.companyType}</p>
                  </div>
                </div>

                <div className='flex gap-2'>

                  <div>
                    <input className='border p-2 mb-2 mr-2 w-full' placeholder='Email' name='email' type="text" value={formValues.email} onChange={handleChange} />
                    <p className='text-red-500'>{error.email}</p>
                  </div>

                  <div>
                    <input className='border p-2 mb-2 w-full' placeholder='Register No.' name='registerNo' type="text" value={formValues.registerNo} onChange={handleChange} />
                    <p className='text-red-500'>{error.registerNo}</p>
                  </div>
                </div>

                <input className='border p-2 mb-2 w-full' placeholder='Phone' name='phone' type="number" value={formValues.phone} onChange={handleChange} />
                <p className='text-red-500'>{error.phone}</p>
                <input className='border p-2 mb-2 w-full' placeholder='Company Address' name='companyAddress' type="text" value={formValues.companyAddress} onChange={handleChange} />
                <p className='text-red-500'>{error.companyAddress}</p>
                <input className='border p-2 mb-2 w-full' placeholder='Password' name='password' type="Password" value={formValues.password} onChange={handleChange} />
                <p className='text-red-500'>{error.password}</p>
              </div>
              <button className='w-full py-2 my-4 bg-green-600 hover:bg-green-500'>Signup</button>

            </form>
            <p className='text-center'>Already have account : <Link to={'/company-login'}>Login </Link></p>
          </div>
        </div>
        <ToastContainer/>
      </div>

      {/* OTP MODAL  */}

      {otpModal ? (
        // <div className='bg-white opacity-5'>
          <div class='justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div class='container mx-auto '>
              <div class='max-w-sm mx-auto md:max-w-lg '>
                <div class='w-full outline-none focus:outline-none'>
                  <div class='bg-blue-500 h-64 py-3 rounded text-center relative'>
                    <span
                      className='absolute right-5 text-black font-semibold cursor-pointer'
                      onClick={() => setOtpModal(false)}
                    >
                      X
                    </span>
                    <h1 class='text-2xl font-bold text-white'>OTP Verification</h1>
                    <div class='flex flex-col mt-4 text-white'>
                      <span>Enter the OTP you received at Gmail</span>
                      {/* <span class='font-bold'>+91 ******876</span> */}
                    </div>

                    <div id='otp' class='flex flex-row justify-center text-center px-2 mt-5'>
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        autoFocus
                        OTPLength={6}
                        otpType='number'
                        disabled={false}
                      />
                    </div>

                    <div className=' flex justify-center pt-2'>
                      {resend ? (
                        <button
                          className='flex items-center mt-4 text-gray-600 cursor-pointer font-bold bg-slate-300 rounded-lg pl-2 pr-2 '
                          onClick={resendOtp}
                        >
                          Resend OTP
                        </button>
                      ) : (
                        <Countdown date={Date.now() + 60000} />
                      )}
                    </div>

                    <div class='flex justify-center text-center mt-5'>
                      <a class='flex items-center text-blue-700 hover:text-blue-900 cursor-pointer'>
                        <button class='font-bold rounded-md bg-green-500 text-zinc-50 px-2' onClick={handleSignUp}>
                          Verify OTP
                        </button>
                        <i class='bx bx-caret-right ml-1'></i>
                      </a>
                    </div>
                    <div className='flex w-full justify-center items-center'>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        // </div>
      ) : null}

    </div>
  )
}

export default CompanySignup