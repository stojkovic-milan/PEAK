import React from "react";
import './NavBar.css'
import LoginMenu from '../api-authorization/LoginMenu'
import { Layout } from "../Layout";

function NavBar(){

    return (
        <header id="site-header" className="fixed-top">
            <div className="container">
                <nav className="navbar navbar-expand-lg stroke">
                    <h1>
                        <a className="navbar-brand mr-lg-5" href="index.html">
                            Logo
                        </a>
                    </h1>
                    <button className="navbar-toggler collapsed bg-gradient" type="button">
                        <span className="navbar-toggler-icon fa icon-expand fa-bars"></span>
                        <span className="navbar-toggler-icon fa icon-close fa-times"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="index.html">Pocetna</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="index.html">Dogadjaji</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="index.html">Planinarska drustva</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="index.html">O nama</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="index.html">Kontakt</a>
                            </li>
                                
                        </ul>
                    </div>
                    {/* <div className="d-lg-block d-none">
                        <a href="https://localhost:5001/Identity/Account/Login" className="btn btn-style btn-secondary" >Login</a>
                    </div> */}
                    

                    <div className="mobile-position">
                        <nav className="navigation">
                            <div className="theme-switch-wrapper">
                                <label className="theme-switch" form="checkbox">
                                    <input type='checkbox' id="checkbox" />
                                    <div className="mode-container">
                                        <i className="gg-sun"></i>
                                        <i className="gg-moon"></i>
                                    </div>
                                </label>
                            </div>
                        </nav>
                    </div>
                </nav>
                
            </div>
        </header>
        // <Layout />
    );
}

export default NavBar;