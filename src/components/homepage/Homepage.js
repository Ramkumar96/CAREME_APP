import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigationbar from './navigationbar/Navigationbar';
import IntroBanner from './introBanner/IntroBanner';

class Homepage extends Component{
    render(){
        return(
           <div>
               <Navigationbar/>
               <IntroBanner/>
           </div>
        );
    }
}

export default Homepage;