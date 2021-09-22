import React from "react";

import style from "./weather.module.scss";
import animation from "../../../styles/animations.module.scss"

import {weatherAPI} from "../../../api/weather/weather";
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
                    <div className={"card day " + style.placeHolder} />
                    <div className={"card day " + style.placeHolder} />
                    <div className={"card day " + style.placeHolder} />
                    <div className={"card day " + style.placeHolder} />
                    <div className={"card day " + style.placeHolder} />
                    <div className={"card day " + style.placeHolder} />
                </div>
            </>
        );
    }
}

class WeatherApp extends React.Component {
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
     * generates a key for each day
     * @param date { Date }
     * @returns { string }
     */
    generateKey(date) {
        return '' + date.getDate() + date.getMonth() + date.getFullYear();
    }

    /**
     * changes the displayed more information
     * @param key { string }
     */
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

    /**
     * scrolls one card to the left hand side
     * @param id { string }
     */
    scrollLeft(id){
        const gallery = document.getElementById(id);
        const scrollWidth = document.getElementsByClassName("day")[0].clientWidth + 10;

        gallery.scrollBy({
            top: 0,
            left: -scrollWidth,
            behavior: "smooth",
        })
    }

    /**
     * scrolls one card to the right hand side
     * @param id { string }
     */
    scrollRight(id){
        const gallery = document.getElementById(id);
        const scrollWidth = document.getElementsByClassName("day")[0].clientWidth + 10;
        gallery.scrollBy({
            top: 0,
            left: +scrollWidth,
            behavior: "smooth",
        })
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
                        <div >
                            <div className={style.leftSlider} onClick={() => this.scrollLeft("overviewFiveDays")}>
                                &#10094;
                            </div>
                            <div className={style.rightSlider} onClick={() => this.scrollRight("overviewFiveDays")}>
                                &#10095;
                            </div>
                            <div id={"overviewFiveDays"}>
                                {rows}
                            </div>
                            <InformationBoard moreInformation={moreInformation}/>
                        </div>
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

export default WeatherApp;
