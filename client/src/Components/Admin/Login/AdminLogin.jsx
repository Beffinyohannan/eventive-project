import React,{useState} from 'react'
import landingImg from '../../../assets/admin.webp'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import axios from '../../../api/axios'




function AdminLogin() {

    const initialValues={email:"",password:""}
    const [formValues, setFormValues] = useState(initialValues)
    const navigate = useNavigate()

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




    const handleSubmit = (e) => {
        e.preventDefault()

        const errors = validateForm(signupData)
        setError(errors)
        
        console.log(Object.keys(errors).length, 'llkklk');
        if (Object.keys(errors).length == 0) {
            // console.log("hello");

            axios.post('/admin/login', { ...formValues }).then((response) => {
                console.log(response);
                if (response.data.state == "ok") {
                    // alert("login sucessful")
                     window.localStorage.setItem("admin-token",response.data.data)

                   
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'You are successfully logged in',
                        showConfirmButton: false,
                        timer: 1500
                      }).then(()=>{
                        // window.location.href = "/admin-dashboard"
                        navigate("/admin-dashboard" ,{replace:true})
                      })
                }
            })
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
        } else if (data.password.length != 5) {
            error.password = "password should be 5 digit"
        }





        return error;
    }


  return (
    <div>
       <div className='w-full h-screen flex'>
      <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
        <div className=' w-full h-[550px] hidden md:block'>
          <img className='w-full h-full' src={landingImg} alt="" />
        </div>
        <div className='p-4  flex flex-col justify-around items-center w-96'>
          <form className='w-3/4 mt-4'onSubmit={handleSubmit}>
            <h2 className='text-4xl font-bold text-center mb-8'>Admin</h2>
            <div>
            <label htmlFor="">Email</label>
            <input className='border p-2 mb-2 w-full'  placeholder='Email' name='email' type="text" value={formValues.email} onChange={handleChange} />
            <p className='text-red-500'>{error.email}</p>
            <label htmlFor="">Password</label>
              <input className='border p-2 mb-2 w-full'  placeholder='Password'  name='password' type="password" value={formValues.password} onChange={handleChange} />
              <p className='text-red-500'>{error.password}</p>
            </div>
            <button className='w-full py-2 my-4 bg-green-600 hover:bg-green-500'>Login</button>
            
          </form>
        </div>
      </div>
    </div> 
    </div>
  )
}

export default AdminLogin