import React, { Component } from 'react'
import Admindashleftnav from './admindashleftnav'
import axios from './../../../../backend/node_modules/axios';
import md5 from 'md5';

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

export default class Addnurseadmin extends Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeNurseID = this.onChangeNurseID.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePW = this.onChangePW.bind(this);
        this.onChangeCPW = this.onChangeCPW.bind(this);
        //this.onChangeHome = this.onChangeHome.bind(this);
        this.onChangeTel = this.onChangeTel.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onSubmitNurse = this.onSubmitNurse.bind(this);


        this.state = {
            Email: '',
            FirstName: '',
            LastName: '',
            nurseID: '',
            PW: '',
            CPW: '',
            //Home: '',
            Tel: '',
            NIC: '',
        }
    }


    onChangeEmail(e) {
        this.setState({
            Email: e.target.value
        });
    }
    onChangeFirstName(e) {
        this.setState({
            FirstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            LastName: e.target.value
        });
    }

    onChangeNurseID(e) {
        this.setState({
            nurseID: e.target.value
        });
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

    onChangeTel(e) {
        this.setState({
            Tel: e.target.value
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

    onSubmitNurse(e) {
        e.preventDefault();

        const today = new Date();

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
            profilePic: 'http://localhost:4000/public/sampleimage.jpg',
            userID: 0,
            RegDate : today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            starRating : 0,
            ratingCount : 0
        };

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

            //verifying nurseID
            axios.post('http://localhost:4000/nurseCouncil/verify', obj, {headers: headers})
                .then(res=> {
                    if (!res.data.success){
                        alert("Please enter registered Nurse Council ID and NIC");
                    }

                    else if (res.data.success){
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
                                            else if (!response.data.success) {
                                                var hashed = md5(this.state.PW);

                                                const object = {
                                                    FirstName: this.state.FirstName,
                                                    LastName: this.state.LastName,
                                                    nurseID: this.state.nurseID,
                                                    Email: this.state.Email,
                                                    NIC: this.state.NIC,
                                                    PW: hashed,
                                                    CPW: hashed,
                                                    Home: this.state.Home,
                                                    Tel: this.state.Tel,
                                                    profilePic: 'http://localhost:4000/public/sampleimage.jpg',
                                                    userID: 0,
                                                    RegDate : today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
                                                    starRating : 0,
                                                    ratingCount : 0
                                                };

                                                axios.post('http://localhost:4000/user/add', object)
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
                                                    profilePic: '',
                                                });
                                            }
                                        });
                                }
                
                
                });
            }
                
            });
        
        }
    }

    render() {
        return (
            <div>
                <div >
                    <Admindashleftnav />
                </div>
                <div className="col-12">
                    <section className="content">
                        <div className="container-fluid">
                            <div class="row max-height justify-content-center align-items-center">
                                <div class="col-8 mx-auto">
                                    <div className="row">
                                        {/* left column */}
                                        <div className="col-md-6 ml-5 mt-5">
                                            {/* general form elements */}
                                            <div className="card card-primary">
                                                <div className="card-header">
                                                    <h3 className="card-title">Add Nurses Here</h3>
                                                </div>
                                                {/* /.card-header */}
                                                {/* form start */}
                                                <form role="form">

                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">First Name</label>
                                                                    <input type="text"
                                                                        className="form-control"
                                                                        id="fname"
                                                                        placeholder="Enter First Name"
                                                                        value={this.state.FirstName}
                                                                        onChange={this.onChangeFirstName} />
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">Last Name</label>
                                                                    <input type="text"
                                                                        className="form-control"
                                                                        id="lname"
                                                                        placeholder="Enter Last Name"
                                                                        value={this.state.LastName}
                                                                        onChange={this.onChangeLastName} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                                            <input type="email"
                                                                className="form-control"
                                                                id="exampleInputEmail1"
                                                                placeholder="abc@example.com"
                                                                value={this.state.Email}
                                                                onChange={this.onChangeEmail} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputPassword1">Nurse Council Number</label>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="NCnumber"
                                                                placeholder="Nurse Council Number"
                                                                value={this.state.nurseID}
                                                                onChange={this.onChangeNurseID} />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">NIC</label>
                                                                    <input type="text"
                                                                        className="form-control"
                                                                        id="nic"
                                                                        placeholder="Enter valid NIC"
                                                                        value={this.state.NIC}
                                                                        onChange={this.onChangeNIC} />
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">Mobile Number</label>
                                                                    <input type="text"
                                                                        className="form-control"
                                                                        id="mobile"
                                                                        placeholder="Enter valid phone number"
                                                                        value={this.state.Tel}
                                                                        onChange={this.onChangeTel} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">password</label>
                                                                    <input type="password"
                                                                        className="form-control"
                                                                        id="pw"
                                                                        placeholder="Password"
                                                                        value={this.state.PW}
                                                                        onChange={this.onChangePW} />
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">Confirm pasword</label>
                                                                    <input type="password"
                                                                        className="form-control"
                                                                        id="cpw"
                                                                        placeholder="Confirm Password"
                                                                        value={this.state.CPW}
                                                                        onChange={this.onChangeCPW} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* /.card-body */}
                                                    <div className="card-footer">
                                                        <button type="submit" className="btn btn-primary" onClick={this.onSubmitNurse.bind(this)}>Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* /.card */}
                                            {/* Form Element sizes */}


                                        </div>
                                        {/* /.card-body */}
                                    </div>
                                    {/* /.card */}
                                </div>
                                {/*/.col (right) */}

                            </div>
                        </div>

                    </section>
                    {/* /.content */}

                </div>
            </div>
        )
    }
}
