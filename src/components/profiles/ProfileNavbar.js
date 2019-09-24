
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import  './Navigationbar.css';

class ProfileNavbar extends Component{
   

    render(){
        return(
            
            <React.Fragment>

                <nav class="navbar navbar-light bg-light">
                    
                    <a class="navbar-brand" href="#">
                        <img src="/images/logo.jpeg" width="30" height="30" class="d-inline-block align-top" alt="mainlogo"/>
                        Care Me
                    </a>

                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <a class="nav-link" href="#"> How it Works </a>
                        </li>
                    </ul>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">FIND A NURSE</button>  
                </nav>

             </React.Fragment>     
      
        );
    }
}

export default ProfileNavbar;