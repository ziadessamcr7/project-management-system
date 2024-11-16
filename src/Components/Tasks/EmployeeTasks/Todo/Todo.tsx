import { useContext } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../../../../Context/AuthContext"
import { useDrop } from "react-dnd"
import Task from "../Task";
import axios from "axios";

export default function Todo({ TodoTasks, getAllTasks }: any) {

    // console.log(TodoTasks);
    // console.log(TodoTasksID);

    const { BaseUrl, requestHeaders }: any = useContext(AuthContext)


    const throwElement = (id: number, status: string) => {

        if (status === "ToDo") {
            return null
        }
        console.log(id);
        console.log(status);

        axios.put(`${BaseUrl}/Task/${id}/change-status`, {
            status: "ToDo"
        }, {
            headers: requestHeaders
        })
            .then(() => {
                toast.success("Changed To ToDo State Successfully")
                getAllTasks()
            })
            .catch((err: any) => {
                toast.error('errorrrrrr')
                console.log(err);

            })

    }





    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "div",
        drop: (item: any) => {
            console.log(item);

            throwElement(item.id, item.status);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),

    }))



    const isActive = canDrop && isOver;
    let backgroundColor = "rgba(49, 89, 81, 0.90)";
    if (isActive) {
        backgroundColor = "yellow";
    } else if (canDrop) {
        backgroundColor = "gray";
    }


    // interface Props {
    //     title:string
    //     id:number
    //     status:string
    //   }

    //     const [{isDragging},drag]=useDrag(()=>({
    //       type:"div",
    //       item:{id,status},
    //       collect:(monitor)=> ({
    //         isDragging:!!monitor.isDragging(),
    //       }),
    //     }))



    return (
        <>

            <div className='rounded-3 tasksWrapper d-flex flex-wrap px-2 py-4' ref={drop} style={{ backgroundColor }}>
                {TodoTasks?.map((todo: any, idx: any) => {

                    return <div className="w-100 my-2" key={idx.toString()}>
                        <Task id={todo.id} status={todo.status} title={todo.title} />
                    </div>

                })}

            </div>

            {/* <h2>ssssssssss</h2> */}
        </>
    )
}
