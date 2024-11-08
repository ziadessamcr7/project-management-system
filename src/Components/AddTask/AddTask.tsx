import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


export default function AddProject() {


    const { BaseUrl, requestHeaders }: any = useContext(AuthContext)
    const [loading, setLoading]: any = useState(false)

    const [usersList, setUsersList]: any = useState(null)

    const [projectList, setProjectList]: any = useState(null)


    const nav = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    }: any = useForm()

    const addTask = (data: any) => {
        console.log(data);

        setLoading(true)
        axios.post(`${BaseUrl}/Task`, data, {
            headers: requestHeaders
        }).then((response) => {
            console.log(response);
            nav('/dashboard/tasks')
            setLoading(false)

        })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            })
    }

    function getUserList() {
        axios
            .get(`${BaseUrl}/Users/`, {
                headers: requestHeaders,
                params: {
                    pageNumber: 1,
                    pageSize: 200,
                },
            })
            .then((res: any) => {
                console.log(res.data.data);

                setUsersList(res.data.data);

            })
            .catch((err: any) => {
                toast.error(err?.response?.data?.message);
            });
    }

    const getAllProjects = () => {

        axios.get(`${BaseUrl}/Project/`, {
            headers: requestHeaders,
            params: {
                pageSize: 100,
                pageNumber: 1,

            }
        }).then((response) => {
            console.log(response.data.data);
            setProjectList(response.data.data)


        })
            .catch((error) => {
                console.log(error);

            })
    }

    useEffect(() => {
        getUserList()
        getAllProjects()
    }, [])



    return (
        <section style={{ marginTop: '80px' }}>
            <div className='bg-white p-3'>
                <Link className='text-decoration-none text-black' to={'/dashboard/tasks'}> <i className='fa fa-arrow-left btn'></i>View All Tasks  </Link>
                <h2>Add New Task</h2>
            </div>

            <form className='bg-white rounded-3 p-4 w-75 m-auto mt-5' onSubmit={handleSubmit(addTask)}>

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

                <div className='row mt-4'>
                    <div className='col-md-6'>
                        <label htmlFor="user">User</label>
                        <select id="user" className='form-select'
                            {...register('employeeId', {
                                required: 'employee redquired',
                                valueAsNumber: true

                            })} >
                            <option selected disabled value={''} > Select emp </option>
                            {usersList?.map((emp: any) => {
                                return <option value={emp.id}> {emp.userName} </option>
                            })}


                        </select>
                        {errors.employeeId && errors.employeeId.type == 'required'
                            && (<span className='text-danger d-block'>employee is required</span>)}
                    </div>

                    <div className='col-md-6'>
                        <label htmlFor="project">Project</label>
                        <select id="project" className='form-select'
                            {...register('projectId', {
                                required: 'project redquired',
                                valueAsNumber: true
                            })} >
                            <option selected disabled value={''} > Select proj </option>
                            {projectList?.map((proj: any) => {
                                return <option value={proj.id}> {proj.title} </option>
                            })}


                        </select>
                        {errors.projectId && errors.projectId.type == 'required'
                            && (<span className='text-danger d-block'>project is required</span>)}
                    </div>
                </div>



                <div className='d-flex justify-content-between mt-4'>
                    {/* <button className='btn btn-info'>Cancel</button> */}
                    <button type='submit'
                        className='btn'
                        style={{ backgroundColor: '#EF9B28' }} >
                        {loading ? <i className='fa-solid fa-spin fa-spinner'></i> : 'Save'}
                    </button>

                </div>
            </form>

        </section>

    )
}
