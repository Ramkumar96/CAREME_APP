import React, { Component } from "react";
import "./IntroBanner.css";
//import { BrowserRouter as Router, Link } from "react-router-dom";
import Modal from 'react-awesome-modal';
import { Button, Form, Col } from 'react-bootstrap';
import axios from './../../../../backend/node_modules/axios';

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

        this.onChangeClientFirstName = this.onChangeClientFirstName.bind(this);
        this.onChangeClientLastName = this.onChangeClientLastName.bind(this);
        this.onChangeClientEmail = this.onChangeClientEmail.bind(this);
        this.onChangeClientPW = this.onChangeClientPW.bind(this);
        this.onChangeClientCPW = this.onChangeClientCPW.bind(this);
        this.onChangeClientHome = this.onChangeClientHome.bind(this);
        this.onChangeClientTel = this.onChangeClientTel.bind(this);
        this.onSubmitClient = this.onSubmitClient.bind(this);

        this.state = {
            visible : false,
            visible1 : false
        }
    }

    onChangeNurseFirstName(e){
        this.setState({
            nurseFirstName : e.target.value
        });
    }

    onChangeNurseLastName(e){
        this.setState({
            nurseLastName : e.target.value
        });
    }

    onChangeNurseID(e){
        this.setState({
            nurseID : e.target.value
        });
    }

    onChangeNurseEmail(e){
        this.setState({
            nurseEmail : e.target.value
        });
    }

    onChangeNursePW(e){
        this.setState({
            nursePW : e.target.value
        });
    }

    onChangeNurseCPW(e){
        this.setState({
            nurseCPW : e.target.value
        });
    }

    onChangeNurseHome(e){
        this.setState({
            nurseHome : e.target.value
        });
    }

    onChangeNurseTel(e){
        this.setState({
            nurseTel : e.target.value
        });
    }

    onSubmitNurse(e){
        e.preventDefault();
        const obj = {
            nurseFirstName: this.state.nurseFirstName,
            nurseLastName: this.state.nurseLastName,
            nurseID: this.state.nurseID,
            nurseEmail: this.state.nurseEmail,
            nursePW: this.state.nursePW,
            nurseCPW: this.state.nurseCPW,
            nurseHome: this.state.nurseHome,
            nurseTel: this.state.nurseTel,
            userID : 0
          };
          axios.post('http://localhost:4000/user/add', obj)
              .then(res => console.log(res.data));

        this.setState({
            nurseFirstName: '',
            nurseLastName: '',
            nurseID: '',
            nurseEmail: '',
            nursePW: '',
            nurseCPW: '',
            nurseHome: '',
            nurseTel: '',
            visible : false
        });
    }
    
    //client details

    onChangeClientFirstName(e){
        this.setState({
            clientFirstName : e.target.value
        });
    }

    onChangeClientLastName(e){
        this.setState({
            clientLastName : e.target.value
        });
    }

    onChangeClientEmail(e){
        this.setState({
            clientEmail : e.target.value
        });
    }

    onChangeClientPW(e){
        this.setState({
            clientPW : e.target.value
        });
    }

    onChangeClientCPW(e){
        this.setState({
            clientCPW : e.target.value
        });
    }

    onChangeClientHome(e){
        this.setState({
            clientHome : e.target.value
        });
    }

    onChangeClientTel(e){
        this.setState({
            clientTel : e.target.value
        });
    }

    onSubmitClient(e){
        e.preventDefault();
        const obj = {
            clientFirstName: this.state.clientFirstName,
            clientLastName: this.state.clientLastName,
            clientEmail: this.state.clientEmail,
            clientPW: this.state.clientPW,
            clientCPW: this.state.clientCPW,
            clientHome: this.state.clientHome,
            clientTel: this.state.clientTel,
            userID: 1
          };
          axios.post('http://localhost:4000/user/add', obj)
              .then(res => console.log(res.data));

        this.setState({
            clientFirstName: '',
            clientLastName: '',
            clientEmail: '',
            clientPW: '',
            clientCPW: '',
            clientHome: '',
            clientTel: '',
            visible1 : false
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
                                                <Form >                                                    
                                                 <Form.Row>
                                                    <Form.Group as={Col} controlId="validationCustom01">
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control
                                                        required 
                                                        type="text" 
                                                        value={this.state.nurseFirstName} 
                                                        onChange={this.onChangeNurseFirstName} 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback> 
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="validationCustom02">
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="text" 
                                                        value={this.state.nurseLastName} 
                                                        onChange={this.onChangeNurseLastName} 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback> 
                                                    </Form.Group>
                                                </Form.Row>
                            
                                                <Form.Group controlId="validationCustom03">
                                                    <Form.Label>Nurse Council Registration Number</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="text" 
                                                        value={this.state.nurseID} 
                                                        onChange={this.onChangeNurseID} 
                                                        placeholder="Enter Sri Lanka Nurse Council Registration Number" 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group controlId="formGridEmail">
                                                    <Form.Label>E-mail Address</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="email" 
                                                        value={this.state.nurseEmail} 
                                                        onChange={this.onChangeNurseEmail} 
                                                        placeholder="janedoe@example.com" 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="formGridPassword01">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="password" 
                                                        value={this.state.nursePW} 
                                                        onChange={this.onChangeNursePW} 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback> 
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="formGridPassword02">
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="password" 
                                                        value={this.state.nurseCPW} 
                                                        onChange={this.onChangeNurseCPW} 
                                                        placeholder="Re-Enter Your Password Here" 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback> 
                                                    </Form.Group>
                                                </Form.Row>

                                                <Form.Group controlId="validationCustom04">
                                                    <Form.Label>Address</Form.Label>
                                                    <Form.Control required
                                                        type="textarea" 
                                                        value={this.state.nurseHome} 
                                                        onChange={this.onChangeNurseHome} 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group controlId="validationCustom05">
                                                    <Form.Label>Telephone Number</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="text" 
                                                        value={this.state.nurseTel} 
                                                        onChange={this.onChangeNurseTel} 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Button type="submit" variant="primary" onClick={this.onSubmitNurse.bind(this)}>Submit</Button>
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
                                                                <input type="text" class="form-control" id="firstname" value={this.state.clientFirstName} onChange={this.onChangeClientFirstName}/>
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="lastname" class="col-sm-2 col-form-label">Last Name</label>
                                                            <div class="col-sm-10">
                                                                <input type="text" class="form-control" id="lastname" value={this.state.clientLastName} onChange={this.onChangeClientLastName}/>
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="emailaddress" class="col-sm-2 col-form-label">E-mail</label>
                                                            <div class="col-sm-10">
                                                                <input type="email" class="form-control" id="emailaddress" value={this.state.clientEmail} onChange={this.onChangeClientEmail}/>
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="password" class="col-sm-2 col-form-label">Password</label>
                                                            <div class="col-sm-10">
                                                                <input type="password" class="form-control" id="password" value={this.state.clientPW} onChange={this.onChangeClientPW}/>
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="re-enter password" class="col-sm-2 col-form-label">Re-enter Password</label>
                                                            <div class="col-sm-10">
                                                                <input type="password" class="form-control" id="repassword" value={this.state.clientCPW} onChange={this.onChangeClientCPW}/>
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="address" class="col-sm-2 col-form-label">Address</label>
                                                            <div class="col-sm-10">
                                                                <input type="text" class="form-control" id="address" value={this.state.clientHome} onChange={this.onChangeClientHome}/>
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="telephone" class="col-sm-2 col-form-label">Telephone</label>
                                                            <div class="col-sm-10">
                                                                <input type="text" class="form-control" id="telephone" value={this.state.clientTel} onChange={this.onChangeClientTel}/>
                                                            </div>
                                                    </div>

                                                    <Button variant="primary" type="submit" onClick={this.onSubmitClient.bind(this)}>Submit</Button>

                                                    
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