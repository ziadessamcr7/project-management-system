import { Doughnut } from 'react-chartjs-2';


export default function UsersChart({ activeCount, deActiveCount }: any) {

    const data = {
        labels: [
            'Active',
            'NotActive',
        ],
        datasets: [{
            // label: 'My First Dataset',
            data: [activeCount, deActiveCount],
            backgroundColor: [
                '#50C878',
                'rgb(255, 99, 132)',

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
