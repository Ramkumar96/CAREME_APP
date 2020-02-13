import React, { Component } from "react";
import ProfileNavbar from '../ProfileNavbar';
import Modal from 'react-awesome-modal';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import ClientEdit from "../edit/clientedit";
import axios from "../../../../backend/node_modules/axios";
import StarRatingComponent from "react-star-rating-component";

class ClientMainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile_data: null,
            visible: false,
            visible1 : false,
            redirect_home: false,
            user: null
        }
    }

    openDeacModal() {
        this.setState({
            visible: true
        });
    }

    closeDeacModal() {
        this.setState({
            visible: false
        });
    }

    openMessageModal(){
        this.setState({
            visible1: true
        })
    }

    closeMessageModal(){
        this.setState({
            visible1: false
        })
    }

    componentDidMount() {
        this.getData()

    }

    deactivate() {
        this.setState({
            visible: false
        });

        const obj = {
            FirstName: this.state.profile_data.FirstName,
            LastName: this.state.profile_data.LastName,
            Email: this.state.profile_data.Email,
            NIC: this.state.profile_data.NIC,
            Tel : this.state.profile_data.Tel,
            Home : this.state.profile_data.Home,
            userID : this.state.profile_data.userID,
            PW : this.state.profile_data.PW,
            CPW : this.state.profile_data.CPW,
            RegDate : this.state.profile_data.RegDate,
            DeacDate: new Date()
        };

        axios.post('http://localhost:4000/userDeac/add', obj)
            .then(res => { console.log(res.data) });

        axios.post('http://localhost:4000/user/delete', obj)
            .then(response => {
                if (response.data.success) {
                    console.log("To prove that deactivated properly");
                    this.setState({
                        visible: false,
                        redirect_home: true
                    });
                }
            });
    }

    sortedMsges(){
        this.setState({
            visible: false
        });

        const obj2 = {
            FirstName: this.state.profile_data.FirstName,
            LastName: this.state.profile_data.LastName,
            Email: this.state.msg_data.receiverEmail,
            sender: this.state.msg_data.senderEmail,
            message: this.state.msg_data.message,
            date: this.state.msg_data.messageDate
        };
        //methnata sort karana function eka
        //log wela inna userge email address eka thiyena okkoma messages watenna ona. 
        //date ekata anuwa sort karanna
        //view it
        //return this.state.data.msg_data.map(function(obj2 , ))
        
    }

    getData = () => {
        var token = localStorage.getItem('id');
        axios.get('http://localhost:4000/user/userdata/' + token)
            .then(response => {
                console.log(response.data.profile_data)
                this.setState({
                    profile_data: response.data.profile_data
                })
            })

        this.setState ({
            user : localStorage.getItem('Email')
        })
        
        axios.get('http://localhost:4000/messaging/msgdata', this.state.user)
            .then(response => {
                console.log(response.data.msg_data)
                this.setState({
                    msg_data :response.data.msg_data
                })
            })
    }

    render() {

        if (!this.state.profile_data) {
            return (
                <div> <text>Loading</text> </div>
            );
        }

        if (this.state.redirect_home) {
            return (
                <Redirect to='/' />
            );
        }

        const ratingVal = this.state.profile_data.starRating;
        const rateCount = this.state.profile_data.ratingCount;

        const finalRating = ratingVal/rateCount;

        return (
            <div>
                <div class="wrapper">
                    <ProfileNavbar />
                    <br></br>
                    <div className="container-fluid">
                        <div className="row">

                            {/* client profile picture container */}
                            <div className="col-lg-3">
                                {/* Profile Image */}
                                <div className="card card-primary card-outline">
                                    <div className="card-body box-profile">
                                        <div className="text-center">
                                            <img className="profile-user-img img-fluid img-circle" src={this.state.profile_data.profilePic} alt="User profile pic" />
                                            {/* <div><ProfilePicUpload/></div> */}
                                        </div>
                                        <h3 className="profile-username text-center">{this.state.profile_data.FirstName}</h3>


                                        <ul className="list-group list-group-unbordered mb-3 text-center">
                                            <li className="list-group-item">
                                                <h6 className="text-center">@{this.state.profile_data.FirstName}{this.state.profile_data.LastName}</h6>
                                            </li>
                                            <li className="list-group-item">
                                                <h6 className="text-center">Member since 2018</h6>
                                            </li>
                                            <li className="list-group-item text-center">
                                                <small class="badge badge-success"><i class="far fa-check-circle mr-2"></i>Fully Verified</small>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* /.card-body */}
                                </div>


                                {/* About Me Box */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">About Me</h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        {/* <strong><i className="fas fa-book mr-1" /> Education</strong>
                                        <p className="text-muted">
                                            B.S. in Nursing from the University of Peradeniya
                                        </p>
                                        <hr /> */}
                                        <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                                        <p className="text-muted">{this.state.profile_data.Location}</p>
                                        <hr />
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}

                            </div>

                            {/* client user information container */}
                            <div className="col-lg-6">
                                {/*Proffile Info */}
                                <div className="card">
                                    <div className="card-header p-2">
                                        <ul className="nav nav-pills">
                                            <li className="nav-item"><a className="nav-link active" href="#profile" data-toggle="tab">Profile Details</a></li>
                                            {/* <li className="nav-item"><a className="nav-link" href="#timeline" data-toggle="tab">Timeline</a></li> */}
                                            <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Update Profile</a></li>
                                        </ul>
                                    </div>{/* /.card-header */}


                                    {/* Profile Details Container */}
                                    <div className="card-body">
                                        <div className="tab-content">
                                            <div className="active tab-pane" id="profile">
                                                <div className="timeline timeline-inverse">
                                                    {/* timeline item */}
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>First Name:  </strong>{this.state.profile_data.FirstName}</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>Last Name:  </strong>{this.state.profile_data.LastName}</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>Email:  </strong>{this.state.profile_data.Email}</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>Address:  </strong>{this.state.profile_data.Home}</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>Telephone:  </strong>{this.state.profile_data.Tel}</h3>
                                                        </div>
                                                    </div>

                                                    {/* END timeline item */}

                                                </div>
                                                {/* /.tab-pane */}
                                            </div>

                                            {/* Update Profile Form container */}
                                            <div className="tab-pane" id="settings">

                                                <ClientEdit
                                                    loadData={this.getData} />
                                            </div>
                                            {/* /.tab-pane */}
                                        </div>
                                        {/* /.tab-content */}
                                    </div>{/* /.card-body */}
                                </div>
                                {/* /.nav-tabs-custom */}
                            </div>

                            {/* client Right side container */}
                            <div className="col-lg-3">

                                {/*First Card in Right Side*/}
                                <div className="card card-primary">
                                    <div className="card-body text-center">
                                        <strong>Ratings </strong>
                                        <br/>
                                        <div style={{fontSize: 28}}>
                                            <StarRatingComponent
                                                name="rate1"
                                                editing={false}
                                                starCount={5}
                                                value={finalRating} 
                                            />
                                        <hr />
                                        </div>
                                        <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                                        <p className="text-muted text-center">{this.state.profile_data.Location}</p>

                                        <hr />
                                        <a href="/nursemainlist" className="btn btn-warning btn-block"><b>Find A Nurse</b>
                                        </a>

                                        <hr />
                                        <input type="button" class="btn btn-danger btn-block" value="Deactivate" onClick={() => this.openDeacModal()} />
                                        <Modal visible={this.state.visible} width="25%" height="25%" effect="fadeInUp" onClickAway={() => this.closeDeacModal()}>
                                            <h1 align="center">Deactivate</h1>
                                            <p align="center">Do you really want to Deactivate?</p>
                                            <center>
                                                <Button variant="btn btn-danger" type="submit" onClick={() => this.deactivate()}>Yes</Button>
                                                <input type="button" class="btn btn-info" value="Cancel" onClick={() => this.closeDeacModal()} />
                                            </center>
                                        </Modal>

                                        {/* new message check button*/}
                                        <hr />
                                        <input type="button" class="btn btn-primary" value="Check Messages" onClick={() => this.openMessageModal()} />
                                            <Modal visible={this.state.visible1} width="50%" height="70%" effect="fadeInUp" onClickAway={() => this.closeMessageModal()}>
                                                <h3 align="center">Messages</h3>
                                            <p align="center">messages must render here</p>
                                            <center>
                                                <div>
                                                    {/* {this.sortedMsges()} */}
                                                    {/* <p className="text-muted text-center">{this.state.msg_data.message}</p> */}
                                                </div>
                                                <Button variant="btn btn-info" type="submit" onClick={() => this.sortedMsges()}>Refresh</Button>
                                                <input type="button" class="btn btn-danger" value="Cancel" onClick={() => this.closeMessageModal()} />
                                            </center>
                                        </Modal>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}


                                {/*Seoond Card in Right Side*/}
                                <div className="card card-primary">
                                    <div className="card-header text-center">
                                        <h3 className="card-title text-center"><strong>Verifications</strong></h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <strong><i className="fas fa-email mr-1" /> Email   </strong> <small class="badge badge-success"><i class="far fa-check-circle mr-2"></i>  Fully Verified</small>
                                        <hr />
                                        <strong><i className="fas fa-mobile mr-1" /> Phone</strong>  <small class="badge badge-success"><i class="far fa-check-circle mr-2"></i>  Fully Verified</small>
                                        <hr />
                                        <strong><i className="fas fa-pencil-alt mr-1" />NIC</strong> <small class="badge badge-danger"><i class="far fa-check-circle mr-2"></i>  Not Verified</small>
                                        <hr />
                                        <strong><i className="far fa-file-alt mr-1" />Reg No</strong> <small class="badge badge-success"><i class="far fa-check-circle mr-2"></i>  Fully Verified</small>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClientMainPage;