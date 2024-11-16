import { useContext } from "react";
import Task from "../Task";
import { AuthContext } from "../../../../Context/AuthContext";
import { useDrop } from "react-dnd";
import { toast } from "react-toastify";
import axios from "axios";

export default function Done({ DoneTasks, getAllTasks }: any) {


    const { BaseUrl, requestHeaders }: any = useContext(AuthContext)



    const throwElement = (id: number, status: string) => {
        if (status === "Done") {
            return null
        }
        console.log(id);
        console.log(status);

        axios.put(`${BaseUrl}/Task/${id}/change-status`, {
            status: 'Done'
        }, {
            headers: requestHeaders
        })
            .then(() => {

                toast.success("Changed To Done State Successfully")
                getAllTasks()
            })
            .catch((err: any) => {

                toast.error("error", err.response.data.message)
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
                {DoneTasks?.map((done: any, idx: any) => {

                    return <div className="w-100 my-2" key={idx.toString()}>
                        <Task id={done.id} status={done.status} title={done.title} />
                    </div>

                })}

            </div>

            {/* <h2>ssssssssss</h2> */}
        </>
    )
}
