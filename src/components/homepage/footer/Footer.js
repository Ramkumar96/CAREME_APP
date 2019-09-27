
import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component{
    render(){
        return(
            <div>
                <div className="mt-5 pt-5 pb-5 footer"> 
                   <div classNAme="container">
                       <div className="row mx-1"> 
                            <div className="col-lg-5 col-xs-12 about-company">
                                <h3>Care Me</h3>
                                <p className="pr-5 text-white-50">  care me is a web app
                                    dssnjewd wefjkjwef wefkeew
                                    ewfewfe
                                    rfeyeefthghhhgetv hegrbtrhy
                                    dssnjewd wefjkjwef wefkeew
                                    ewfewfe
                                    rfeyeefthghhhgetv hegrbtrhy
                                </p>

                                


                            </div>   

                            <div class="col-lg-3 col-xs-12 links"> 
                                <h4 className="mt-lg-0 mt-sm-3">Services</h4>
                                    <ul className="m-0 p-0">
                                        <li>- <a href="#">Partners</a></li>
                                        <li>- <a href="#">About Us</a></li>
                                        <li>- <a href="#">Terms & Conditions</a></li>
                                        <li>- <a href="#">Privacy Policy</a></li>
                                        <li>- <a href="#">Contact Us</a></li>
                                        <li>- <a href="#">FAQ</a></li>
                                    </ul>
                            </div>  
                            
                            <div class="col-lg-4 col-xs-12 location">
                            <h4 class="mt-lg-0 mt-sm-4">Follow Care Me</h4>
                            <ul>
                                <li> <a href="#"><i class="fa fa-facebook-square mr-1"></i></a></li>
                                <li> <a href="#"><i class="fa fa-linkedin-square"></i></a> </li>
                                <li> <a href="#"><i class="fa fa-instagram"></i></a></li>
                                <p> Cool  </p>
                                <p>facebook</p>
                                <p>instragm</p>

                                    
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
