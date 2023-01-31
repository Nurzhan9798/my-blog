import React from 'react';
import {Link} from "react-router-dom";

const Header = (props) => {
    return (
        <header className="header">
            <div className="header__container container">
                <Link to="/" className="haeder__logo">My BLOG</Link>
                <nav className="header__nav">
                    <Link to="/login">Login</Link>
                    <Link to="/registration">Registration</Link>
                </nav>
            </div>

        </header>
    )
}

export default Header;