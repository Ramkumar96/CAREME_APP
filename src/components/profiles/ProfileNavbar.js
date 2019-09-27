import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Menu from '@material-ui/icons/Menu';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ForumIcon from '@material-ui/icons/Forum';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
                            <a class="nav-link" href="#"> Help </a>
                        </li>
                    </ul>

                    <AccountCircleIcon fontSize="large" />

                    <ForumIcon fontSize="large" />

                    <NotificationsActiveIcon fontSize="large" />

                    <Menu fontSize="large" />                    
                </nav>
            </React.Fragment> 
        );
    }
}

export default ProfileNavbar;