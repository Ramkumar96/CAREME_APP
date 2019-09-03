
import React, { Component } from "react";
import classes from './IntroBanner.css';

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
                               <span> <a href="#" class="btn banner-link my-2">I WANT A NURSE</a> </span>
                               <span> <a href="#" class="btn banner-link my-2">I WANT A CLIENT</a> </span>
                            </div>
                        </div> 
                    </div>
                </div>
        );
    }
}

export default IntroBanner;