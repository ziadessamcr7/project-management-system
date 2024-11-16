import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Hourglass } from 'react-loader-spinner';
import { Modal } from 'react-bootstrap';
import Loading from '../Loading/Loading';
import { useForm } from 'react-hook-form';
import noDataImg from '../../assets/images/freepik--Character--inject-70.png'
import ReactPaginate from 'react-paginate';



export default function Projects() {

  const { BaseUrl, requestHeaders, userRole }: any = useContext(AuthContext)

  const [projectList, setProjectList]: any = useState([])
  const [isloading, setIsLoading]: any = useState(false)

  const [projId, setProjId]: any = useState(0)

  const [projDetails, setProjDetails]: any = useState(0)

  const [toltalNumberOfPages, settotalNumOfPages] = useState(0)

  const [modalState, setModalState] = useState('close');

  const [currentPage, setCurrentPage] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  }: any = useForm()

  const showViewModal = (id: any) => {
    // alert(id)
    setModalState('modal-view')
    // setProjId(id)
    getProjectDetails(id)
  }
  const showDeleteModal = (id: any) => {
    setModalState('modal-del')
    setProjId(id)
  }
  const showUpdateModale = (proj: any) => {
    setModalState('modal-update')
    setProjId(proj.id)
    setValue('title', proj.title)
    setValue('description', proj.description)
  }


  const handleClose = () => setModalState('close');


  const getAllProjects = (pageNum: number, title: string | null = null) => {
    console.log('received pagenNumber:', pageNum);

    // setIsLoading(true)
    axios.get(userRole == 'Manager' ? `${BaseUrl}/Project/manager` : `${BaseUrl}/Project/employee`, {
      headers: requestHeaders,
      params: {
        pageSize: 4,
        pageNumber: pageNum,
        title: title
      }
    }).then((response) => {
      // console.log(response.data.totalNumberOfPages);
      setProjectList(response?.data.data)

      setIsLoading(false)
      settotalNumOfPages(response?.data.totalNumberOfPages || 1)
    })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      })
  }



  const getProjectDetails = (id: any) => {
    axios.get(`${BaseUrl}/Project/${id}`, {
      headers: requestHeaders
    }).then((response) => {
      console.log(response.data);
      setProjDetails(response.data)
    })
      .catch((error) => {
        console.log(error);
      })
  }
  const deleteProject = () => {
    setIsLoading(true)
    axios.delete(`${BaseUrl}/Project/${projId}`, {
      headers: requestHeaders
    }).then((response) => {
      console.log(response);
      handleClose()
      getAllProjects(1, null)
      toast.success('project deleted successfully', {
        autoClose: 2000
      })
      setIsLoading(false)

    })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      })


  }

  const updateProject = (data: any) => {
    console.log(data);


    axios.put(`${BaseUrl}/Project/${projId}`, data, {
      headers: requestHeaders
    }).then((response) => {
      console.log(response);
      handleClose()
      getAllProjects(1, null)
      toast.success('updated successfully', {
        autoClose: 2000
      })

    }).catch((error) => {
      console.log(error);

    })
  }
  const handlePageChange = (data: any) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
    getAllProjects(selectedPage, null);
  };

  const searchProjcets = (e: any) => {
    console.log(e.target.value);
    getAllProjects(1, e.target.value)

  }


  useEffect(() => {
    if (userRole) {
      getAllProjects(1, null)
      console.log('a7aaaaaaaaaaaaaaaaaaaaaaaaa');

    }

  }, [userRole])


  return (

    <section className=''>


      <Modal show={modalState == 'modal-view'} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal view</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>title: {projDetails?.title} </h2>
        </Modal.Body>

      </Modal>

      <Modal show={modalState == 'modal-del'} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>are u sure u want to delte this project</h3>
          <button onClick={deleteProject} className='btn btn-danger'>
            {isloading ? <Loading /> : 'Delete'}
          </button>
        </Modal.Body>


      </Modal>

      <Modal show={modalState == 'modal-update'} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(updateProject)}>
            <input type="text"
              placeholder='title'
              className='form-control'
              {...register('title', {
                required: "title required",
              })} />
            {errors.title && errors.title.type === 'required' &&
              (<span className='text-danger d-block'>title is required</span>)}

            <input type="text"
              placeholder='description'
              className='form-control mt-3'
              {...register('description', {
                required: "description required",
              })} />
            {errors.description && errors.description.type === 'required' &&
              (<span className='text-danger d-block'>description is required</span>)}

            <button className='btn btn-success mt-4'>update</button>
          </form>


        </Modal.Body>

      </Modal>


      <div className='d-flex justify-content-between bg-white rounded-2 p-3' style={{ marginTop: '80px' }} >
        <h2>Projects</h2>
        {userRole == 'Manager' ? <Link to={'/dashboard/add-project'} className='btn rounded-5 text-white d-flex align-items-center fw-bold'
          style={{ backgroundColor: '#EF9B28' }}>Add new project +</Link> : ""}
      </div>

      <div className='bg-white p-2 mt-3 rounded-3'>
        <input type="text"
          placeholder='Search projects'
          className='form-control mt-3 w-25 rounded-5'
          onChange={searchProjcets} />
      </div>



      {projectList == 0 ?
        <div className='d-flex justify-content-center pt-5 mt-5'>
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#E39B1A', '#E39B1A']}
          />
        </div>

        : <>
          {projectList.length > 0 ? <div className='table-responsive'>
            <table className="table table-striped">

              <thead >
                <tr >
                  <th className='text-white' style={{ backgroundColor: '#315951E5' }} scope="col">title</th>
                  <th className='text-white' style={{ backgroundColor: '#315951E5' }} scope="col">description</th>
                  <th className='text-white' style={{ backgroundColor: '#315951E5' }} scope="col">id</th>
                  <th className='text-white' style={{ backgroundColor: '#315951E5' }} scope="col">creation date</th>

                  <th style={{ backgroundColor: '#315951E5' }} scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {projectList?.map((proj: any, idx: any) => {
                  // console.log(proj);

                  return <tr key={idx}>
                    <th scope="row"> {proj?.title} </th>
                    <td>
                      {proj?.description}
                    </td>
                    <td>
                      {proj?.id}
                    </td>
                    <td >
                      {proj?.creationDate.slice(0, 10)}
                    </td>

                    <td>

                      {userRole == 'Manager' ? <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" variant="">
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='bg-success-subtle'>
                          <Dropdown.Item onClick={() => { showViewModal(proj?.id) }} >  <i className='fa fa-eye me-1'></i> view</Dropdown.Item>
                          <Dropdown.Item onClick={() => { showDeleteModal(proj?.id) }}> <i className='fa fa-trash me-2'></i>delete</Dropdown.Item>
                          <Dropdown.Item onClick={() => { showUpdateModale(proj) }}> <i className='fa fa-edit me-2'></i>update</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown> : ''}


                    </td>
                  </tr>
                })}


              </tbody>
            </table>
            <ReactPaginate
              breakLabel={'...'}
              pageCount={toltalNumberOfPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName={'pagination justify-content-end'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              activeClassName={'active'}
            />



          </div> : <div className='text-center mt-5'> <img src={noDataImg} alt="" /> </div>}</>
      }


    </section>
  )
}
