import React, { Component } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

class Footer extends Component {
    render() {
        return (
            <div>
                <div className="mt-5 pt-5 pb-5 footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-xs-12 about-company align">
                                <h3>Care Me</h3>
                                <p className="pr-5 text-white-50">  CareMe is a web based solution
                                    that aims to improve the home health
                                    nursing sector of Sri Lanka. Our ultimate goal
                                    is to help patients recover in a healthier
                                    and safer environment to their best.
                                </p>
                            </div>

                            <div className="col-lg-3 col-xs-12 about-company align">
                                <h3>Contacts</h3>
                                <div className="pr-5 text-white-50"> 
                                    <div class="contact-list">
                                        <div>Address:</div>
                                        <div>798 Park road,Colombo 06</div>
                                    </div>
                                    <div class="contact-list">
                                        <div>email:</div>
                                        <div><a href="mailto:#">careme@careme.com</a></div>
                                    </div>
                                    <div class="contact-list">
                                        <div>phones:</div>
                                        <div><a href="tel:#">+9411079456</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-xs-12 pl-5 links align">
                                <h4 className="mt-lg-0 mt-sm-3">Services</h4>
                                <ul className="m-0 p-0">
                                    <div><a href="#">Partners</a></div>
                                    <div><a href="#">About Us</a></div>
                                    <div><a href="#">Terms & Conditions</a></div>
                                    <div><a href="#">Privacy Policy</a></div>
                                    <div><a href="#">Contact Us</a></div>
                                    <div><a href="#">FAQ</a></div>
                                </ul>
                            </div>

                            <div class="col-lg-3 col-xs-12 location align">
                                <h4 class="">Follow Us</h4>
                                <ul>
                                    <div><a href="https://www.linkedin.com/"><FontAwesomeIcon icon={faLinkedin} size="1x" /></a>
                                    <span><a href="https://www.linkedin.com/">Linked In of careMe</a></span></div>
                                    <br/>
                                    <div><a href="https://github.com/"><FontAwesomeIcon icon={faGithub} size="1x" /></a>
                                    <span><a href="https://github.com/">Git Hub of CareMe</a></span></div>
                                    <br/>
                                    <div><a href="https://facebook.com/"><FontAwesomeIcon icon={faFacebookSquare} size="1x" /></a>
                                    <span><a href="https://facebook.com/">FaceBook of CareMe</a></span></div>
                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
