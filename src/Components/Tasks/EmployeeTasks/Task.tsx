import { useDrag } from 'react-dnd'

export default function Task({ id, title, status }: any) {

    console.log(id, title, status);



    const [{ isDragging }, drag] = useDrag(() => ({
        type: "div",
        item: { id, status, title },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <>
            <div className='singleTask w-100 my-2 p-2  d-flex flex-wrap'
                style={{ border: isDragging ? '5px solid red' : '0px', cursor: 'grab' }}
                ref={drag}>

                <h5 className="d-flex justify-content-between align-items-center w-100" >
                    {title}
                    <i className='fa fa-edit fs-4'></i>

                </h5>

            </div>

        </>

    )
}
