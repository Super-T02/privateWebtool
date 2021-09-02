// lib imports
import React from 'react';
import ReactDOM from 'react-dom';

// Style imports
import './index.scss';

// Internal imports
import './api/weather/weather';
import Overview from "./weather/Overview";

class Content extends React.Component {
    render() {
        const title = this.props.title;
        let elements = [];

        // Set the different views for the application
        if (title === "Wetter") {
            elements.push(<Overview />)
        }

        // test
        return (
            <>
                <h1 id="title">{title}</h1>
                {elements}
            </>

        );

    }
}

class App extends React.Component {

    render() {
        const title = 'Wetter';

        return (
            <>
                <Content title={title} />
            </>

        );

    }
}


ReactDOM.render(<App /> , document.getElementById('root'));