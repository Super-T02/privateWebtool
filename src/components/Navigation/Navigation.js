import React from "react"
import {MenuItems} from "./MenuItems";
import style from "./Navigation.module.scss"
import {Button} from "../Button";

class Navigation extends React.Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    }

    render() {
        return (
            <>
                <nav className={style.items}>
                    <h1 className={style.logo}>Tom's Webtool <i className="fab fa-react"/></h1>
                    <div className={style.menuIcon} onClick={this.handleClick}>
                        <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={this.state.clicked ? style.menu + ' ' + style.active : style.menu}>
                        {
                            // Mapping the data from MenuItems to a list item
                            MenuItems.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a className={item.cName} href={item.url}>
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <Button>Sign Up</Button>
                </nav>
            </>
        )
    }
}

export default Navigation;