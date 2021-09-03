import React from "react";
import { Line } from "react-chartjs-2";
import style from "./chartStyle.module.scss";

class TempChart extends React.Component{


    render() {
        const daten = this.props.data;

        const data = {
            labels: ['Morgens', 'Mittags', 'Abends', 'Nachts'],
            datasets: [
                {
                    label: 'Gemessen',
                    data: daten.temp,
                    fill: false,
                    backgroundColor: 'rgb(255,99,99)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
                {
                    label: 'Gefühlt',
                    data: daten.feels,
                    fill: false,
                    backgroundColor: 'rgb(99,138,255)',
                    borderColor: 'rgba(99,138,255,0.2)',
                }
            ],
        };
        const options = {
            interaction: {
                intersect: false,
                mode: 'nearest',
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                    }
                },
            },
            scales: {
                x: {
                    max: 'Nachts',
                },
                y: {
                    title: {
                        display: true,
                        text: '°C',

                    },
                    ticks: {
                        beginAtZero: true,
                    }
                },
            }
        };




        return (
            <>
                <Line className={style.temp} data={data} options={options}/>
            </>

        );
    }
}

export default TempChart;