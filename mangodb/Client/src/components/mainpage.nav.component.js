import React from 'react'
import {Link} from "react-router-dom";

const MainNav = () => {
    return(
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={"/"}>Mango Delivery</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="">
                                <Link className="nav-item" to={"/sign-in"}>Login</Link>
                            </li>
                            <li className="">
                                <Link className="nav-item" to={"/sign-up"}>Sign up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    );
}

export default MainNav;