import React, { Component } from 'react'
import Admindashleftnav from './admindashleftnav'
import axios from './../../../../backend/node_modules/axios';
import md5 from "md5";

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

/**
 * @desc Adding a client by the CareMe Admin
 * 
 */

export default class Addclientadmin extends Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);;
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePW = this.onChangePW.bind(this);
        this.onChangeCPW = this.onChangeCPW.bind(this);
        this.onChangeTel = this.onChangeTel.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);


        this.state = {
            Email: '',
            FirstName: '',
            LastName: '',
            PW: '',
            CPW: '',
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
            profilePic: 'http://localhost:4000/public/sampleimage.jpeg',
            RegDate : new Date(),
            starRating: 0,
            ratingCount: 0
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

        //confirming both passwords
        else if (PW !== CPW) {
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

                    /**
                     * @desc new client to the database
                     */
                    
                    else if (!res.data.success) {
                        var hashedPW = md5(this.state.PW);

                        const object = {
                            FirstName: this.state.FirstName,
                            LastName: this.state.LastName,
                            Email: this.state.Email,
                            PW: hashedPW,
                            CPW: hashedPW,
                            Home: this.state.Home,
                            Tel: this.state.Tel,
                            NIC: this.state.NIC,
                            userID: 1,
                            profilePic: 'http://localhost:4000/public/sampleimage.jpeg',
                            RegDate : new Date(),
                            starRating: 0,
                            ratingCount: 0
                        };

                        axios.post('http://localhost:4000/user/add', object)
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
                            profilePic: '',
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
                                                    <h3 className="card-title">Add Clients Here</h3>
                                                </div>
                                                {/* /.card-header */}
                                                {/* form start */}
                                                <form>
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
                                                                placeholder="abc@example.come"
                                                                value={this.state.Email}
                                                                onChange={this.onChangeEmail} />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">NIC</label>
                                                                    <input type="text"
                                                                        className="form-control"
                                                                        id="nic"
                                                                        placeholder="Please enter valid NIC"
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
                                                                        placeholder="Enter mobile number"
                                                                        value={this.state.Tel}
                                                                        onChange={this.onChangeTel} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">Password</label>
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
                                                                    <label htmlFor="exampleInputEmail1">Confirm password</label>
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
                                                        <button type="submit" className="btn btn-primary" onClick={this.onSubmitClient.bind(this)}>Submit</button>
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

                            </div></div>

                    </section>
                    {/* /.content */}

                </div>
            </div>
        )
    }
}
