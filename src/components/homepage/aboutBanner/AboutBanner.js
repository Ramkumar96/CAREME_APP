import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutBanner.css";

class AboutBanner extends Component {
    render() {
        return (
            <div>
                <div class="container-fluid">
                    <div className="row back">
                        {/* AboutBanner Left Col */}
                        <div className="col-6 ">
                            <div className="row">
                                <img src="/images/about.png" width="225" height="75" alt="aboutus logo " />
                            </div>
                            <div className="row caremeimage">
                                <img src="/images/caremew.jpg" width="225" height="75" alt="Careme logo " />
                            </div>
                            <div className="row abouttext">
                                <p className="text-muted">
                                    Care me is a web based system that aims to improve the
                                    lives of Sri Lankans through home health nursing.Care me connects
                                    clients who need medical
                                    assistance and the nurses who would like to work extra.
                                </p>
                            </div>
                            <div className="row abouttext">
                                <a href="#" class="btn btn-primary btn-lg text-uppercase">explore</a>
                            </div>
                        </div>

                        {/* About Banner Right Col */}
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
