import React from "react";
import Glass from "../../templates/cards";



class Day extends React.Component {

    static toDay(dayAsNumber) {
        switch (dayAsNumber) {
            case 0:
                return 'Sonntag';
            case 1:
                return 'Montag';
            case 2:
                return 'Dienstag';
            case 3:
                return 'Mittwoch';
            case 4:
                return 'Donnerstag';
            case 5:
                return 'Freitag';
            case 6:
                return 'Samstag';
            case 7:
                return 'Heute';
            case 8:
                return 'Morgen'
            default:
                return '';
        }
    }

    render() {
        // Props
        const {weather, className, today, tomorrow, onClick, sendKey} = this.props;

        const data = weather.data;

        // Temperature
        const min = data.temp.min | 1;
        const max = data.temp.max | 1;

        const date = new Date(data.dt * 1000);

        // set the day
        let day;
        if (today)
            day = 'Heute';
        else if(tomorrow)
            day = 'Morgen';
        else
            day = Day.toDay(date.getDay());



        return (
            <Glass padding={"30px"} className={className} onClick={() => onClick(sendKey)} >
                <h2 className="heading">{day}<br/>{date.getDate()}.{date.getMonth() + 1}</h2>
                <i className={"wi " + weather.iconDay}/>
                <h3>{weather.description}</h3>
                <div className={"temperature"}>
                    <i className={"wi wi-thermometer"}/>
                    <span className={"tempMin"}>
                        Min: {min} &#8451;
                    </span>
                    <span className={"tempMax"}>
                        Max: {max} &#8451;
                    </span>
                </div>
            </Glass>
        );
    }
}

export default Day;
