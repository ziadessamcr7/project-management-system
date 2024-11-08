import React, { useState, useRef, useContext } from "react";
import {
  useForm,
  toast,
  useNavigate,
  Modal,
} from "../../Utls/index.ts";
import Loading from "../Loading/Loading.tsx";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext.tsx";


export default function ChangePassword() {
  let { BaseUrl, requestHeaders }: any = useContext(AuthContext);


  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  }: any = useForm();
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  let password = useRef({});
  password = watch("newPassword");

  //api intgration
  function formSubmit(data: object) {
    setisLoading(true);
    axios.put(`${BaseUrl}/Users/ChangePassword`, data, {
      headers: requestHeaders
    })
      .then((result) =>
      //toast && navigate

      {
        setisLoading(false);
        toast.success(result.data.message);
      }
      )
      .catch((error) =>
      //handel error
      {
        // toast("Invalid password")
        console.log(error);
        toast.error(error.response.data.message)

        setisLoading(false);
      }
      );
  }


  return (
    <>

      <form onSubmit={handleSubmit(formSubmit)}>
        <div className='bg-ino box d-flex align-items-center mt-4 p1 rounded-2' >
          <div className='icon p-2'>
            <i className="fa fa-lock bg-dange"></i>
          </div>
          <input type="password"
            id="oldPassword"
            className='form-control'
            placeholder='Old Password'
            {...register('oldPassword', {
              required: 'must enter password',
              minLength: {
                value: 8,
                message: 'enetr 8 chars'
              }
            })}
          />
        </div>
        {/* {errors.oldPassword && errors.oldPassword.type == 'required' &&
                    <span className='text-danger'> old password required</span>}
                {errors.oldPassword && errors.oldPassword.type == 'pattern' &&
                    <span className='text-danger'>invalid pass</span>} */}
        {errors.oldPassword && <span className='text-danger'>{errors.oldPassword.message}</span>}


        <div className='bg-ino box d-flex align-items-center mt-4 p1 rounded-2'>
          <div className='icon p-2'>
            <i className="fa fa-lock bg-dange"></i>
          </div>
          <input type="password"
            id="newPassword"
            className='form-control'
            placeholder='New Password'
            // {...register('newPassword', {
            //     required: true,
            //     pattern: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
            // })}
            {...register('newPassword', {
              required: 'must enter new password',
              minLength: {
                value: 8,
                message: 'enetr 8 chars'
              }
            })}
          />
        </div>
        {/* {errors.newPassword && errors.newPassword.type == 'required' &&
                    <span className='text-danger'>new password required</span>}
                {errors.newPassword && errors.newPassword.type == 'pattern' &&
                    <span className='text-danger'>invalid password</span>} */}
        {errors.newPassword && <span className='text-danger'>{errors.newPassword.message}</span>}



        <div className='bg-ino box d-flex align-items-center mt-4 p1 rounded-2'>
          <div className='icon p-2'>
            <i className="fa fa-lock bg-dange"></i>
          </div>

          <input type="password"
            id="confirmNewPassword"
            className='form-control'
            placeholder='Confirm New Password'
            // {...register('confirmNewPassword', {
            //     required: true,
            // })}
            {...register('confirmNewPassword', {
              required: 'must confirm new password',
              validate: (value: any) =>
                value === password || "The passwords do not match"
            })}
          />
        </div>
        {/* {errors.confirmNewPassword && errors.confirmNewPassword.type == 'required' &&
                    <span className='text-danger'>new password required</span>} */}
        {errors.confirmNewPassword && <span className='text-danger'>{errors.confirmNewPassword.message}</span>}


        <button className='btn text-white w-100 fw-bold  mt-4' style={{ backgroundColor: 'rgb(227 156 26)' }}>
          {isLoading ? <i className="fa-solid fa-spin fa-spinner"></i> : 'Change Password'}

        </button>
      </form>

    </>
  );
}
