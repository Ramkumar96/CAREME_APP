
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./AboutBanner.css";

class AboutBanner extends Component{
    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-10 mx-auto col-md-6 my-5">
                            <h1>How <strong>Careme </strong> </h1>
                            <h1 className="align-center">help you...</h1>
                            <p className="text-muted">
                             we are learning to code never will help you to find a nurse
                             we are learning to code never will help you to find a nurse
                             we are learning to code never will help you to find a nurse
                             </p>
                             <a href="#" class="btn btn-black text-uppercase">explore</a>
                        </div>   
                       
                        <div className="col-10 mx-auto col-md-6 my-5 align-self-center">
                            <div className="about-img__container">
                                <img src= "/images/aboutus.jpg" className="img-fluid" alt="about us "/>
                            </div>
                        </div> 
                    </div>
                </div>
            </div> 
       );
    }
}

export default AboutBanner;
