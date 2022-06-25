import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>Quotes</h1>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? classes.active : ""
                            }
                            to="/quotes"
                        >
                            All quotes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? classes.active : ""
                            }
                            to="/new-quote"
                        >
                            Add quote
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
