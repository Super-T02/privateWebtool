import React from "react"
import {MenuItems} from "./MenuItems";
import style from "./Navigation.module.scss"

class Navigation extends React.Component {


    render() {
        return (
            <>
                <nav className={style.items}>
                    <h1 className={style.logo}>Tom's Webtool <i className="fab fa-react"></i></h1>
                    <div className={style.menuIcon}>

                    </div>
                    <ul>
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
                </nav>
            </>
        )
    }
}

export default Navigation;