import React, { Component } from "react";
import "./IntroBanner.css";
import { BrowserRouter as Router,Link,Redirect } from "react-router-dom";
import Modal from 'react-awesome-modal';
import { Button, Form, Col } from 'react-bootstrap';
import axios from './../../../../backend/node_modules/axios';

class IntroBanner extends Component{
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeNurseID = this.onChangeNurseID.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePW = this.onChangePW.bind(this);
        this.onChangeCPW = this.onChangeCPW.bind(this);
        this.onChangeHome = this.onChangeHome.bind(this);
        this.onChangeTel = this.onChangeTel.bind(this);
        this.onSubmitNurse = this.onSubmitNurse.bind(this);
        this.onSubmitClient = this.onSubmitClient.bind(this);

        this.state = {
            visible : false,
            visible1 : false
        }
    }

    onChangeFirstName(e){
        this.setState({
            FirstName : e.target.value
        });
    }

    onChangeLastName(e){
        this.setState({
            LastName : e.target.value
        });
    }

    onChangeNurseID(e){
        this.setState({
            nurseID : e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            Email : e.target.value
        });
    }

    onChangePW(e){
        this.setState({
            PW : e.target.value
        });
    }

    onChangeCPW(e){
        this.setState({
            CPW : e.target.value
        });
    }

    onChangeHome(e){
        this.setState({
            Home : e.target.value
        });
    }

    onChangeTel(e){
        this.setState({
            Tel : e.target.value
        });
    }

    onSubmitNurse(e){
        e.preventDefault();
        const obj = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            nurseID: this.state.nurseID,
            Email: this.state.Email,
            PW: this.state.PW,
            CPW: this.state.CPW,
            Home: this.state.Home,
            Tel: this.state.Tel,
            userID : 0
          };
          axios.post('http://localhost:4000/user/add', obj)
              .then(res => console.log(res.data));

        this.setState({
            FirstName: '',
            LastName: '',
            nurseID: '',
            Email: '',
            PW: '',
            CPW: '',
            Home: '',
            Tel: '',
            visible : false
        });
    }
    
    //client details
    onSubmitClient(e){
        e.preventDefault();
        const obj = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            PW: this.state.PW,
            CPW: this.state.CPW,
            Home: this.state.Home,
            Tel: this.state.Tel,
            userID: 1
          };
          axios.post('http://localhost:4000/user/add', obj)
              .then(res => console.log(res.data));

        this.setState({
            FirstName: '',
            LastName: '',
            Email: '',
            PW: '',
            CPW: '',
            Home: '',
            Tel: '',
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
        const isValidnursePW = this.state.nursePW > 6;
        
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
                                                    <Form.Group as={Col}>
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control
                                                        required 
                                                        type="text" 
                                                        value={this.state.FirstName} 
                                                        onChange={this.onChangeFirstName} 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback> 
                                                    </Form.Group>

                                                    <Form.Group as={Col}>
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="text" 
                                                        value={this.state.LastName} 
                                                        onChange={this.onChangeLastName} 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback> 
                                                    </Form.Group>
                                                </Form.Row>
                            
                                                <Form.Group>
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

                                                <Form.Group>
                                                    <Form.Label>E-mail Address</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="email" 
                                                        value={this.state.Email} 
                                                        onChange={this.onChangeEmail} 
                                                        placeholder="janedoe@example.com" 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Row>
                                                    <Form.Group as={Col}>
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="password" 
                                                        value={this.state.PW} 
                                                        onChange={this.onChangePW}
                                                    />
                                                    </Form.Group>

                                                    <Form.Group as={Col}>
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="password" 
                                                        value={this.state.CPW} 
                                                        onChange={this.onChangeCPW} 
                                                        placeholder="Re-Enter Your Password Here" 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback> 
                                                    </Form.Group>
                                                </Form.Row>

                                                <Form.Group>
                                                    <Form.Label>Address</Form.Label>
                                                    <Form.Control required
                                                        type="textarea" 
                                                        value={this.state.Home} 
                                                        onChange={this.onChangeHome} 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label>Telephone Number</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="text" 
                                                        value={this.state.Tel} 
                                                        onChange={this.onChangeTel} 
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
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control" 
                                                                    value={this.state.FirstName} 
                                                                    onChange={this.onChangeFirstName}
                                                                />
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="lastname" class="col-sm-2 col-form-label">Last Name</label>
                                                            <div class="col-sm-10">
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control" 
                                                                    value={this.state.LastName} 
                                                                    onChange={this.onChangeLastName}
                                                                />
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="emailaddress" class="col-sm-2 col-form-label">E-mail</label>
                                                            <div class="col-sm-10">
                                                                <input 
                                                                    type="email" 
                                                                    class="form-control"
                                                                    value={this.state.Email} 
                                                                    onChange={this.onChangeEmail}
                                                                />
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="password" class="col-sm-2 col-form-label">Password</label>
                                                            <div class="col-sm-10">
                                                                <input 
                                                                    type="password" 
                                                                    class="form-control" 
                                                                    value={this.state.PW} 
                                                                    onChange={this.onChangePW}
                                                                />
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="re-enter password" class="col-sm-2 col-form-label">Re-enter Password</label>
                                                            <div class="col-sm-10">
                                                                <input 
                                                                    type="password" 
                                                                    class="form-control"
                                                                    value={this.state.CPW} 
                                                                    onChange={this.onChangeCPW}
                                                                />
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="address" class="col-sm-2 col-form-label">Address</label>
                                                            <div class="col-sm-10">
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control"
                                                                    value={this.state.Home} 
                                                                    onChange={this.onChangeHome}
                                                                />
                                                            </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="telephone" class="col-sm-2 col-form-label">Telephone</label>
                                                            <div class="col-sm-10">
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control"
                                                                    value={this.state.Tel} 
                                                                    onChange={this.onChangeTel}
                                                                />
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