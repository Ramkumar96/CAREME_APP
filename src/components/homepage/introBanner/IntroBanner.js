
import React, { Component } from "react";
import classes from "./IntroBanner.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

class IntroBanner extends Component{
    render(){
        return(
                <div class="container-fluid">
                    <div class="row max-height justify-content-center align-items-center">
                        <div class="col-10 mx-auto banner text-center">
                            <h1 class="text-capitalize">
                                <strong class="banner-title">Book Appointment with Expert Nurse in your Area</strong>
                            </h1>

                            <div>
                                <span> <Link to={"/validateForm"} class="btn btn-primary btn-lg">I WANT A CLIENT</Link> </span>
                                <span> <Link to={"/clientForm"} class="btn btn-secondary btn-lg">I WANT A NURSE</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default IntroBanner;
