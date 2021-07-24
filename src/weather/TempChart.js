import React from "react";
import { Line } from "react-chartjs-2";



class TempChart extends React.Component{



    render() {
        const data = {
            datasets: [
                {
                    label: 'Temperatur',
                    data: {
                        Morgens: 2,
                        Mittags: 15,
                        Abends: 20,
                        Nachts: 2,
                    },
                    fill: false,
                    backgroundColor: 'rgb(255,99,99)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                }
            ],
        };

        const options = {
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: "Mein Titel",
                }
            },
            scales: {
                x: {
                    max: 4,
                },
                y: {
                    title: {
                        display: true,
                        text: 'in °C',
                    },
                    min: -10,
                    ticks: {
                        beginAtZero: true,
                    }
                },
            }
        }

        return (
            <>
                <Line data={data} options={options}/>
            </>

        );
    }
}

export default TempChart;