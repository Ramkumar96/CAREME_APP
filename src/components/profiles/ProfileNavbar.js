import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-awesome-modal';
import { Button} from 'react-bootstrap';
import { BrowserRouter as Redirect } from "react-router-dom";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MenuIcon from '@material-ui/icons/Menu';

import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


class ProfileNavbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            visible1 : false,
            redirect_home: false,
        }
    }
    
    openModal() {
        this.setState({
            visible : true
        });
    }

    openDeacModal() {
        this.setState({
            visible1 : true
        });
    }

    closeDeacModal(){
        this.setState({
            visible1 : false
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    logout=()=>{
        localStorage.clear()
        this.setState({
            redirect_home:true
        })
    }

    closePopup = () => {
        this.setstate({
            close: true
        });
    };

    render(){    
        
        if(this.state.redirect_home)
            {
                return(
                    <Redirect to='/'/>
                )
            }

        return(  

            <React.Fragment>
                    <nav class="navbar navbar-expand navbar-light">
                    
                        <a class="navbar-brand" href="#">
                            {/* <img src="/images/logo.jpeg" width="30" height="30" class="d-inline-block align-top" alt="mainlogo"/> */}
                            <img src="/images/careme.png" width="120" height="30" class="d-inline-block align-top" alt="mainlogo" />
                        </a>

                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item active">
                                {/* <a class="nav-link" href="#"> Help </a> */}
                            </li>
                        </ul>

                        <AccountCircleIcon fontSize="large" />

                        <ForumIcon fontSize="large" />

                        <NotificationsActiveIcon fontSize="large" />

                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {popupState => (
                                <React.Fragment>
                                    <MenuIcon fontSize="large" {...bindTrigger(popupState)}/>
                                    
                                    <Menu {...bindMenu(popupState)} onClickAway={()=>this.closePopup()}>
                                        <MenuItem onClick={popupState.close}>Settings</MenuItem>
                                        <MenuItem onClick={popupState.close}>Calender</MenuItem>
                                        
                                        <MenuItem onClick={() => this.openModal()}>Logout</MenuItem>
                                        <Modal visible={this.state.visible} width="25%" height="25%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                            <h1 align="center">Logout</h1>
                                            <p align="center">Do you really want to Logout?</p>
                                                <center>
                                                    <Button variant="btn btn-danger" type="submit" onClick={() => this.logout()}>LogOut</Button>
                                                    <input type="button" class="btn btn-info" value="Cancel" onClick={() => this.closeModal()} />
                                                </center>                                            
                                        </Modal>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>                  
                </nav>
            </React.Fragment> 
        );
    }
}

export default ProfileNavbar;