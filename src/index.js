// lib imports
import React from 'react';
import ReactDOM from 'react-dom';

// Style imports
import './index.scss';
import style from './index.module.scss'

// Internal imports
import './api/weather/weather';
import Overview from "./components/weather/Overview";

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
    constructor(props) {
        super(props);

        this.state = {
            active: 'Wetter',
            title: 'Wetter',
        }
    }

    changeElement(clicked){
        if (clicked !== this.state.active){
            this.setState({active: clicked, title: clicked});
        }
    }

    render() {
        const {title, active} = this.state;
        let elements = [];

        if(active === 'Home') elements.push(
            <div
                className={style.navElement + ' ' + style.active}
                onClick={() => this.changeElement('Home')}>
                Home
            </div>);
        else elements.push(
            <div
                className={style.navElement}
                onClick={() => this.changeElement('Home')}>
                Home
            </div>
        );

        if (active === 'Wetter') elements.push(
            <div
                className={style.navElement+ ' ' + style.active}
                onClick={() => this.changeElement('Wetter')}>
                Wetter
            </div>
        );
        else elements.push(
            <div
                className={style.navElement}
                onClick={() => this.changeElement('Wetter')}>
                Wetter
            </div>
        )


        return (
            <>
                <div className={style.mainWrapper}>
                    <div className={style.nav}>
                        {elements}
                    </div>
                    <div>
                        <Content title={title} />
                    </div>
                </div>
            </>

        );

    }
}


ReactDOM.render(<App /> , document.getElementById('root'));