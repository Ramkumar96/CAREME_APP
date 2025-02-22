import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Navigationbar.css';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import Modal from 'react-awesome-modal';
import { Button, Form } from 'react-bootstrap';
import axios from "../../../../backend/node_modules/axios";
import md5 from 'md5';

//checks whether both fields have been filled before submitting
function validate (Email, Password){
    return {
        Email: Email.length == 0,
        Password: Password.length === 0
    };
}

function validateEmail(email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
}

class Navigationbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            Email: '',
            Password: '',
            redirect_profile: false,
            user_type: null,
            chatting_token: null,

            touched: {
                Email: false,
                Password: false
            }
        }
    }

    /** 
     * @desc: Function to open Login Modal
     */
    openLoginModal = () => {
        this.setState({
            visible: true
        });
    }

    /** 
     * @desc: Function to close Login Modal
     */
    closeModal() {
        this.setState({
            visible: false,
            Email: '',
            Password: '',
            touched: {
                Email: false,
                Password: false
            }
        });
    }

    /** 
     * @desc: Validation of Email and handling blur
     */
    canBeSubmitted() {
        const errors = validate(this.state.Email, this.state.Password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    /** 
     * @desc: Function to get changing values from the 
     * feild and assign to Email and password
     */
    handleOnChange = (e) => {
        console.log(e.target.name,"=",e.target.value);
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }

    handleBlur = field => e => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    };

    /**
     * * @desc :Login function getting the data from the login fileds and sending 
     * to backend and cross check email and password for login
     * @output : Redirect pages will be set to according to User type also datas are stored in local storage
     */
    onLogin = (e) => {
        e.preventDefault();
        // console.log(this.state)

        if (!this.canBeSubmitted()) {
            e.preventDefault();
            return;
        }

        //validates the email address syntax through the validateEmail function
        if (!validateEmail(this.state.Email)){
            alert("Enter valid email address");
            this.setState({
                Email: '',
                Password: '',
                touched: {
                    Email: false,
                    Password: false
                }
            })
            return;
        }

        /** 
         * @desc: creating a object data and sending to backend
         */
        const data = {
            Email: this.state.Email,
            Password: this.state.Password
        };
        // console.log(data
        
        const headers = {
            'Content-Type': 'application/json'
        }
        var hashedPW = md5(this.state.Password);

        //checks whether the email is a registered email address in the database
        axios.post('http://localhost:4000/user/validEmail', data, {headers:headers})
        .then(res => {
            if(res.data.success){
                const obj = {
                    Email: this.state.Email,
                    Password: hashedPW
                };

                console.log(obj);
                 /**
                     * @desc :Passes obj object includes Email,password to backend to compare
                     * emails and passwords exists in the databse for login
                     * @output :captures the user details from the backend if Email and passwords are matched  
                     */
                axios.post('http://localhost:4000/user/login', obj,{headers:headers})
                    .then(response => {
                        console.log(response.data)
                        if (response.data.success) {
                            console.log(response.data.user_data)
                              /**
                                * @desc:set the items received from backend to local storage
                                */
                            localStorage.setItem("id", response.data.user_data._id)
                            localStorage.setItem("user_id", response.data.user_data.userID)
                            localStorage.setItem("user_name", response.data.user_data.FirstName)
                            localStorage.setItem("user_lname", response.data.user_data.LastName);
                            localStorage.setItem("user_Email", response.data.user_data.Email)
                            localStorage.setItem("user_pic", response.data.profilePic)
                            localStorage.setItem("chat_token", response.data.chat_token)
                            this.setState({
                                redirect_profile: true,
                                user_type:response.data.user_data.userID
                            })
                        }

                        //if not matched, displays an error alert
                        else if (!response.data.success) {
                            alert("Email or password is invalid");
                            this.setState ({
                                Password: '',
                                touched: {
                                    Password:false
                                }
                            });
                        }
                    })
            }

            //This loop is executed if the email address is not registered in the user database
            else if (!res.data.success){
                const obj = {
                    Email: this.state.Email,
                    Password: hashedPW
                };

                //checks whether the exact same email and corresponding password are available in the deactivated collection
                axios.post('http://localhost:4000/userDeac/validEmail', obj,{headers:headers})
                    .then(response => {
                        if (response.data.success){
                            //console.log(response.data)
                            alert("Your account has been deactivated. Click on re-activate account to join back.");

                            this.setState({
                                Email: '',
                                Password : '',
                                touched : {
                                    Email : false,
                                    Password : false
                                }
                            });
                        }

                        //else it displays the not registered alert and prompts the guest to register in the system
                        else {
                            alert("Email address not registered");
                            this.setState({
                                Email: '',
                                Password: '',
                                touched: {
                                    Email: false,
                                    Password: false
                                }
                            });
                        }
                    })
            }
        });        

    }


    /** 
     * @desc: Function for Reactivation
     */
    onReactivate = (e) => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        var hashedPW = md5(this.state.Password);

        const data = {
            Email: this.state.Email,
            Password: hashedPW
        };

        //checks whether the entered email and password match one document in the deactivated user collection
        axios.post('http://localhost:4000/userDeac/validEmail', data, {headers:headers})

            .then(response => {
                if (response.data.success) {
                    this.setState({
                        user_data: response.data.user_data,
                    })

                    if (this.state.user_data.userID == 0) {
                        var object = {
                            Email: this.state.user_data.Email,
                            FirstName: this.state.user_data.FirstName,
                            LastName: this.state.user_data.LastName,
                            NIC: this.state.user_data.NIC,
                            nurseID: this.state.user_data.nurseID,
                            Home: this.state.user_data.Home,
                            Tel: this.state.user_data.Tel,
                            userID: this.state.user_data.userID,
                            PW: this.state.user_data.PW,
                            CPW: this.state.user_data.CPW,
                            RegDate: this.state.user_data.RegDate,
                            DeacDate: this.state.user_data.DeacDate,
                            ReacDate: new Date(),
                            profilePic: 'http://localhost:4000/public/sampleimage.jpeg'
                        };
                    }

                    if (this.state.user_data.userID == 1) {
                        var object = {
                            Email: this.state.user_data.Email,
                            FirstName: this.state.user_data.FirstName,
                            LastName: this.state.user_data.LastName,
                            NIC: this.state.user_data.NIC,
                            Home: this.state.user_data.Home,
                            Tel: this.state.user_data.Tel,
                            userID: this.state.user_data.userID,
                            PW: this.state.user_data.PW,
                            CPW: this.state.user_data.CPW,
                            RegDate: this.state.user_data.RegDate,
                            DeacDate: this.state.user_data.DeacDate,
                            ReacDate: new Date(),
                            profilePic: 'http://localhost:4000/public/sampleimage.jpeg'
                        };
                    }

                    const obj = object;
                    console.log(this.state.user_data.userID);

                    //checks whether another email has been registered in the system while the account was deactivated
                    axios.post('http://localhost:4000/user/validEmail', obj, { headers: headers })
                        .then(res => {
                            if (res.data.success) {
                                alert("Email already registered. Please use another Email Address");

                                this.setState({
                                    Email: '',
                                    Password: '',
                                    visible: false,
                                    touched: {
                                        Email: false,
                                        Password: false
                                    }
                                });
                            }

                            //verifying as unregistered nurse ID
                            else if (!res.data.success && this.state.user_data.userID == 0) {
                                axios.post('http://localhost:4000/user/validNurseID', obj, { headers: headers })
                                    .then(response => {
                                        if (res.data.success) {
                                            alert("Your Nurse Council ID is already registered");
                                        }

                                        //adding new user to the database
                                        else if (!res.data.success) {
                                            axios.post('http://localhost:4000/user/add', obj)
                                                .then(res => {
                                                    //console.log(res.data) 
                                                    console.log("Registered Again");

                                                    axios.post('http://localhost:4000/userDeac/delete', obj)
                                                        .then(response => {
                                                            if (response.data.success) {
                                                                console.log("Account reactivated");
                                                                alert(`Succesfully Reactivated`);
                                                            }
                                                        });
                                                });

                                            this.setState({
                                                Email: '',
                                                Password: '',
                                                visible: false,
                                                touched: {
                                                    Email: false,
                                                    Password: false
                                                }
                                            });
                                        }
                                    });
                            }

                            else if (!res.data.success && this.state.user_data.userID == 1) {
                                axios.post('http://localhost:4000/user/add', obj)
                                    .then(res => {
                                        //console.log(res.data) 
                                        console.log("Registered again");

                                        axios.post('http://localhost:4000/userDeac/delete', obj)
                                            .then(response => {
                                                if (response.data.success) {
                                                    console.log("Account reactivated");
                                                    alert(`Succesfully Reactivated`);

                                                    this.setState({
                                                        Email: '',
                                                        Password: '',
                                                        visible: false,
                                                        touched: {
                                                            Email: false,
                                                            Password: false
                                                        }
                                                    });
                                                }
                                            });
                                    });

                                this.setState({
                                    Email: '',
                                    Password: '',
                                    visible: false,
                                    touched: {
                                        Email: false,
                                        Password: false
                                    }
                                });
                            }
                        });
                }

                //urges the user to login or register, since no details are available in the deactivated user collection
                else if (!response.data.success){
                    alert("Try logging into your account if youre registered. If not please register yourself");

                    this.setState({
                        Email: '',
                        Password: '',
                        visible: false,
                        touched: {
                            Email: false,
                            Password: false
                        }
                    });
                }
            });
    }


    render() {
        const errors = validate(this.state.Email, this.state.Password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;
        };


        /** 
         * @desc: Redirection pages willbe set according to usertypes
         */
        if (this.state.redirect_profile == true) {
            if (this.state.user_type === 0) {
                return (

                    <Redirect to="/nurseprofile" />
                )
            }
            if (this.state.user_type === 1) {
                return (

                    <Redirect to="/clientprofile" />
                )
            }
            if (this.state.user_type === 2) {
                return (

                    <Redirect to="/adminmaindash" />
                )
            }

        }
        return (
            <React.Fragment>
                <nav class="navbar navbar-light bg-light">
                    {/* navigation bar brand logo */}
                    <a class="navbar-brand" href="/">
                        <img src="/images/careme.png" width="120" height="30" class="d-inline-block align-top" alt="mainlogo" />
                    </a>
                    <div >
                        <table align="center">
                            <tr>
                                <td>
                                    {/* Navbar login button */}
                                    <input type="button" class="btn btn-outline-primary" value="Login" onClick={() => this.openLoginModal()} />
                                    {/* Login modal */}
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
                                                        className={shouldMarkError("Email") ? "error" : ""}
                                                        type="email"
                                                        placeholder="janedoe@example.com"
                                                        name="Email"
                                                        value={this.state.Email}
                                                        onChange={this.handleOnChange}
                                                        onBlur={this.handleBlur("Email")}
                                                    />
                                                </Form.Group>

                                                <Form.Group controlId="Password">
                                                    <Form.Label>Password</Form.Label>
                                                    <div class="input-group-text">
                                                        <span class="fas fa-lock"></span>
                                                    </div>
                                                    <Form.Control
                                                        className={shouldMarkError("Password") ? "error" : ""}
                                                        type="Password"
                                                        placeholder="Enter Your Password Here"
                                                        name="Password"
                                                        value={this.state.Password}
                                                        onChange={this.handleOnChange}
                                                        onBlur={this.handleBlur("Password")}
                                                    />
                                                </Form.Group>
                                                <center>
                                                    <Button variant="btn btn-success" disabled={isDisabled} onClick={this.onLogin} type="submit">Login</Button>
                                                    <Button variant="btn btn-warning" disabled={isDisabled} onClick={this.onReactivate} type="submit">Reactivate</Button>
                                                </center>
                                            </Form>
                                        </div>
                                    </Modal>
                                </td>
                                <td>
                                    {/* navbar Find Nurse Button */}
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