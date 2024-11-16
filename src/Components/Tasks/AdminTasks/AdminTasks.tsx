import axios from 'axios';
import { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Hourglass } from 'react-loader-spinner';
import { Dropdown, Modal } from 'react-bootstrap';
import noDataImg from '../../../assets/images/freepik--Character--inject-70.png'
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext';
import Loading from '../../Loading/Loading';
import EmployeeTasks from '../EmployeeTasks/EmployeeTasks';


export default function AdminTasks() {


  const { BaseUrl, requestHeaders, userRole }: any = useContext(AuthContext)

  const [isloading, setIsLoading]: any = useState(false)

  const [tasksList, setTasksList]: any = useState([])

  const [modalState, setModalState] = useState('close');

  const [taskId, setTaskId]: any = useState(0)

  const [toltalNumberOfPages, setToltalNumberOfPages] = useState(0);



  const showDeleteModal = (id: any) => {
    setModalState('modal-del')
    setTaskId(id)
  }

  const handleClose = () => setModalState('close');


  const getAllTasks = (pageNum: number) => {


    // setIsLoading(true)
    axios.get((userRole == 'Manager' ? `${BaseUrl}/Task/manager` : `${BaseUrl}/Task`), {
      headers: requestHeaders,
      params: {
        pageSize: 5,
        pageNumber: pageNum,
      }
    }).then((response) => {
      // console.log(response.data.data);
      setTasksList(response.data.data)
      setToltalNumberOfPages(response?.data?.totalNumberOfPages);

      // setIsLoading(false)
    })
      .catch((error) => {
        console.log(error);
      })
  }

  const deleteTask = () => {
    setIsLoading(true)
    axios.delete(`${BaseUrl}/Task/${taskId}`, {
      headers: requestHeaders
    }).then((response) => {
      console.log(response);
      handleClose()
      getAllTasks(1)
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


  const handlePageChange = (data: any) => {   // pagination
    // console.log(data.selected + 1);

    let currentPage = data.selected + 1

    getAllTasks(currentPage)

  }


  useEffect(() => {
    if (userRole) {
      getAllTasks(1)
    }

  }, [userRole])


  return (




    <section>

      {userRole === 'Manager' ? <>

        <Modal show={modalState == 'modal-del'} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>are u sure u want to delte this task</h3>
            <button onClick={deleteTask} className='btn btn-danger'>
              {isloading ? <Loading /> : 'Delete'}
            </button>
          </Modal.Body>


        </Modal>

        <div className='d-flex justify-content-between bg-white rounded-2 p-3' style={{ marginTop: '80px' }} >
          <h2>Tasks</h2>
          {userRole == 'Manager' ? <Link to={'/dashboard/add-task'} className='btn rounded-5 text-white d-flex align-items-center fw-bold'
            style={{ backgroundColor: '#EF9B28' }}>Add new task +</Link> : ""}
        </div>



        {tasksList == 0 ?
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
            {tasksList.length > 0 ? <div className='table-responsive'>
              <table className="table table-striped">

                <thead >
                  <tr >
                    <th className='text-white' style={{ backgroundColor: '#315951E5' }} scope="col">title</th>
                    <th className='text-white' style={{ backgroundColor: '#315951E5' }} scope="col">status</th>
                    <th className='text-white' style={{ backgroundColor: '#315951E5' }} scope="col">description</th>
                    <th className='text-white' style={{ backgroundColor: '#315951E5' }} scope="col">id</th>
                    <th className='text-white' style={{ backgroundColor: '#315951E5' }} scope="col">employee name</th>

                    <th style={{ backgroundColor: '#315951E5' }} scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {tasksList?.map((task: any, idx: any) => {
                    return <tr key={idx}>
                      <th scope="row"> {task.title} </th>
                      <th scope="row"> {task.status} </th>
                      <td>
                        {task.description}
                      </td>
                      <td>
                        {task.id}
                      </td>
                      <td >
                        {task.employee.userName}
                      </td>

                      <td>

                        {userRole == 'Manager' ? <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic" variant="">
                          </Dropdown.Toggle>

                          <Dropdown.Menu className='bg-success-subtle'>
                            <Dropdown.Item >  <i className='fa fa-eye me-1'></i> view</Dropdown.Item>
                            <Dropdown.Item onClick={() => { showDeleteModal(task.id) }} > <i className='fa fa-trash me-2'></i>delete</Dropdown.Item>
                            <Dropdown.Item > <i className='fa fa-edit me-2'></i>update</Dropdown.Item>
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
                containerClassName='pagination justify-content-end'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                activeClassName='active'
              />

            </div> : <div className='text-center mt-5'> <img src={noDataImg} alt="" /> </div>}</>
        }
      </> :
        <EmployeeTasks
          setTasksList={setTasksList}
          tasksList={tasksList}
          getAllTasks={getAllTasks}
        />
      }





    </section>

  )
}
