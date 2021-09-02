// lib imports
import React from 'react';
import ReactDOM from 'react-dom';

// Style imports
import './index.scss';

// Internal imports
import './api/weather/weather';
import Overview from "./weather/Overview";



class Board extends React.Component {
    render() {
        return (
            <>
                <Overview />
            </>
        );
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const title = this.props.title;
        if (title === "Wetter") {
            return (
                <>
                    <h1 id="title">{title}</h1>
                    <Board />
                </>

            );
        }


    }
}

class App extends React.Component {

    render() {
        const title = 'Wetter';

        return (
            <>
                <h1 id="title">{title}</h1>
                <Board />
            </>

        );

    }
}


ReactDOM.render(<App /> , document.getElementById('root'));