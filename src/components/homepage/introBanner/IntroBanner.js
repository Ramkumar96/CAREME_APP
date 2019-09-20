import React, { Component } from "react";
import classes from "./IntroBanner.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Modal from 'react-awesome-modal';
import { Button, Form, Col } from 'react-bootstrap';

class IntroBanner extends Component{
    constructor(props) {
        super(props);

        this.onChangeNurseFirstName = this.onChangeNurseFirstName.bind(this);
        this.onChangeNurseLastName = this.onChangeNurseLastName.bind(this);
        this.onChangeNurseID = this.onChangeNurseID.bind(this);
        this.onChangeNurseEmail = this.onChangeNurseEmail.bind(this);
        this.onChangeNursePW = this.onChangeNursePW.bind(this);
        this.onChangeNurseCPW = this.onChangeNurseCPW.bind(this);
        this.onChangeNurseHome = this.onChangeNurseHome.bind(this);
        this.onChangeNurseTel = this.onChangeNurseTel.bind(this);
        this.onSubmitNurse = this.onSubmitNurse.bind(this);

        this.state = {
            visible : false,
            visible1 : false
        }
    }

    onChangeNurseFirstName(e){
        this.setState({
            nurseFirstName = e.target.value
        });
    }

    onChangeNurseLastName(e){
        this.setState({
            nurseLastName = e.target.value
        });
    }

    onChangeNurseID(e){
        this.setState({
            nurseID = e.target.value
        });
    }

    onChangeNurseEmail(e){
        this.setState({
            nurseEmail = e.target.value
        });
    }

    onChangeNursePW(e){
        this.setState({
            nursePW = e.target.value
        });
    }

    onChangeNurseCPW(e){
        this.setState({
            nurseCPW = e.target.value
        });
    }

    onChangeNurseHome(e){
        this.setState({
            nurseHome = e.target.value
        });
    }

    onChangeNurseTel(e){
        this.setState({
            nurseTel = e.target.value
        });
    }

    onSubmitNurse(e){
        e.preventDefault();
        this.setState({
            visible : false
        });
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

    openModal1() {
        this.setState({
            visible1 : true
        });
    }
  
    closeModal1() {
        this.setState({
            visible1 : false
        });
    }

    render(){
        return(
                <div class="container-fluid">
                    <div class="row max-height justify-content-center align-items-center">
                        <div class="col-10 mx-auto banner text-center">
                            <h1 class="text-capitalize">
                                <strong class="banner-title">Book Appointment with Expert Nurse in your Area</strong>
                            </h1>

                            <div>
                                <table align = "center">
                                    <tr><td>
                                        <span>
                                            <input type="button" class="btn btn-primary btn-lg" value="I WANT A CLIENT" onClick={() => this.openModal()} />
                                            <Modal visible={this.state.visible} width="50%" height="98%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                                <h1>Register Here</h1>
                                                <Form>
                                                    
                                                 <Form.Row>
                                                    <Form.Group as={Col} controlId="FirstName">
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control type="text" value={this.state.nurseFirstName} onChange={this.onChangeNurseFirstName} /> 
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="LastName">
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control type="text" value={this.state.nurseLastName} onChange={this.onChangeNurseLastName} /> 
                                                    </Form.Group>
                                                </Form.Row>
                            
                                                <Form.Group controlId="nurseid">
                                                    <Form.Label>Nurse Council Registration Number</Form.Label>
                                                    <Form.Control type="text" value={this.state.nurseID} onChange={this.onChangeNurseID} placeholder="Enter Sri Lanka Nurse Council Registration Number" />
                                                </Form.Group>

                                                <Form.Group controlId="emailAd">
                                                    <Form.Label>E-mail Address</Form.Label>
                                                    <Form.Control type="email" value={this.state.nurseEmail} onChange={this.onChangeNurseEmail} placeholder="janedoe@example.com" />
                                                </Form.Group>

                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="Password">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" value={this.state.nursePW} onChange={this.onChangeNursePW} /> 
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="ConfirmPW">
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control type="password" value={this.state.nurseCPW} onChange={this.onChangeNurseCPW} placeholder="Re-Enter Your Password Here" /> 
                                                    </Form.Group>
                                                </Form.Row>

                                                <Form.Group controlId="homeAd">
                                                    <Form.Label>Address</Form.Label>
                                                    <Form.Control type="textarea" value={this.state.nurseHome} onChange={this.onChangeNurseHome} />
                                                </Form.Group>

                                                <Form.Group controlId="telNo">
                                                    <Form.Label>Telephone Number</Form.Label>
                                                    <Form.Control type="text" value={this.state.nurseTel} onChange={this.onChangeNurseTel} />
                                                </Form.Group>

                                                <Button variant="primary" onClick={this.onSubmitNurse.bind(this)}>Submit</Button>
                                                </Form>
                                            </Modal>
                                        </span>
                                    </td>

                                    <td>
                                        <span>
                                            <input type="button" class="btn btn-secondary btn-lg" value="I WANT A NURSE" onClick={() => this.openModal1()} />
                                            <Modal visible={this.state.visible1} width="50%" height="85%" effect="fadeInUp" onClickAway={() => this.closeModal1()}>
                                           
                                                <Form className="form-margin">
                                                    <h4>Create a CareMe account</h4>
                                                    <br/>
                                                    <div class="form-group row">
                                                        <label for="firstname" class="col-sm-2 col-form-label">Frist Name</label>
                                                            <div class="col-sm-10">
                                                                <input type="text" class="form-control" id="firstname"/>
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="lastname" class="col-sm-2 col-form-label">Last Name</label>
                                                            <div class="col-sm-10">
                                                                <input type="text" class="form-control" id="lastname"/>
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="emailaddress" class="col-sm-2 col-form-label">E-mail</label>
                                                            <div class="col-sm-10">
                                                                <input type="email" class="form-control" id="emailaddress"/>
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="password" class="col-sm-2 col-form-label">Password</label>
                                                            <div class="col-sm-10">
                                                                <input type="password" class="form-control" id="password"/>
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="re-enter password" class="col-sm-2 col-form-label">Re-enter Password</label>
                                                            <div class="col-sm-10">
                                                                <input type="password" class="form-control" id="repassword"/>
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="address" class="col-sm-2 col-form-label">Address</label>
                                                            <div class="col-sm-10">
                                                                <input type="text" class="form-control" id="address"/>
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="telephone" class="col-sm-2 col-form-label">Telephone</label>
                                                            <div class="col-sm-10">
                                                                <input type="text" class="form-control" id="telephone"/>
                                                            </div>
                                                    </div>

                                                    <Button variant="primary" type="submit">Submit</Button>

                                                    
                                                </Form>
                                            </Modal>
                                        </span>
                                    </td></tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default IntroBanner;