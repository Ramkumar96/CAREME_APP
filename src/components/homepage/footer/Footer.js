import React, { Component } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

class Footer extends Component{
    render(){
        return(
            <div>
                <div className="mt-5 pt-5 pb-5 footer"> 
                   <div className="container">
                       <div className="row mx-1"> 
                            <div className="col-lg-5 col-xs-12 about-company">
                                <h3>Care Me</h3>
                                <p className="pr-5 text-white-50">  CareMe is a web based solution
                                    that aims to improve the home health
                                    nursing sector of Sri Lanka. Our ultimate goal
                                    is to help patients recover in a healthier
                                    and safer environment to their best.
                                </p>
                            </div>   

                            <div class="col-lg-3 col-xs-12 links"> 
                                <h4 className="mt-lg-0 mt-sm-3">Services</h4>
                                    <ul className="m-0 p-0">
                                        <li> <a href="#">Partners</a></li>
                                        <li> <a href="#">About Us</a></li>
                                        <li> <a href="#">Terms & Conditions</a></li>
                                        <li> <a href="#">Privacy Policy</a></li>
                                        <li> <a href="#">Contact Us</a></li>
                                        <li> <a href="#">FAQ</a></li>
                                    </ul>
                            </div>  
                            
                            <div class="col-lg-4 col-xs-12 location">
                            <h4 class="mt-lg-0 mt-sm-4">Follow CareMe</h4>
                            <ul>
                                <a href="https://www.linkedin.com/"><FontAwesomeIcon icon={faLinkedin} size="2x"/></a>
                                <span>           </span><span>           </span><span>           </span>
                                <a href="https://github.com/"><FontAwesomeIcon icon={faGithub} size="2x"/></a>
                                <span>           </span><span>           </span><span>           </span>
                                <a href="https://facebook.com/"><FontAwesomeIcon icon={faFacebookSquare} size="2x" /></a>
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
