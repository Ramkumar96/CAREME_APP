
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  './Navigationbar.css';
import mainlogo from '../../../asserts/images/logo.jpeg';
import { BrowserRouter as Router, Link } from "react-router-dom";


class Navigationbar extends Component{
    render(){
        return(
            
            <React.Fragment>

                <nav class="navbar navbar-light bg-light">
                    
                    <a class="navbar-brand" href="#">
                        <img src={mainlogo} width="30" height="30" class="d-inline-block align-top" alt="mainlogo"/>

                        Care Me
                    </a>

                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <a class="nav-link" href="#"> How it Works </a>
                        </li>
                    </ul>

                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <a>
                            {/* <span> <Link to={"/infoForm"} class="btn banner-link my-2">I WANT A NURSE</Link> </span> */}
                                <Link to={"/LoginForm"} class="btn btn-outline-primary" > Login</Link>
                            </a>
                        </li>
                    </ul>

                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">FIND A NURSE</button>  
                </nav>

             </React.Fragment>     
            
            
        );
    }
}

export default Navigationbar;