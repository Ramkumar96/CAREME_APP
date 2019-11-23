import React, { Component } from "react";
import "./IntroBanner.css";
import Modal from 'react-awesome-modal';
import { Button, Form, Col, ModalDialog } from 'react-bootstrap';
import axios from './../../../../backend/node_modules/axios';

//validating empty fields for Nurse
function validate(Email, FirstName, LastName, nurseID, PW, CPW, Home, Tel, NIC) {
    return {
        Email: Email.length === 0,
        FirstName: FirstName.length === 0,
        LastName: LastName.length === 0,
        nurseID: nurseID.length === 0,
        PW: PW.length === 0,
        CPW: CPW.length === 0,
        Home: Home.length === 0,
        Tel: Tel.length === 0,
        NIC: NIC.length === 0
    };
}

//validating empty fields for client
function validate1(Email, FirstName, LastName, PW, CPW, Home, Tel, NIC) {
    return {
        Email: Email.length === 0,
        FirstName: FirstName.length === 0,
        LastName: LastName.length === 0,
        PW: PW.length === 0,
        CPW: CPW.length === 0,
        Home: Home.length === 0,
        Tel: Tel.length === 0,
        NIC: NIC.length === 0
    };
}

//email syntax
function validateEmail(email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
}

//NIC syntax
function validateNIC(nic) {
    const regex = /^([0-9]{9})(V|v)$/;
    const regex2 = /^([0-9]{12})$/;

    if (regex.test(nic)) {
        return regex.test(nic);
    }

    else if (regex2.test(nic)) {
        return regex2.test(nic);
    }
}

//validate tel
function validateTel(tel) {
    const reg = /^(0)(7)([0-9]{8})$/;
    return reg.test(tel);
}

//validate password (minimum 6 characters, atleast one caps and one simple letter, one special character and one number)
function validatePassword(password) {
    const regpw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regpw.test(password);
}

class IntroBanner extends Component {
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
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onSubmitNurse = this.onSubmitNurse.bind(this);
        this.onSubmitClient = this.onSubmitClient.bind(this);

        this.state = {
            visible: false,
            visible1: false,
            Email: '',
            FirstName: '',
            LastName: '',
            nurseID: '',
            PW: '',
            CPW: '',
            Home: '',
            Tel: '',
            NIC: '',

            //to check whether any fields have been clicked on and skipped wiithout filling
            touched: {
                Email: false,
                FirstName: false,
                LastName: false,
                nurseID: false,
                PW: false,
                CPW: false,
                Home: false,
                Tel: false,
                NIC: false
            }
        };
    }

    onChangeFirstName(e) {
        const re = /^[A-Za-z\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ FirstName: e.target.value })
        }
    }

    onChangeLastName(e) {
        const re = /^[A-Za-z\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ LastName: e.target.value })
        }
    }

    onChangeNurseID(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ nurseID: e.target.value })
        }
    }

    onChangeEmail(e) {
        this.setState({
            Email: e.target.value
        });
    }

    onChangeNIC(e) {
        this.setState({
            NIC: e.target.value
        });
    }

    onChangePW(e) {
        this.setState({
            PW: e.target.value
        });
    }

    onChangeCPW(e) {
        this.setState({
            CPW: e.target.value
        });
    }

    onChangeHome(e) {
        this.setState({
            Home: e.target.value
        });
    }

    onChangeTel(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ Tel: e.target.value })
        }
    }

    handleBlur = field => e => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    };

    onSubmitNurse(e) {
        e.preventDefault();

        const obj = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            nurseID: this.state.nurseID,
            Email: this.state.Email,
            NIC: this.state.NIC,
            PW: this.state.PW,
            CPW: this.state.CPW,
            Home: this.state.Home,
            Tel: this.state.Tel,
            userID: 0,
            Location: null,
            Age: null,
            nurseExp: null,
            nurseType: null,
            nurseEdu: null,
            nurseUni: null,
            nurseGender: null,
            profilePic: null
        };

        if (!this.canBeSubmitted()) {
            e.preventDefault();
            return;
        }

        const { PW, CPW } = this.state;

        //email syntax validation
        if (!validateEmail(this.state.Email)) {
            alert("Enter valid email address");
        }

        //Password regex validation
        else if (!validatePassword(this.state.PW)) {
            alert("Enter valid password");
        }

        //NIC regex validation
        else if (!validateNIC(this.state.NIC)) {
            alert("Enter valid NIC number");
        }

        //password and confirm password match verification
        else if (PW != CPW) {
            alert("Your passwords dont match");
        }

        //validate telephone number
        else if (!validateTel(this.state.Tel)) {
            alert("Enter valid telephone number");
        }

        else {
            const headers = {
                'Content-Type': 'application/json'
            }

            //verifying as unregistered email
            axios.post('http://localhost:4000/user/validEmail', obj, { headers: headers })
                .then(res => {
                    if (res.data.success) {
                        alert("Email already registered. Please use another Email Address");
                    }

                    //verifying as unregistered nurse ID
                    else if (!res.data.success) {
                        axios.post('http://localhost:4000/user/validNurseID', obj, { headers: headers })
                            .then(response => {
                                if (response.data.success) {
                                    alert("Your Nurse Council ID is already registered");
                                }

                                //adding new user to the database
                                else if (!res.data.success) {
                                    axios.post('http://localhost:4000/user/add', obj)
                                        .then(res => { console.log(res.data) });
                                    console.log("Registered");
                                    alert(`Succesfully Registered`);

                                    this.setState({
                                        FirstName: '',
                                        LastName: '',
                                        nurseID: '',
                                        Email: '',
                                        NIC: '',
                                        PW: '',
                                        CPW: '',
                                        Home: '',
                                        Tel: '',
                                        visible: false,

                                        touched: {
                                            Email: false,
                                            FirstName: false,
                                            LastName: false,
                                            nurseID: false,
                                            PW: false,
                                            CPW: false,
                                            Home: false,
                                            Tel: false,
                                            NIC: false
                                        }
                                    });
                                }
                            });
                    }
                });
        }
    }

    canBeSubmitted() {
        const errors = validate(this.state.Email, this.state.FirstName, this.state.LastName, this.state.nurseID, this.state.PW, this.state.CPW, this.state.Home, this.state.Tel, this.state.NIC);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    //client details
    onSubmitClient(e) {
        e.preventDefault();

        const obj = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            PW: this.state.PW,
            CPW: this.state.CPW,
            Home: this.state.Home,
            Tel: this.state.Tel,
            NIC: this.state.NIC,
            userID: 1,
            Location: null,
            Age: null,
            profilePic: null
        };

        if (!this.canBeSubmitted1()) {
            e.preventDefault();
            return;
        }

        const { PW, CPW } = this.state;

        //email syntax validation
        if (!validateEmail(this.state.Email)) {
            alert("Enter valid email address");
        }

        //Password regex validation
        else if (!validatePassword(this.state.PW)) {
            alert("Enter valid password");
        }

        //NIC regex validation
        else if (!validateNIC(this.state.NIC)) {
            alert("Enter valid NIC number");
        }

        //confirming both passwords
        else if (PW != CPW) {
            alert("Your passwords dont match");
        }

        //validate telephone number
        else if (!validateTel(this.state.Tel)) {
            alert("Enter valid telephone number");
        }

        else {
            const headers = {
                'Content-Type': 'application/json'
            }

            //verifying whether email has been previously registered
            axios.post('http://localhost:4000/user/validEmail', obj, { headers: headers })
                .then(res => {
                    if (res.data.success) {
                        console.log('hariii');
                        alert("Email already registered. Please use another Email Address");
                    }

                    //adding new client to the database
                    else if (!res.data.success) {
                        axios.post('http://localhost:4000/user/add', obj)
                            .then(res => { console.log(res.data) });
                        console.log("Registered");
                        alert(`Succesfully Registered`);

                        this.setState({
                            FirstName: '',
                            LastName: '',
                            Email: '',
                            NIC: '',
                            PW: '',
                            CPW: '',
                            Home: '',
                            Tel: '',
                            visible1: false,
                            touched: {
                                Email: false,
                                FirstName: false,
                                LastName: false,
                                nurseID: false,
                                PW: false,
                                CPW: false,
                                Home: false,
                                Tel: false,
                                NIC: false
                            }
                        });
                    }
                });
        }
    }

    canBeSubmitted1() {
        const errors1 = validate1(this.state.Email, this.state.FirstName, this.state.LastName, this.state.PW, this.state.CPW, this.state.Home, this.state.Tel, this.state.NIC);
        const isDisabled1 = Object.keys(errors1).some(x => errors1[x]);
        return !isDisabled1;
    }

    onClickNurse() {
        this.closeModal();
    }

    onClickClient() {
        this.closeModal1();
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false,
            FirstName: '',
            LastName: '',
            nurseID: '',
            Email: '',
            NIC: '',
            PW: '',
            CPW: '',
            Home: '',
            Tel: '',

            touched: {
                Email: false,
                FirstName: false,
                LastName: false,
                nurseID: false,
                PW: false,
                CPW: false,
                Home: false,
                Tel: false,
                NIC: false
            }
        });
    }

    openModal1() {
        this.setState({
            visible1: true
        });
    }

    closeModal1() {
        this.setState({
            visible1: false,
            FirstName: '',
            LastName: '',
            Email: '',
            PW: '',
            CPW: '',
            Home: '',
            Tel: '',
            NIC: '',

            touched: {
                Email: false,
                FirstName: false,
                LastName: false,
                PW: false,
                CPW: false,
                Home: false,
                Tel: false,
                NIC: false
            }
        });
    }

    render() {
        //validating the fields in the nurse form whether filled or not
        const errors = validate(this.state.Email, this.state.FirstName, this.state.LastName, this.state.nurseID, this.state.PW, this.state.CPW, this.state.Home, this.state.Tel, this.state.NIC);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        //validating the fields in the nurse form whether filled or not
        const errors1 = validate1(this.state.Email, this.state.FirstName, this.state.LastName, this.state.PW, this.state.CPW, this.state.Home, this.state.Tel, this.state.NIC);
        const isDisabled1 = Object.keys(errors1).some(x => errors1[x]);

        //marking the touched but unfilled fields in red
        const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;
        };

        return (
            <div class="container-fluid">
                <div class="row max-height justify-content-center align-items-center">
                    <div class="col-10 mx-auto banner text-center">
                        <h1 class="text-capitalize">
                            <strong class="banner-title">Book an Appointment with an Expert Nurse in your Area</strong>
                        </h1>

                        <div >
                            <table align="center">
                                <tr><td>
                                    <span>
                                        <input type="button" class="btn btn-primary btn-lg" value="I WANT A CLIENT" onClick={() => this.openModal()} />
                                        <Modal visible={this.state.visible} width="50%" height="98%" effect="fadeInLeft" onClickAway={() => this.closeModal()}>
                                            <h3> Register Here </h3>
                                            <div class="card-body register-card-body">
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

                                                    <Form.Row>
                                                        <Form.Group as={Col}>
                                                            <Form.Label>NIC Number</Form.Label>
                                                            <Form.Control
                                                                className={shouldMarkError("NIC") ? "error" : ""}
                                                                type="text"
                                                                value={this.state.NIC}
                                                                onChange={this.onChangeNIC}
                                                                onBlur={this.handleBlur("NIC")}
                                                            />
                                                            <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col}>
                                                            <Form.Label>Mobile Number</Form.Label>
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

                                                    <Form.Row>
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Password </Form.Label>
                                                            <a tabindex="0" data-toggle="popover" data-trigger="focus"
                                                                title="Password should atleast be of 6 characters
                                                                should include atleast one simple letter, capital letter, special character and number" 
                                                                data-content="And here's some amazing content. It's very engaging. Right?"> Policy</a>

                                                            <Form.Control
                                                                className={shouldMarkError("PW") ? "error" : ""}
                                                                required
                                                                // placeholder="Atleast one number, special character, capital & simple letter"
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

                                                    <Button type="submit" variant="primary" disabled={isDisabled} onClick={this.onSubmitNurse.bind(this)}>Submit</Button>
                                                    <a href="#" class="text-center" onClick={() => this.onClickNurse()}>I already have membership</a>
                                                </Form>
                                            </div>
                                        </Modal>
                                    </span>
                                </td>

                                    <td>
                                        <span>
                                            <input type="button" class="btn btn-secondary btn-lg" value="I WANT A NURSE" onClick={() => this.openModal1()} />
                                            <Modal visible={this.state.visible1} width="50%" height="70%" effect="fadeInRight" onClickAway={() => this.closeModal1()}>
                                                <div class="card-body register-card-body">
                                                    <h3>Register Here</h3>
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

                                                        <Form.Group as={Col}>
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
                                                                <Form.Label>NIC Number</Form.Label>
                                                                <Form.Control
                                                                    className={shouldMarkError("NIC") ? "error" : ""}
                                                                    type="text"
                                                                    value={this.state.NIC}
                                                                    onChange={this.onChangeNIC}
                                                                    onBlur={this.handleBlur("NIC")}
                                                                />
                                                                <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                                                            </Form.Group>

                                                            <Form.Group as={Col}>
                                                                <Form.Label>Mobile Number</Form.Label>
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

                                                        <Form.Row>
                                                            <Form.Group as={Col}>
                                                                <Form.Label>Password</Form.Label>
                                                                <a tabindex="0" data-toggle="popover" data-trigger="focus"
                                                                title="Password should atleast be of 6 characters
                                                                should include atleast one simple letter, capital letter, special character and number" 
                                                                data-content="And here's some amazing content. It's very engaging. Right?">Policy</a>
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

                                                        <Button type="submit" variant="primary" disabled={isDisabled1} onClick={this.onSubmitClient.bind(this)}>Submit</Button>
                                                        <a href="#" class="text-center" onClick={() => this.onClickClient()}>I already have a membership</a>
                                                    </Form>
                                                </div>
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