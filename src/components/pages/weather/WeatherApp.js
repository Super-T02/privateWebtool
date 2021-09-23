import React from "react";

// Slider imports
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, {
    Pagination,
    Navigation
} from "swiper/core";


// Own css imports
import "./weather.scss";
import animation from "../../../styles/animations.module.scss"

// Component import
import {weatherAPI} from "../../../api/weather/weather";
import Day from "./Day";
import InformationBoard from "./moreData";


// install Swiper
SwiperCore.use([Pagination, Navigation]);

/**
 * Placeholder for the loading animation of the day slider
 */
class Placeholder extends React.Component{
    render() {
        return (
            <>
                <div id="overviewFiveDays" className={"placeHolderWrapper"}>
                    <div className={"card day placeHolder"} />
                    <div className={"card day placeHolder"} />
                    <div className={"card day placeHolder"} />
                    <div className={"card day placeHolder"} />
                    <div className={"card day placeHolder"} />
                    <div className={"card day placeHolder"} />
                    <div className={"card day placeHolder"} />
                    <div className={"card day placeHolder"} />
                    <div className={"card day placeHolder"} />
                    <div className={"card day placeHolder"} />
                </div>
            </>
        );
    }
}

/**
 * Weather Application
 */
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
        const { innerWidth: width, innerHeight: height } = window;

        // Slider Settings default ( < 800 px)
        let slidesPerView = 2;
        let shouldCenter = true;

        // Settings for the slider
        if (width > 800) slidesPerView = 3;
        if (width > 1000) {
            slidesPerView = 4;
            shouldCenter = false;
        }
        if (width > 1800) slidesPerView = 5;
        if (width > 2000) slidesPerView = 6;

        // Defaults for day generation
        let rows = [];
        let iterator = 0;

        // generate the day
        for (const weatherElement of weather) {
            let today, tomorrow = false;
            let key = this.generateKey(new Date(weatherElement.data.dt * 1000));
            iterator === 0 ? today = true : today = false;
            iterator === 1 ? tomorrow = true : tomorrow = false;

            rows.push(
                <SwiperSlide className={"weather-day-slide"}>
                    <Day key={key}
                         sendKey={key}
                         onClick={this.onClick}
                         today={today}
                         tomorrow={tomorrow}
                         weather={weatherElement}
                         className={"day card"}/>
                </SwiperSlide>

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
                        <div id={"overviewFiveDays"}>
                            <Swiper
                                navigation={true}
                                centeredSlides={shouldCenter}
                                slidesPerView={slidesPerView}
                                paggination={true}
                                spaceBetween={50}
                                pagination={{
                                    clickable: false
                                }}
                                className="weather-swiper"
                            >
                                {rows}
                            </Swiper>
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

export default WeatherApp;
