
import React, { Component } from "react";
import classes from "./IntroBanner.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Modal from 'react-awesome-modal';
import { Button, Form, Col } from 'react-bootstrap';

class IntroBanner extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible : false
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
                <div class="container-fluid">
                    <div class="row max-height justify-content-center align-items-center">
                        <div class="col-10 mx-auto banner text-center">
                            <h1 class="text-capitalize">
                                <strong class="banner-title">Book Appointment with Expert Nurse in your Area</strong>
                            </h1>

                            <div>
                                {/* <span> <Link to={"/validateForm"} class="btn btn-primary btn-lg">I WANT A CLIENT</Link> </span>
                                <span> <Link to={"/clientForm"} class="btn btn-secondary btn-lg">I WANT A NURSE</Link></span> */}
                                
                                <span>
                                    <input type="button" class="btn btn-primary btn-lg" value="I WANT A CLIENT" onClick={() => this.openModal()} />
                                    <Modal visible={this.state.visible} width="50%" height="88%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                        <h1>Topic</h1>
                                        <Form>
                                            
                                        <Form.Group controlId="test">
                                        <p>hello</p>
                                            <hr/>
                                            </Form.Group>

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="FirstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter First Name" /> 
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="LastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Last Name" /> 
                                            </Form.Group>
                                        </Form.Row>

                    
                                        <Form.Group controlId="nurseid">
                                            <Form.Label>Nurse Council Registration Number</Form.Label>
                                            <Form.Control type="text" placeholder="Nurse Councile Number here*" />
                                        </Form.Group>

                                        <Form.Group controlId="emailAd">
                                            <Form.Label>E-mail Address</Form.Label>
                                            <Form.Control type="email" placeholder="janedoe@example.com" />
                                        </Form.Group>

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="Password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Your Password Here"/> 
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="ConfirmPW">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" placeholder="Re-Enter Your Password Here" /> 
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Group controlId="homeAd">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="textarea" placeholder="Address"/>
                                        </Form.Group>

                                        <Form.Group controlId="telNo">
                                            <Form.Label>Telephone Number</Form.Label>
                                            <Form.Control type="text" placeholder="07########" />
                                        </Form.Group>

                                        <Button variant="primary" type="submit">Submit</Button>
                                        </Form>
                                    </Modal>
                                </span>

                                <span>
                                    <input type="button" class="btn btn-primary btn-lg" value="I WANT A NURSE" onClick={() => this.openModal()} />
                                    <Modal visible={this.state.visible} width="50%" height="68%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                        
                                        <Form>
                                            
                                        <Form.Group controlId="test">
                                        <h1>Topic</h1>
                                            <hr/>
                                            </Form.Group>

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="FirstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter First Name" /> 
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="LastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Last Name" /> 
                                            </Form.Group>
                                        </Form.Row>

                    
 
                                        <Form.Group controlId="emailAd">
                                            <Form.Label>E-mail Address</Form.Label>
                                            <Form.Control type="email" placeholder="janedoe@example.com" />
                                        </Form.Group>

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="Password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Your Password Here"/> 
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="ConfirmPW">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" placeholder="Re-Enter Your Password Here" /> 
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Group controlId="homeAd">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="textarea" placeholder="Address"/>
                                        </Form.Group>

                                        <Form.Group controlId="telNo">
                                            <Form.Label>Telephone Number</Form.Label>
                                            <Form.Control type="text" placeholder="07########" />
                                        </Form.Group>

                                        <Button variant="primary" type="submit">Submit</Button>
                                        </Form>
                                    </Modal>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default IntroBanner;
