import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';


export default function AddProject() {


    const { BaseUrl, requestHeaders }: any = useContext(AuthContext)
    // const [loading, setLoading]: any = useState(false)


    const nav = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    }: any = useForm()

    const addProject = (data: any) => {
        // setLoading(true)
        axios.post(`${BaseUrl}/Project`, data, {
            headers: requestHeaders
        }).then((response) => {
            console.log(response);
            nav('/dashboard/projects')
            // setLoading(false)

        })
            .catch((error) => {
                console.log(error);

            })
    }


    return (
        <section style={{ marginTop: '80px' }}>
            <div className='bg-white p-3'>
                <Link className='text-decoration-none text-black' to={'/dashboard/projects'}> <i className='fa fa-arrow-left btn'></i>View All Projects  </Link>
                <h2>Add New Project</h2>
            </div>

            <form className='bg-white rounded-3 p-4 w-75 m-auto mt-5' onSubmit={handleSubmit(addProject)}>

                <label htmlFor="i">Title</label>
                <input id='i' type="text"
                    className='form-control rounded-4'
                    placeholder='Name' {...register('title', {
                        required: "title required",
                    })} />
                {errors.title && errors.title.type === 'required' &&
                    (<span className='text-danger d-block'>title is required</span>)}

                <label htmlFor="d" className='mt-5'>Description</label>
                <textarea id='d' className='form-control rounded-4'
                    placeholder='Description'
                    {...register('description', {
                        required: "description required",
                    })}>
                </textarea>
                {errors.description && errors.description.type === 'required' &&
                    (<span className='text-danger d-block'>description is required</span>)}


                <div className='d-flex justify-content-between mt-4'>
                    {/* <button className='btn btn-info'>Cancel</button> */}
                    <button type='submit'
                        className='btn' style={{ backgroundColor: '#EF9B28' }} >Save
                    </button>

                </div>
            </form>

        </section>

    )
}
