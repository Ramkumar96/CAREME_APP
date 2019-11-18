import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Navigationbar.css';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import Modal from 'react-awesome-modal';
import { Button, Form } from 'react-bootstrap';
import axios from "../../../../backend/node_modules/axios";

class Navigationbar extends Component {
    constructor(props) {
        super(props);
        this.openLoginModal = this.openLoginModal.bind(this);
        this.state = {
            visible: false,
            email: null,
            password: null,
            redirect_profile: false,
            user_type: null
        }
    }

    openLoginModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }


    handleOnChange = (e) => {
        //console.log(e.target.name,e.target.value);
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }

    onLogin = (e) => {
        e.preventDefault();
        console.log(this.state)
        
        const data = {
            email: this.state.email,
            password: this.state.password
        };


        console.log(data)
        const headers = {
            'Content-Type': 'application/json'
          }

        axios.post('http://localhost:4000/user/login', data,{headers:headers})
            .then(response => {
                //console.log(response.data)
                if (response.data.success) {
                    console.log(response.data.user_data)
                    localStorage.setItem("id", response.data.user_data._id)
                    localStorage.setItem("user_id", response.data.user_data.userID)
                    localStorage.setItem("user_name", response.data.user_data.FirstName)
                    this.setState({
                        redirect_profile: true,
                        user_type:response.data.user_data.userID
                    })
                }
            })
    }

    render() {
        if (this.state.redirect_profile==true) {
            if(this.state.user_type===0){
                return (
               
                    <Redirect to="/nurseprofile" />
                )
            }
            if(this.state.user_type===1){
                return (
               
                    <Redirect to="/clientprofile" />
                )
            }
           
   
        }
        return (
            <React.Fragment>
                <nav class="navbar navbar-light bg-light">

                    {/* Nav Bar LOGO */}
                    <a class="navbar-brand" href="/">
                        <img src="/images/careme.png" width="120" height="30" class="d-inline-block align-top" alt="mainlogo" />
                    </a>


                    <div >
                        <table align="center">
                            <tr>
                                <td>
                                    {/* Navbar login button */}
                                    <input type="button" class="btn btn-outline-primary" value="Login" onClick={() => this.openLoginModal()} />
                                    <Modal visible={this.state.visible} width="25%" height="45%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                        <div class="card-body login-card-body">
                                        <h1 align="center">Login</h1>
                                        <Form>
                                            
                                            <Form.Group controlId="emailAd">
                                                <Form.Label>E-mail Address</Form.Label>
                                                <div class="input-group-text">
                                                    <span class="fas fa-envelope"></span>
                                                </div>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="janedoe@example.com"
                                                    name="email"
                                                    value={this.state.email}
                                                    onChange={this.handleOnChange} />
                                                    
                                            </Form.Group>
                                            
                                            <Form.Group controlId="Password">
                                                <Form.Label>Password</Form.Label>
                                                <div class="input-group-text">
                                                    <span class="fas fa-lock"></span>
                                                 </div>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Enter Your Password Here"
                                                    name="password"
                                                    value={this.state.password}
                                                    onChange={this.handleOnChange} />
                                            </Form.Group>
                                            <center><Button variant="btn btn-success" onClick={this.onLogin} type="submit">Login</Button></center>
                                        </Form>
                                        </div>
                                    </Modal>

                                </td>
                                <td>
                                    {/* navbar fin nurse button */}
                                    <Link to="/nursemainlist">
                                        <button class="btn btn-outline-info my-2 my-sm-0" type="submit">FIND A NURSE</button>
                                    </Link>
                                </td>
                            </tr>
                        </table>
                    </div>
            </nav>
            </React.Fragment>
        );
    }
}

export default Navigationbar;