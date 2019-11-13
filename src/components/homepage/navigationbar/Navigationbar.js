
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Navigationbar.css';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import Modal from 'react-awesome-modal';
import { Button, Form } from 'react-bootstrap';
import axios from "../../../../backend/node_modules/axios";
import NurseListMain from '../../list/NurseListMain';

class Navigationbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible1: false,
            email: null,
            password: null,
            redirect_profile: false,
        }
    }

    openModal() {
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

    onLogin = () => {
        console.log(this.state)
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(data)
        axios.post('http://localhost:4000/user/login', data)
            .then(response => {
                //console.log(response.data)
                if (response.data.success) {
                    console.log(response.data.user_data)
                    localStorage.setItem("id",response.data.user_data._id)
                    localStorage.setItem("user_id",response.data.user_data.userID)
                    localStorage.setItem("user_name",response.data.user_data.FirstName)
                    this.setState({
                        redirect_profile: true
                    })
                }
            })
    }

    render() {
        if (this.state.redirect_profile) {
            return (
                <Redirect to="/profile" />
            )
        }
        return (
            <React.Fragment>
                <nav class="navbar navbar-light bg-light">
                    <a class="navbar-brand" href="#">
                        <img src="/images/logo.jpeg" width="30" height="30" class="d-inline-block align-top" alt="mainlogo" />
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
                                        <Form.Control
                                            type="email"
                                            placeholder="janedoe@example.com"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleOnChange} />
                                    </Form.Group>

                                    <Form.Group controlId="Password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter Your Password Here"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleOnChange} />
                                    </Form.Group>
                                    <center><Button variant="btn btn-success" onClick={this.onLogin} type="submit">Login</Button></center>
                                </Form>
                            </Modal>
                        </span>
                    </a>
                    <Link to="/nursemainlist">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">FIND A NURSE</button>
                    </Link>
                </nav>
            </React.Fragment>
        );
    }
}

export default Navigationbar;