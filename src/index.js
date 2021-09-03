// lib imports
import React from 'react';
import ReactDOM from 'react-dom';

// Style imports
import './index.scss';

// Internal imports
import './api/weather/weather';
import WeatherApp from "./components/weather/WeatherApp";
import Navigation from "./components/Navigation/Navigation";

class App extends React.Component {
        render() {
        return (
            <>
                <Navigation />
                <WeatherApp />
            </>

        );

    }
}


ReactDOM.render(<App /> , document.getElementById('root'));