
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  './Navigationbar.css';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Modal from 'react-awesome-modal';
import { Button, Form } from 'react-bootstrap';

class Navigationbar extends Component{
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

                    {/* <ul class="navbar-nav mr-auto mt-2 mt-lg-0"> */}
                        <li class="nav-item active">
                        <Link to="/profile" >client profile</Link>
                        </li>
                        <li class="nav-item active">
                            <Link to="/clientlist" >client List</Link>
                        </li>
                        <li class="nav-item active">
                            <Link to="/nurselist">Nurse List</Link>
                        </li>
                    {/* </ul> */}
              
                    <a>                            
                        <span>
                            <input type="button" class="btn btn-outline-primary" value="Login" onClick={() => this.openModal()} />
                            <Modal visible={this.state.visible} width="25%" height="45%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                <h1 align="center">Login</h1>
                                <Form>
                                    <Form.Group controlId="emailAd">
                                        <Form.Label>E-mail Address</Form.Label>
                                        <Form.Control type="email" placeholder="janedoe@example.com" />
                                    </Form.Group>

                                    <Form.Group controlId="Password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter Your Password Here"/> 
                                    </Form.Group>
                                    <center><Button variant="btn btn-success" type="submit">Login</Button></center>
                                </Form>
                            </Modal>
                        </span>

                    </a>
                    
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">FIND A NURSE</button>  
                </nav>

             </React.Fragment>     
            
            
        );
    }
}

export default Navigationbar;