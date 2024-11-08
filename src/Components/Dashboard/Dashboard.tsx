import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import TasksChart from '../TasksChart/TasksChart'
import toDoIcon from '../../assets/images/7952181_checklist_pen_tab_list_tick_icon 1.svg'
import inProgIcon from '../../assets/images/8396402_graph_chart_data_analytics_statistic_icon 1.svg'
import doneIcon from '../../assets/images/8396416_job_employment_business_recuitment_seeker_icon 1.svg'
import UsersChart from '../UsersChart/UsersChart'


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)


export default function Dashboard() {




  const [ToDoCount, setToDoCount] = useState(0)
  const [ProgressCount, setProgressCount] = useState(0)
  const [DoneCount, setDoneCount] = useState(0)
  const [activeCount, setActiveCount] = useState(0)
  const [deActiveCount, setDeActiveCount] = useState(0)

  const { BaseUrl, requestHeaders, userRole }: any = useContext(AuthContext)


  const getTasksCount = () => {
    axios.get(`${BaseUrl}/Task/count`, {
      headers: requestHeaders
    }).then((response) => {
      console.log(response);
      setToDoCount(response.data.toDo)
      setProgressCount(response.data.inProgress)
      setDoneCount(response.data.done)
    })
      .catch((error) => {
        console.log(error);
      })
  }

  const getUsersCount = () => {
    axios.get(`${BaseUrl}/Users/count`, {
      headers: requestHeaders
    }).then((response) => {
      console.log(response.data);
      setActiveCount(response.data.activatedEmployeeCount)
      setDeActiveCount(response.data.deactivatedEmployeeCount)
    })
      .catch((error) => {
        console.log(error);
      })
  }





  useEffect(() => {
    if (userRole == 'Manager') {
      getUsersCount()
    }
    getTasksCount()
  }, [userRole])




  return (
    <section style={{ marginTop: '80px' }}>


      {userRole == 'Manager' ? <>
        <header className='dashboard-head mt-3 p-4 text-white d-flex align-items-center rounded-3'>
          <div>
            <h1 className='fw-light'>Welcome upskilling Admin</h1>
            <h1 className='mt-3 fw-light'>You can add project and assign tasks to your team</h1>
          </div>

        </header>

        <div>
          <div className="row mt-3">
            <div className="col-md-6 py-3" style={{ backgroundColor: '#F8F9FB' }}>
              <h5 className='bordr-lft ps-3' >Tasks</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, delectus?</p>
              <div className="row">
                <div className="col-md-4 text-center">
                  <div className=' p-3 rounded-4' style={{ backgroundColor: '#E5E6F4' }}>
                    <img src={toDoIcon} alt="" />
                    <h6 className='my-2'>ToDo</h6>
                    <h5> {ToDoCount} </h5>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className='p-3 rounded-4' style={{ backgroundColor: '#F4F4E5' }}>
                    <img src={inProgIcon} alt="" />
                    <h6 className='my-2'>In progress</h6>
                    <h5> {ProgressCount} </h5>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className='p-3 rounded-4' style={{ backgroundColor: '#F4E5ED' }}>
                    <img src={doneIcon} alt="" />
                    <h6 className='my-2'>Done</h6>
                    <h5> {DoneCount} </h5>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-md-6 bg-white py-3">
              <h5 className='bordr-lft ps-3' >Progress</h5  >
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur.</p>

              <div className='p-3 rounded-4' >
                <h6 className=' d-flex justify-content-center '>
                  <TasksChart ToDoCount={ToDoCount}
                    ProgressCount={ProgressCount}
                    DoneCount={DoneCount} />
                </h6>
              </div>

            </div>





          </div>

          <div className="row">
            <div className="col-md-6 py-3" style={{ backgroundColor: '#F8F9FB' }}>
              <h5 className='bordr-lft ps-3' >Users</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, delectus?</p>
              <div className="row">
                <div className="col-md-4 text-center">
                  <div className=' p-3 rounded-4' style={{ backgroundColor: '#E5E6F4' }}>
                    <img src={toDoIcon} alt="" />
                    <h6 className='my-2'>Active</h6>
                    <h5> {activeCount} </h5>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className='p-3 rounded-4' style={{ backgroundColor: '#F4F4E5' }}>
                    <img src={inProgIcon} alt="" />
                    <h6 className='my-2'>Not-Active</h6>
                    <h5> {deActiveCount} </h5>
                  </div>
                </div>

              </div>
            </div>


            <div className="col-md-6 bg-white py-3">
              <h5 className='bordr-lft ps-3' >Users status</h5  >
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur.</p>

              <div className='p-3 rounded-4' >
                <h6 className=' d-flex justify-content-center '>
                  <UsersChart activeCount={activeCount}
                    deActiveCount={deActiveCount} />
                </h6>
              </div>

            </div>





          </div>

        </div></> : <>
        <header className='dashboard-head mt-3 p-4 text-white d-flex align-items-center rounded-3'>
          <div>
            <h1 className='fw-light'>Welcome upskilling User</h1>
            <h1 className='mt-3 fw-light'>You can view and control your tasks</h1>
            <h1 className='mt-3 fw-light'>You can view and control your tasks</h1>
            <h1 className='mt-3 fw-light'>You can view and control your tasks</h1>
          </div>

        </header>

        <div className="row mt-3">
          <div className="col-md-6 py-3" style={{ backgroundColor: '#F8F9FB' }}>
            <h5 className='bordr-lft ps-3' >Tasks</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, delectus?</p>
            <div className="row">
              <div className="col-md-4 text-center">
                <div className=' p-3 rounded-4' style={{ backgroundColor: '#E5E6F4' }}>
                  <img src={toDoIcon} alt="" />
                  <h6 className='my-2'>ToDo</h6>
                  <h5> {ToDoCount} </h5>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className='p-3 rounded-4' style={{ backgroundColor: '#F4F4E5' }}>
                  <img src={inProgIcon} alt="" />
                  <h6 className='my-2'>In progress</h6>
                  <h5> {ProgressCount} </h5>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className='p-3 rounded-4' style={{ backgroundColor: '#F4E5ED' }}>
                  <img src={doneIcon} alt="" />
                  <h6 className='my-2'>Done</h6>
                  <h5> {DoneCount} </h5>
                </div>
              </div>
            </div>
          </div>


          <div className="col-md-6 bg-white py-3">
            <h5 className='bordr-lft ps-3' >Progress</h5  >
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur.</p>

            <div className='p-3 rounded-4' >
              <h6 className=' d-flex justify-content-center '>
                <TasksChart ToDoCount={ToDoCount}
                  ProgressCount={ProgressCount}
                  DoneCount={DoneCount} />
              </h6>
            </div>

          </div>





        </div>

      </>

      }


    </section>
  )
}