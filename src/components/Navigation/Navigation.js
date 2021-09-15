import React from "react"
import {MenuItems} from "./MenuItems";
import style from "./Navigation.module.scss"
import {Button} from "../Button";
import {Link, Switch, Route, BrowserRouter as Router} from "react-router-dom";
import WeatherApp from "../pages/weather/WeatherApp";
import Home from "../pages/home/home";

class Navigation extends React.Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    }

    render() {
        return (
            <>
                <Router>
                    <nav className={style.items}>
                        <Link className={style.link} to={"/"} >
                            <h1 className={style.logo}>Tom's Webtool <i className="fab fa-react"> </i></h1>
                        </Link>
                        <div className={style.menuIcon} onClick={this.handleClick}>
                            <i className={this.state.clicked ? 'fas fa-times ' + style.icons : 'fas fa-bars ' + style.icons}> </i>
                        </div>
                        <ul className={this.state.clicked ? style.menu + ' ' + style.active : style.menu}>
                            {
                                // Mapping the data from MenuItems to a list item
                                MenuItems.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Link className={item.cName} to={item.url}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <Button className={style.btn}>Sign Up</Button>
                    </nav>
                    <Switch>
                        <Route path={"/weather"} component={WeatherApp}/>
                        <Route path={"/"} component={Home}/>
                    </Switch>
                </Router>

            </>
        )
    }
}

export default Navigation;