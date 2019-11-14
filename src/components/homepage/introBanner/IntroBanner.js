import React, { Component } from "react";
import "./IntroBanner.css";
import Modal from 'react-awesome-modal';
import { Button, Form, Col } from 'react-bootstrap';
import axios from './../../../../backend/node_modules/axios';

function validate (Email, FirstName, LastName, nurseID, PW, CPW, Home, Tel){
    return {
        Email: Email.length===0,
        FirstName: FirstName.length===0,
        LastName: LastName.length===0,
        nurseID: nurseID.length===0,
        PW: PW.length===0,
        CPW: CPW.length===0,
        Home: Home.length===0,
        Tel: Tel.length===0
    };
}

function validate1 (Email, FirstName, LastName, PW, CPW, Home, Tel){
    return {
        Email: Email.length===0,
        FirstName: FirstName.length===0,
        LastName: LastName.length===0,
        PW: PW.length===0,
        CPW: CPW.length===0,
        Home: Home.length===0,
        Tel: Tel.length===0
    };
}

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
            visible1 : false,
            Email: '',
            FirstName: '',
            LastName: '',
            nurseID: '',
            PW: '',
            CPW: '',
            Home: '',
            Tel: '',

            touched : {
                Email: false,
                FirstName: false,
                LastName:false,
                nurseID: false,
                PW: false,
                CPW: false,
                Home: false,
                Tel: false
            }
        };
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

    handleBlur = field => e => {
        this.setState({
          touched: { ...this.state.touched, [field]: true }
        });
    };

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
            userID : 0,
            Location : null,
            Age : null,
            nurseExp : null,
            nurseType : null
        };

        if (!this.canBeSubmitted()) {
            e.preventDefault();
            return;
        }
        
        const { PW, CPW } = this.state;

        if ( PW != CPW){
            alert("Your passwords dont match");
        }
        
        else {
            const { FirstName, LastName, nurseID, Email, PW, CPW, Home, Tel } = this.state;
            alert(`Succesfully Registered`);      
            
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
    }

    canBeSubmitted() {
        const errors = validate(this.state.Email, this.state.FirstName, this.state.LastName, this.state.nurseID, this.state.PW, this.state.CPW, this.state.Home, this.state.Tel);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
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
            userID: 1,
            Location : null,
            Age : null
        };

        if (!this.canBeSubmitted1()) {
            e.preventDefault();
            return;
        }

        const { PW, CPW } = this.state;

        if ( PW != CPW){
            alert("Your passwords dont match");
        }

        else {
            const { FirstName, LastName, Email, PW, CPW, Home, Tel } = this.state;
            alert(`Succesfully Registered`); 

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
    }

    canBeSubmitted1() {
        const errors1 = validate1(this.state.Email, this.state.FirstName, this.state.LastName, this.state.PW, this.state.CPW, this.state.Home, this.state.Tel);
        const isDisabled1 = Object.keys(errors1).some(x => errors1[x]);
        return !isDisabled1;
    }

    openModal() {
        this.setState({
            visible : true
        });
    }
    
    closeModal() {
        this.setState({
            visible : false,
            FirstName: '',
            LastName: '',
            nurseID: '',
            Email: '',
            PW: '',
            CPW: '',
            Home: '',
            Tel: '',

            touched : {
                Email: false,
                FirstName: false,
                LastName:false,
                nurseID: false,
                PW: false,
                CPW: false,
                Home: false,
                Tel: false
            }
        });
    }

    openModal1() {
        this.setState({
            visible1 : true
        });
    }
  
    closeModal1() {
        this.setState({
            visible1 : false,
            FirstName: '',
            LastName: '',
            Email: '',
            PW: '',
            CPW: '',
            Home: '',
            Tel: '',

            touched : {
                Email: false,
                FirstName: false,
                LastName:false,
                PW: false,
                CPW: false,
                Home: false,
                Tel: false
            }
        });
    }

    render(){
        const errors = validate(this.state.Email, this.state.FirstName, this.state.LastName, this.state.nurseID, this.state.PW, this.state.CPW, this.state.Home, this.state.Tel);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        const errors1 = validate1(this.state.Email, this.state.FirstName, this.state.LastName, this.state.PW, this.state.CPW, this.state.Home, this.state.Tel);
        const isDisabled1 = Object.keys(errors1).some(x => errors1[x]);

        const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
      
            return hasError ? shouldShow : false;
        };      

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
                                                    <Form.Group as={Col}>
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control
                                                        className={shouldMarkError("FirstName") ? "error" : ""}
                                                        type="text" 
                                                        value={this.state.FirstName} 
                                                        onChange={this.onChangeFirstName} 
                                                        onBlur={this.handleBlur("FirstName")}
                                                        required
                                                    />
                                                    </Form.Group>

                                                    <Form.Group as={Col}>
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control 
                                                        className={shouldMarkError("LastName") ? "error" : ""}
                                                        required
                                                        type="text" 
                                                        value={this.state.LastName} 
                                                        onChange={this.onChangeLastName} 
                                                        onBlur={this.handleBlur("LastName")}
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback> 
                                                    </Form.Group>
                                                </Form.Row>
                            
                                                <Form.Group>
                                                    <Form.Label>Nurse Council Registration Number</Form.Label>
                                                    <Form.Control
                                                        className={shouldMarkError("nurseID") ? "error" : ""} 
                                                        required
                                                        type="text" 
                                                        value={this.state.nurseID} 
                                                        onChange={this.onChangeNurseID} 
                                                        onBlur={this.handleBlur("nurseID")}
                                                        placeholder="Enter Sri Lanka Nurse Council Registration Number" 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label>E-mail Address</Form.Label>
                                                    <Form.Control 
                                                        className={shouldMarkError("Email") ? "error" : ""}
                                                        type="email" 
                                                        value={this.state.Email} 
                                                        onChange={this.onChangeEmail} 
                                                        onBlur={this.handleBlur("Email")}
                                                        placeholder="janedoe@example.com" 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Row>
                                                    <Form.Group as={Col}>
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control
                                                        className={shouldMarkError("PW") ? "error" : ""}
                                                        required
                                                        type="password" 
                                                        value={this.state.PW} 
                                                        onChange={this.onChangePW}
                                                        onBlur={this.handleBlur("PW")}
                                                    />
                                                    </Form.Group>

                                                    <Form.Group as={Col}>
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control 
                                                        className={shouldMarkError("CPW") ? "error" : ""}
                                                        required
                                                        type="password" 
                                                        value={this.state.CPW} 
                                                        onChange={this.onChangeCPW} 
                                                        onBlur={this.handleBlur("CPW")}
                                                        placeholder="Re-Enter Your Password Here" 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback> 
                                                    </Form.Group>
                                                </Form.Row>

                                                <Form.Group>
                                                    <Form.Label>Address</Form.Label>
                                                    <Form.Control 
                                                        className={shouldMarkError("Address") ? "error" : ""}
                                                        required
                                                        type="textarea" 
                                                        value={this.state.Home} 
                                                        onChange={this.onChangeHome} 
                                                        onBlur={this.handleBlur("Address")}
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label>Telephone Number</Form.Label>
                                                    <Form.Control 
                                                        className={shouldMarkError("Tel") ? "error" : ""}
                                                        required
                                                        type="text" 
                                                        value={this.state.Tel} 
                                                        onChange={this.onChangeTel}
                                                        onBlur={this.handleBlur("Tel")} 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Button type="submit" variant="primary" disabled={isDisabled} onClick={this.onSubmitNurse.bind(this)}>Submit</Button>
                                                </Form>
                                            </Modal>
                                        </span>
                                    </td>

                                    <td>
                                        <span>
                                            <input type="button" class="btn btn-secondary btn-lg" value="I WANT A NURSE" onClick={() => this.openModal1()} />
                                            <Modal visible={this.state.visible1} width="50%" height="87%" effect="fadeInUp" onClickAway={() => this.closeModal1()}>
                                                <h1>Register Here</h1>
                                                <Form>                                                    
                                                 <Form.Row>
                                                    <Form.Group as={Col}>
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control
                                                        className={shouldMarkError("FirstName") ? "error" : ""}
                                                        type="text" 
                                                        value={this.state.FirstName} 
                                                        onChange={this.onChangeFirstName} 
                                                        onBlur={this.handleBlur("FirstName")}
                                                        required
                                                    />
                                                    </Form.Group>

                                                    <Form.Group as={Col}>
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control 
                                                        className={shouldMarkError("LastName") ? "error" : ""}
                                                        required
                                                        type="text" 
                                                        value={this.state.LastName} 
                                                        onChange={this.onChangeLastName} 
                                                        onBlur={this.handleBlur("LastName")}
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback> 
                                                    </Form.Group>
                                                </Form.Row>
                            
                                                <Form.Group>
                                                    <Form.Label>E-mail Address</Form.Label>
                                                    <Form.Control 
                                                        className={shouldMarkError("Email") ? "error" : ""}
                                                        type="email" 
                                                        value={this.state.Email} 
                                                        onChange={this.onChangeEmail} 
                                                        onBlur={this.handleBlur("Email")}
                                                        placeholder="janedoe@example.com" 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Row>
                                                    <Form.Group as={Col}>
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control
                                                        className={shouldMarkError("PW") ? "error" : ""}
                                                        required
                                                        type="password" 
                                                        value={this.state.PW} 
                                                        onChange={this.onChangePW}
                                                        onBlur={this.handleBlur("PW")}
                                                    />
                                                    </Form.Group>

                                                    <Form.Group as={Col}>
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control 
                                                        className={shouldMarkError("CPW") ? "error" : ""}
                                                        required
                                                        type="password" 
                                                        value={this.state.CPW} 
                                                        onChange={this.onChangeCPW} 
                                                        onBlur={this.handleBlur("CPW")}
                                                        placeholder="Re-Enter Your Password Here" 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback> 
                                                    </Form.Group>
                                                </Form.Row>

                                                <Form.Group>
                                                    <Form.Label>Address</Form.Label>
                                                    <Form.Control 
                                                        className={shouldMarkError("Address") ? "error" : ""}
                                                        required
                                                        type="textarea" 
                                                        value={this.state.Home} 
                                                        onChange={this.onChangeHome} 
                                                        onBlur={this.handleBlur("Address")}
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label>Telephone Number</Form.Label>
                                                    <Form.Control 
                                                        className={shouldMarkError("Tel") ? "error" : ""}
                                                        required
                                                        type="text" 
                                                        value={this.state.Tel} 
                                                        onChange={this.onChangeTel}
                                                        onBlur={this.handleBlur("Tel")} 
                                                    />
                                                    <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                </Form.Group>

                                                <Button type="submit" variant="primary" disabled={isDisabled1} onClick={this.onSubmitClient.bind(this)}>Submit</Button>
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