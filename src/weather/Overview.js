import React from "react";

import style from "../styles/weather.module.scss";
import animation from "../styles/animations.module.scss"

import {weatherAPI} from "../api/weather/weather";
import Day from "./Day";
import InformationBoard from "./moreData";

class Placeholder extends React.Component{
    render() {
        return (
            <>
                <div id="overviewFiveDays" className={style.placeHolderWrapper}>
                    <div className={"card day " + style.placeHolder} />
                    <div className={"card day " + style.placeHolder} />
                    <div className={"card day " + style.placeHolder} />
                    <div className={"card day " + style.placeHolder} />
                    <div className={"card day " + style.placeHolder} /><div className={"card day " + style.placeHolder} />
                    <div className={"card day " + style.placeHolder} />
                    <div className={"card day " + style.placeHolder} />
                    <div className={"card day " + style.placeHolder} />
                    <div className={"card day " + style.placeHolder} />
                </div>
            </>
        );
    }
}

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            weather: [],
            moreInformation: '',
        }
    }

    componentDidMount() {
        if (!this.state.isLoaded)
        {
            weatherAPI.getData(this, 7);
        }
    }

    /**
     * Scroll vertical with the mousewheel
     * @param e
     */
    scrollVertical= (e) => {
        const overview = document.getElementById("overviewFiveDays");
        if(e.deltaY > 0) overview.scrollLeft += 25;
        else overview.scrollLeft -= 25;
    }
    onEnter = () => {
        window.addEventListener("wheel", this.scrollVertical);
        document.getElementsByTagName('body')[0].classList.add("stop");
    }
    onLeave =() => {
        window.removeEventListener("wheel", this.scrollVertical);
        document.getElementsByTagName('body')[0].classList.remove("stop");
    }

    generateKey(date) {
        return '' + date.getDate() + date.getMonth() + date.getFullYear();
    }

    onClick = (key) => {
        const {weather} = this.state;

        for (const weatherElement of weather) {
            if (key === this.generateKey(new Date(weatherElement.data.dt * 1000))) {
                this.setState({
                    moreInformation: weatherElement,
                });

                document.getElementById('moreInformation').scrollIntoView(
                    {behavior: "smooth"}
                );

                return;
            }
        }

    }

    render() {
        const {error, isLoaded, weather, moreInformation} = this.state;
        let rows = [];

        let iterator = 0;

        for (const weatherElement of weather) {
            let today, tomorrow = false;
            let key = this.generateKey(new Date(weatherElement.data.dt * 1000));
            iterator === 0 ? today = true : today = false;
            iterator === 1 ? tomorrow = true : tomorrow = false;

            rows.push(
                <Day key={key}
                     sendKey={key}
                     onClick={this.onClick}
                     today={today}
                     tomorrow={tomorrow}
                     weather={weatherElement}
                     className={"day card"}/>
            );

            iterator++;
        }

        if (isLoaded) {
            if (error) {
                console.log(error);
                return (
                    <>
                        <h2>Konnte nicht geladen werden!</h2>
                    </>
                );
            } else
                return (
                    <>
                        <div
                            id="overviewFiveDays"
                            onMouseOver={this.onEnter}
                            onMouseLeave={this.onLeave}
                        >
                            {rows}
                        </div>

                        <InformationBoard moreInformation={moreInformation}/>
                    </>
                );
        } else {
            return (
                <>
                    <div className={animation.loader} />
                    <Placeholder />
                </>
            );
        }

    }

}

export default Overview;
