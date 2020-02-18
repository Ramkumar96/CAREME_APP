import React, { Component } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'


/** 
 * @desc: Footer class component
 */
class Footer extends Component {
    render() {
        return (
            <div>
                <div className="mt-5 pt-5 pb-5 footer ">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-xs-12 align">
                                <h3>Care Me</h3>
                                <p className="pr-5 text-white-50">  CareMe aims to improve the home health
                                    nursing sector of Sri Lanka. Our ultimate goal
                                    is to help patients recover in a healthier
                                    and safer surrounding.
                                </p>
                            </div>

                            <div className="col-lg-3 col-xs-12 align">
                                <h3>Contacts</h3>
                                <div className="pr-5 text-white-50">
                                    <div>
                                        <div>Address:</div>
                                        <div>798 Park road,Colombo 06</div>
                                    </div>
                                    <div>
                                        <div>email:</div>
                                        <div><a href="mailto:#">careme@careme.com</a></div>
                                    </div>
                                    <div>
                                        <div>phones:</div>
                                        <div><a href="tel:#">+9411079456</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-xs-12 align">
                                <h4 className="mt-lg-0 mt-sm-3">Services</h4>
                                <ul className="pr-5 text-white-50">
                                    <li>Filter for your need</li>
                                    <li>Find your nurse</li>
                                    <li>Send a request</li>
                                    <li>Connect</li>
                                    <li>Recover</li>
                                    <li>Leave a review</li>
                                </ul>
                            </div>

                            <div class="col-lg-3 col-xs-12 align">
                                <h4 class="">Follow Us</h4>
                                <ul>
                                    <div><a href="https://www.linkedin.com/"><FontAwesomeIcon icon={faLinkedin} size="1x" /></a>
                                        <span><a href="https://www.linkedin.com/">LinkedIn</a></span></div>
                                    <br />
                                    <div><a href="https://github.com/"><FontAwesomeIcon icon={faGithub} size="1x" /></a>
                                        <span><a href="https://github.com/">GitHub</a></span></div>
                                    <br />
                                    <div><a href="https://facebook.com/"><FontAwesomeIcon icon={faFacebookSquare} size="1x" /></a>
                                        <span><a href="https://facebook.com/">Facebook</a></span></div>
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
