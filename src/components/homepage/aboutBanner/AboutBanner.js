import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutBanner.css";

class AboutBanner extends Component {
    render() {
        return (
            <div>
                {/* about Banner Container */}
                <div class="container-fluid">
                    <div className="row back">
                        {/* AboutBanner Left Colunm */}
                        <div className="col-6 ">
                            {/* About image */}
                            <div className="row">
                                <img src="/images/about.png" width="225" height="75" alt="aboutus logo " />
                            </div>
                            {/* Care Me image */}
                            <div className="row caremeimage">
                                <img src="/images/caremew.jpg" width="225" height="75" alt="Careme logo " />
                            </div>
                            {/* Text about care me */}
                            <div className="row abouttext">
                                <p className="text-muted">
                                    CareMe is a web based system that aims to improve the
                                    lives of Sri Lankans through home health nursing. CareMe helps connect
                                    clients in need of medical assistance with nurses who are capable to provide the necessary care.
                                </p>
                            </div>
                            {/* Explore care me button */}
                            <div className="row abouttext">
                                <a href="#" class="btn btn-primary btn-lg text-uppercase">explore</a>
                            </div>
                        </div>
                        {/* About Banner Right Column */}
                        <div className="col-6 aboutimg">
                            <div className="about-img__container">
                                <img src="/images/aboutus.jpg" className="img-fluid" alt="about us " />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutBanner;
