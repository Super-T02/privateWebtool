import React from "react";
import Day from "./Day";
import style from "./moreData.module.scss";
import TempChart from "./TempChart";
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
        } = data;

        const {
            min,
            max,
        } = temp;

        const hourFormate = new Intl.DateTimeFormat('de-DE',
            {hour: '2-digit', minute: '2-digit'}).format;

        const sunrise = hourFormate(new Date(data.sunrise * 1000));
        const sunset =  hourFormate(new Date(data.sunset * 1000));

        let date = '';
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

        console.log(this.props.moreInformation); // TODO: Remove

        // Render
        return (
            <div className={"card " + style.all}>
                <h1 id="moreInformation" className={style.title}>{date} {selected.getDate()}.{selected.getMonth() + 1} - {description}</h1>
                <div className={style.overview}>
                    <div className={style.description}>
                        <h2 className={style.head}>Überblick</h2>
                        {/*Temperature*/}
                        <i className={"wi wi-thermometer " + style.littleicon} />
                        <div>Min: {min | 1}&#8451;</div>

                        <i className={"wi wi-thermometer " + style.littleicon} />
                        <div>Max:  {max | 1}&#8451;</div>

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
                    </div>

                </div>
                <div>
                    <TempChart/>
                </div>
            </div>

        );
    }
}

export default InformationBoard;