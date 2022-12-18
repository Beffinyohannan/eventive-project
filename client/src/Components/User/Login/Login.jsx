import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landingImg from '../../../assets/user1.webp'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { UserContext } from '../../../Store/UserContext'
import { userLogin } from '../../../api/UserRequest'




function Login() {

  const initialValues = { email: "", password: "" }
  const [formValues, setFormValues] = useState(initialValues)
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate()
  const { userDetails, setUserDetails } = useContext(UserContext)


  const [error, setError] = useState({});

  const signupData = {
    ...formValues
  }

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
    console.log(formValues);

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = validateForm(signupData)
    setError(errors)
    console.log('mmmmmmmmmmmmmmmmmmmmmmmmm');
    console.log(Object.keys(errors).length, 'llkklk');
    if (Object.keys(errors).length == 0) {

      const {data} =await userLogin(signupData)
      // console.log(data.state);
      const userr = data.user
      if (data.state == "ok") {
        window.localStorage.setItem("token",data.data)
        window.localStorage.setItem("user", JSON.stringify(userr))
        setUserDetails(userr)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'You are successfully logged in',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/homepage')
        })
      } else {
        Swal.fire({
          position: 'top-end',
          // icon: 'success',
          title:data.error,
          showConfirmButton: false,
          timer: 1500
        })
      }

    }


  }


  const validateForm = (data) => {
    const error = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!data.email) {
      error.email = "email required"
    } else if (!regex.test(data.email)) {
      error.email = "enter valide email address"
    }

    if (!data.password) {
      error.password = "password required"
    } else if (data.password.length !== 6) {
      error.password = "password should be 6 digit"
    }





    return error;
  }

  return (
    <div className='w-full h-screen flex'>
      <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px] '>
        <div className=' w-full h-[550px] text-center hidden md:block' style={{ backgroundImage: `url(${landingImg})` }}>
          {/* <img className='w-full h-full' src={landingImg} alt="" /> */}
          <h1 className='text-5xl m-5 pt-40  font-bold  text-slate-200'>Eventive</h1>
          <p className='text-slate-100 font-bold'>Find The Perfect Event...</p>
        </div>
        <div className='p-4  flex flex-col justify-around items-center w-96'>
          <form className='w-3/4 mt-4' onSubmit={handleSubmit}>
            <h2 className='text-4xl font-bold text-center mb-8'>Login</h2>
            <div>
              <label htmlFor="">Email</label>
              <input className='border p-2 mb-2 w-full' placeholder='email' name='email' type="text" value={formValues.email} onChange={handleChange} />
              <p className='text-red-500'>{error.email}</p>
              <label htmlFor="">Password</label>
              <input className='border p-2 mb-2 w-full' placeholder='Password' name='password' type="text" value={formValues.password} onChange={handleChange} />
              <p className='text-red-500'>{error.password}</p>
            </div>
            <button className='w-full py-2 my-4 bg-green-600 hover:bg-green-500'>Login</button>

          </form>
          <p className='text-center'>Create a account : <Link to={'/'} >Signup</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login