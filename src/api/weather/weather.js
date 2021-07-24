
import $ from 'jquery';
import {ATMOSPHERE, CLEAR, CLOUDS, DRIZZLE, RAIN, SNOW, THUNDERSTORMS} from "./weather-config";

const hostname = 'toms-laptop';

export class weatherAPI {
    static declareWeather(data, maxAmount) {
        let weather = [];

        for (let i = 0; i < data.daily.length && i < maxAmount; i++) {
            let group = [];
            let day = data.daily[i];
            const weatherID = day.weather[0].id;

            switch (parseInt((weatherID / 100).toString(), 10))
            {
                case 2:
                    group = THUNDERSTORMS;
                    break;
                case 3:
                    group = DRIZZLE;
                    break;
                case 5:
                    group = RAIN;
                    break;
                case 6:
                    group = SNOW
                    break;
                case 7:
                    group = ATMOSPHERE;
                    break;
                case 8:
                    if (weatherID === 800)
                        group = CLEAR;
                    else
                        group = CLOUDS;
                    break;
                default:
                    // Do nothing

                    break;
            }

            for (const element of group) {
                if (element.id === weatherID)
                {
                    weather.push({
                        day: i,
                        id: element.id,
                        description: day.weather[0].description,
                        iconDay: element.iconDay,
                        iconNight: element.iconNight,
                        data: day,
                    });
                }
            }
        }

        return weather;
    }

    static getData(element, max) {
        $.ajax({
            url: 'http://'+ hostname + ':3001/weather',
            method: 'GET',
        }).done((data) => {
            console.log(data);
            const weather = this.declareWeather(data, max);
            element.setState({
                isLoaded: true,
                error: '',
                weather: weather,
                moreInformation: weather[0]
            });
        })
            .fail((err) => {
                element.setState({
                    isLoaded: true,
                    error: err,
                });
            })

    }
}










