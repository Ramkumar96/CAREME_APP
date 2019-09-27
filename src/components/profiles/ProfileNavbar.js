
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import  './Navigationbar.css';
import Modal from 'react-awesome-modal';
import { Button, Form } from 'react-bootstrap';

class ProfileNavbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            visible1 : false
        }
    }
    
    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

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
                    <a class="nav-link" href="#"> User1234 </a>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Edit Profile</button>  
                    <a>                            
                        <span>
                            <input type="button" class="btn btn-info" value="LogOut" onClick={() => this.openModal()} />
                            <Modal visible={this.state.visible} width="25%" height="25%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                <h1 align="center">LogOut</h1>
                                <Form>
                                    <p>Do you really want to Logout?</p>
                                    <center>
                                        <Button variant="btn btn-danger" type="submit">LogOut</Button>
                                        <input type="button" class="btn btn-info" value="Cancel" onClick={() => this.closeModal()} />
                                    </center>
                                </Form>
                            </Modal>
                        </span>
                    </a>                    
                </nav>

             </React.Fragment>     
      
        );
    }
}

export default ProfileNavbar;