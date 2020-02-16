import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-awesome-modal';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

class ProfileNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            redirect_home: false,
            token: '',
            nurseprofile: false,
            clientprofile: false,
            adminprofile: false
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

    logout = () => {
        localStorage.clear()
        this.setState({
            redirect_home: true
        })
    }

    viewProfile = () => {
        console.log('hheyy')
        var id = localStorage.getItem('id');
        var userID = localStorage.getItem("user_id");
        if (userID == 0) {
            this.setState({
                nurseprofile: true,
                token: id
            });
        }
        else if(userID == 1) {
            this.setState({
                clientprofile: true,
                token: id
            });
        }

        else{
            this.setState({
                adminprofile: true,
                token: id
            });
        }
    }


    render() {

        if (this.state.redirect_home) {
            return (
                <Redirect to='/' />
            )
        }

        if (this.state.nurseprofile) {
            return (
                <Redirect to={'/nurseprofile/' + this.state.token} />
            )
        }
        if (this.state.clientprofile) {
            return (
                <Redirect to={'/clientprofile/' + this.state.token} />
            )
        }
        if (this.state.adminprofile) {
            return (
                <Redirect to={'/adminmaindash'}/>
            )
        }

        return (
            <div>
                <nav className="navbar navbar-expand navbar-light">
                    <div className="navbar-brand">
                        <img src="/images/careme.png" width="120" height="30" className="d-inline-block align-top" alt="mainlogo" />
                    </div>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">

                        </li>
                    </ul>
                    {/* View Profile Button */}
                    <button className="btn btn-outline-info my-2 my-sm-0" type="submit" onClick={() => this.viewProfile()}><i className="far fa-user-circle" /></button>
                    {/* Log out Button */}
                    <button className="btn btn-outline-info my-2 my-sm-0" type="submit" onClick={() => this.openModal()}>LOG OUT</button>

                    {/* Logout modal */}
                    <Modal visible={this.state.visible} width="25%" height="25%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div class="modal-content">
                            <div class="modal-header"><h4 align="center">Logout <i class="fa fa-lock"></i></h4></div>
                            <div class="modal-body"><i class="fa fa-question-circle"></i> Are you sure you want to log out?</div>
                            <div class="modal-footer"> <Button className="btn btn-primary btn-block" type="submit" onClick={() => this.logout()}>Logout</Button></div>
                        </div>
                    </Modal>
                </nav>
            </div>
        );
    }
}

export default ProfileNavbar;