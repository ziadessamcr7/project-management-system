import { useEffect, useState } from 'react'
import Todo from './Todo/Todo';
import InProgress from './InProgress/InProgress';
import Done from './Done/Done';

export default function EmployeeTasks({ tasksList, getAllTasks }: any) {

    console.log(tasksList);

    const [AllTasks, setAllTasks] = useState({
        todo: [],
        inProgress: [],
        done: []
    })



    // const { BaseUrl }: any = useContext(AuthContext)

    const filterTasksByStatus = (tasksArray: any, status: string) => tasksArray?.filter((task: any) => { return task.status === status });

    // console.log(filterTasksByStatus);


    const setTaskData = () => {
        setAllTasks({
            todo: filterTasksByStatus(tasksList, "ToDo"),
            inProgress: filterTasksByStatus(tasksList, "InProgress"),
            done: filterTasksByStatus(tasksList, "Done")
        })
    }

    useEffect(() => {
        setTaskData()

    }, [tasksList])




    return (
        <>
            {/* <h1 className='pt-5 '>a8aaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>
            <h1 className='pt-5 '>a8aaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>
            <h1 className='pt-5 '> {AllTasks.done.map((sex, idx) => {
                return <p key={idx.toString()}> {sex.title} </p>
            })} </h1> */}
            <section className=''>
                <h1 className='bg-white pt-5 px-3 pb-2 mt-5'>Tasks Board</h1>

                <div className='container mt-5'>
                    <div className="row">
                        <div className="col-md-4">
                            <div>
                                <h4 className='text-center'>ToDo</h4>


                                {/* {AllTasks.todo.map((todo: any, idx) => {
                                        return <h3 className='singleTask p-3 w-100 d-flex justify-content-between align-items-center'>
                                            {todo.title}
                                            <i className='fa fa-edit fs-4'></i>
                                        </h3>
                                    })} */}

                                <Todo
                                    TodoTasks={AllTasks.todo}
                                    getAllTasks={getAllTasks}

                                />



                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <h4 className='text-center'>InPorgress</h4>

                                {/* <div className='rounded-3 tasksWrapper d-flex flex-wrap px-2 py-4 '>
                                    {AllTasks.inProgress.map((inProg: any, idx) => {
                                        return <h3 className='singleTask p-3 w-100 d-flex justify-content-between align-items-center'>
                                            {inProg.title}
                                            <i className='fa fa-edit fs-4'></i>
                                        </h3>
                                    })}

                                </div> */}
                                <InProgress
                                    InProgressTasks={AllTasks.inProgress}
                                    getAllTasks={getAllTasks}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <h4 className='text-center'>Done</h4>
                                <Done
                                    DoneTasks={AllTasks.done}
                                    getAllTasks={getAllTasks}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
