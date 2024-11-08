import { useContext, useEffect, useState } from 'react';
import logo from '../../../src/assets/images/PMS 3.png'
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';



export default function Login() {
  let { BaseUrl, saveUserData }: any = useContext(AuthContext);
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  }: any = useForm()

  // useEffect(() => {
  //   if( localStorage.getItem('userTkn')){
  //     navigate('/dashboard')
  //   }
  // }, [])


  const Loginform = (data: any) => {
    setIsLoading(true)
    axios.post(`${BaseUrl}/Users/Login`, data)
      .then((response: any) => {
        console.log(response);
        setIsLoading(false)
        localStorage.setItem('userTkn', response.data.token)
        toast.success('Login success', {
          autoClose: 2000
        })
        navigate('/dashboard')
        saveUserData()

      }).catch((error) => {
        console.log(error);
        toast.error(error.response.data.message)
        setIsLoading(false)
      })
  }

  return (
    <section id='login' className=''>

      <div className='container-fluid'>
        <div className='row justify-content-center align-items-center vh-100'>
          <div className="col-md-6">
            <div className='text-center'>
              <img src={logo} style={{ width: '30%' }} alt="" />
            </div>
            <div className="from-bg p-5 rounded-3">
              <span className="text-white">welcome to PMS</span>
              <h2 className="p-0 m-0" style={{ color: 'rgb(227 156 26)' }} >Login</h2>
              <span className="login-underline"></span>

              <form onSubmit={handleSubmit(Loginform)}>
                <label htmlFor="mail" className='fw-bold' style={{ color: 'rgb(227 156 26)' }}>Email</label>
                <input className="form-input"
                  type="email"
                  placeholder="Enter your e-mail"
                  id="mail" {...register('email', {
                    required: "email required",
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                  })} />
                {errors.email && errors.email.type === 'required' &&
                  (<span className='text-danger d-block'>Email is required</span>)}
                {errors.email && errors.email.type === 'pattern' && (<span className='text-danger d-block'>Enter a valid email</span>)
                }

                <label htmlFor="password" className="mt-4 fw-bold" style={{ color: 'rgb(227 156 26)' }}>Passwrod</label>
                <input className="form-input"
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  {...register('password', {
                    required: "password is required",
                    pattern: /^[A-Za-z\d@$!%*#?&]{6,15}$/
                  })} />
                {errors.password &&
                  <span className='text-danger'> {errors.password.message} </span>}
                {errors.password && errors.password.type == 'pattern' &&
                  <span className='text-danger'> enter a vlaid password </span>}

                <div className='d-flex justify-content-between text-white mb-3 mt-2'>
                  <Link className='text-white' to={'/register'} >Register Now</Link>
                  <p className="text-end ">Forgot Password?</p>
                </div>
                <button className="form-button btn rounded-5">{isLoading ? <Loading />
                  : <span className='fw-bold'>Login</span>}</button>
              </form>

            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
