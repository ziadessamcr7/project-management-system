import React from 'react'
import { Doughnut } from 'react-chartjs-2';

export default function TasksChart({ ToDoCount, ProgressCount, DoneCount }: any) {

    const data = {
        labels: [
            'ToDo',
            'In progress',
            'Done'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [ToDoCount, ProgressCount, DoneCount],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4,
            weight: 1,

        }]

    };

    const options = {
        aspectRatio: 2
    }

    return (
        <div>
            <Doughnut data={data} options={options} >

            </Doughnut>
        </div>
    )
}
