import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigationbar from './navigationbar/Navigationbar';
import IntroBanner from './introBanner/IntroBanner';
import AboutBanner from './aboutBanner/AboutBanner';
class HomePage extends Component{
    render(){
        return(
           <div>
               <Navigationbar/>
               <IntroBanner/>
               <AboutBanner/>
           </div>
        );
    }
}

export default HomePage;
