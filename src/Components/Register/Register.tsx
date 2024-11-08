import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../src/assets/images/PMS 3.png'
import Loading from '../Loading/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';



export default function Register() {

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const { BaseUrl }: any = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  }: any = useForm()

  const password = watch("password")


  const Registerform = (data: any) => {
    console.log(data);
    setIsLoading(true)
    axios.post(`${BaseUrl}/Users/Register`, data)
      .then((response: any) => {
        console.log(response);
        toast.success(response.data.message, {
          autoClose: 2000
        })
        navigate('/verify-user')
        setIsLoading(false)

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
          <div className="col-md-8">
            <div className='text-center'>
              <img src={logo} style={{ width: '25%' }} alt="" />
            </div>
            <div className="from-bg p-4 rounded-3">
              <span className="text-white">welcome to PMS</span>
              <h2 className="p-0 m-0" style={{ color: 'rgb(227 156 26)' }} >Register</h2>
              <span className="login-underline"></span>

              <form onSubmit={handleSubmit(Registerform)}>

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="name" className='fw-bold' style={{ color: 'rgb(227 156 26)' }}>Name</label>
                    <input className="form-input"
                      type="text"
                      placeholder="Enter your name"
                      id="name" {...register('userName', {
                        required: "name is required",
                      })} />
                    {errors.userName && errors.userName.type === 'required' &&
                      (<span className='text-danger d-block'>name is required</span>)}
                    {errors.userName && errors.userName.type === 'pattern' && (<span className='text-danger d-block'>Enter a valid email</span>)
                    }
                  </div>


                  <div className="col-md-6">
                    <label htmlFor="email" className="fw-bold" style={{ color: 'rgb(227 156 26)' }}>Email</label>
                    <input className="form-input"
                      type="email"
                      placeholder="Enter your email"
                      id="email"
                      {...register('email', {
                        required: "email is required",
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                      })} />
                    {errors.email &&
                      <span className='text-danger'> {errors.email.message} </span>}
                    {errors.email && errors.email.type == 'pattern' &&
                      <span className='text-danger'> enter a vlaid email </span>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="country" className="mt-2 fw-bold" style={{ color: 'rgb(227 156 26)' }}>Country</label>
                    <input className="form-input"
                      type="text"
                      placeholder="Enter your country"
                      id="country"
                      {...register('country', {
                        required: "country is required",
                      })} />
                    {errors.country &&
                      <span className='text-danger'> {errors.country.message} </span>}

                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phone" className="mt-2 fw-bold" style={{ color: 'rgb(227 156 26)' }}>Phone</label>
                    <input className="form-input"
                      type="text"
                      placeholder="Enter your phone"
                      id="phone"
                      {...register('phoneNumber', {
                        required: "phoneNumber is required",
                      })} />
                    {errors.phoneNumber &&
                      <span className='text-danger'> {errors.phoneNumber.message} </span>}

                  </div>

                  <div className="col-md-6">
                    <label htmlFor="password" className="mt-2 fw-bold" style={{ color: 'rgb(227 156 26)' }}>Password</label>
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
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="mt-2 fw-bold" style={{ color: 'rgb(227 156 26)' }}>Confirm Password</label>
                    <input className="form-input"
                      type="password"
                      placeholder="Enter your confirm password"
                      id="confirmPassword"
                      {...register('confirmPassword', {
                        validate: (value: any) =>
                          value === password || "The passwords do not match"
                      })} />
                    {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}

                  </div>
                </div>





                <div className='text-end mb-2 mt-2'>
                  <Link className='text-white' to={'/login'} >Login</Link>
                </div>
                <button className="form-button btn rounded-5">{isLoading ? <Loading />
                  : <span className='fw-bold'>Register</span>}</button>
              </form>

            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
