// lib imports
import React from 'react';
import ReactDOM from 'react-dom';

// Style imports
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Internal imports
import './api/weather/weather';
import Navigation from "./components/Navigation/Navigation";

class App extends React.Component {
        render() {
        return (
            <>
                <Navigation />
            </>

        );

    }
}


ReactDOM.render(<App /> , document.getElementById('root'));