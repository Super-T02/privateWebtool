import React from "react";
import Day from "./Day";
import style from "./moreData.module.scss";
import TempChart from "./Charts/TempChart";
class InformationBoard extends React.Component {

    render() {
        // Define vars
        // First level data
        const {
            data,
            iconDay,
            description
        } = this.props.moreInformation;

        // Needed Data
        const {
            dt,
            temp,
            pressure,
            humidity,
            pop,
            feels_like,
        } = data;

        const {
            min,
            max,
        } = temp;


        // Temperature data for the chart
        const temperature = {
            temp: {
                Morgens: temp.morn,
                Mittags: temp.day,
                Abends: temp.eve,
                Nachts: temp.night,
            },
            feels: {
                Morgens: feels_like.morn,
                Mittags: feels_like.day,
                Abends: feels_like.eve,
                Nachts: feels_like.night,
            },
        }

        const hourFormate = new Intl.DateTimeFormat('de-DE',
            {hour: '2-digit', minute: '2-digit'}).format;

        const sunrise = hourFormate(new Date(data.sunrise * 1000));
        const sunset =  hourFormate(new Date(data.sunset * 1000));

        let date;
        let selected = new Date(dt * 1000);
        let now = new Date();


        // Change Day name if it is today or tomorrow
        if (selected.getMonth() === now.getMonth() && selected.getFullYear() === now.getFullYear()) {
            if(selected.getDate() === now.getDate()) {

                date = 'Heute';

            }else if(selected.getDate() === now.getDate() + 1) {

                date = 'Morgen';

            }
            else date = Day.toDay(selected.getDay());
        }else date = Day.toDay(selected.getDay());

        // Render
        return (
            <div className={"card " + style.all}>
                <h1 id="moreInformation" className={style.title}>{date} {selected.getDate()}.{selected.getMonth() + 1} - {description}</h1>
                <div className={style.overview}>
                    <div className={style.description}>
                        <h2 className={style.head}>Überblick</h2>
                        {/*Temperature*/}
                        <i className={"wi wi-thermometer " + style.littleicon} />
                        <div>Min: {min | 1}<i className={"wi wi-celsius"}/></div>

                        <i className={"wi wi-thermometer " + style.littleicon} />
                        <div>Max:  {max | 1}<i className={"wi wi-celsius"}/></div>

                        {/*Sunrise*/}
                        <i className={"wi wi-sunrise " + style.littleicon}/>
                        <div>{sunrise} Uhr</div>

                        {/*Sunset*/}
                        <i className={"wi wi-sunset " + style.littleicon}/>
                        <div>{sunset} Uhr</div>

                        {/*Perssure*/}
                        <i className={"wi wi-barometer " + style.littleicon}/>
                        <div>{pressure} hPa</div>

                        {/*Humidity*/}
                        <i className={"wi wi-humidity " + style.littleicon}/>
                        <div>r. F. {humidity}%</div>
                    </div>
                    <div>
                        <div className={style.umbrella}><i className={"wi wi-umbrella"}/> {pop * 100}%</div>
                        <i className={"wi " + iconDay + " " + style.icon}/>
                        <div className={style.bigTep}><i className={"wi wi-thermometer"}/> {max | 1} <i className={"wi wi-celsius"}/></div>
                    </div>

                </div>
                <div className={style.temp}>
                    <h2 className={style.head}><i className={"wi wi-thermometer"} /> Temperatur</h2>
                    <div>
                        <TempChart data={temperature}/>
                    </div>
                </div>
            </div>

        );
    }
}

export default InformationBoard;