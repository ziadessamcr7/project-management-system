import { useContext } from "react";
import { useDrop } from "react-dnd"
import { toast } from "react-toastify";
import { AuthContext } from "../../../../Context/AuthContext";
import Task from "../Task";
import axios from "axios";

export default function InProgress({ InProgressTasks, getAllTasks }: any) {



    // console.log(InProgressTasks);
    // console.log(getAllTasks);

    const { BaseUrl, requestHeaders }: any = useContext(AuthContext)


    const throwElement = (id: number, status: string) => {

        if (status === "InProgress") {
            return null
        }

        console.log(id);
        console.log(status);

        axios.put(`${BaseUrl}/Task/${id}/change-status`, {
            status: "InProgress"
        }, {
            headers: requestHeaders
        })
            .then(() => {
                toast.success("Changed To InProgress State Successfully")
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


    return (
        <>

            <div className='rounded-3 tasksWrapper d-flex flex-wrap px-2 py-4' ref={drop} style={{ backgroundColor }}>
                {InProgressTasks?.map((InProg: any, idx: any) => {

                    return <div className="w-100 my-2" key={idx.toString()}>
                        <Task id={InProg.id} status={InProg.status} title={InProg.title} />
                    </div>

                })}

            </div>

            {/* <h2>ssssssssss</h2> */}
        </>
    )
}
