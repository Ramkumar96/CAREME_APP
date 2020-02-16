import React, { Component } from 'react'
import Admindashleftnav from './admindashleftnav'
import axios from './../../../../backend/node_modules/axios';

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
            NIC: this.state.NIC,
            PW: this.state.PW,
            CPW: this.state.CPW,
            Home: this.state.Home,
            Tel: this.state.Tel,
            userID: 1,
            Location: null,
            Age: null,
            nurseExp: null,
            nurseType: null,
            nurseEdu: null,
            nurseUni: null,
            nurseGender: null,
            profilePic: null
        };

        //adding new user to the database

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
                                                                placeholder="Enter email"
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
                                                                        placeholder="9#######v"
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
                                                                        placeholder="07########"
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
                                                                        placeholder="password"
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
                                                                        placeholder="confirm password"
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
