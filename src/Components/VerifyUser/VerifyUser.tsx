import { useContext, useState } from 'react';
import logo from '../../../src/assets/images/PMS 3.png'
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function VerifyUser() {

  let { BaseUrl }: any = useContext(AuthContext);
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  }: any = useForm()

  const submitVerify = (data: any) => {
    setIsLoading(true)
    axios.put(`${BaseUrl}/Users/verify`, data)
      .then((response: any) => {
        console.log(response);
        setIsLoading(false)
        toast.success('Account verified successfully', {
          autoClose: 2000
        })
        navigate('/login')

      }).catch((error) => {
        console.log(error);
        toast.error(error.response.data.message)
        setIsLoading(false)
      })
  }

  return (
    <section id='login'>
      <div className='container-fluid'>
        <div className='row justify-content-center align-items-center vh-100'>
          <div className="col-md-6">
            <div className='text-center'>
              <img src={logo} style={{ width: '30%' }} alt="" />
            </div>
            <div className="from-bg p-5 rounded-3">
              <span className="text-white">welcome to PMS</span>
              <h2 className="p-0 m-0" style={{ color: 'rgb(227 156 26)' }} >Verify Account</h2>
              <span className="login-underline"></span>

              <form onSubmit={handleSubmit(submitVerify)}>
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

                <label htmlFor="OTP" className="mt-4 fw-bold" style={{ color: 'rgb(227 156 26)' }}>Code</label>
                <input className="form-input"
                  type="text"
                  placeholder="Enter your code"
                  id="OTP"
                  {...register('code', {
                    required: "code is required",
                  })} />
                {errors.code &&
                  <span className='text-danger'> {errors.code.message} </span>}



                <button className="form-button btn rounded-5 mt-4">{isLoading ? <Loading />
                  : <span className='fw-bold'>send</span>}</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>

  )
}
