import React, { Component } from "react";
import ProfileNavbar from '../ProfileNavbar';
import Modal from 'react-awesome-modal';
import { Button, ProgressBar } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import ClientEdit from "../edit/clientedit";
import axios from "../../../../backend/node_modules/axios";
import StarRatingComponent from "react-star-rating-component";
import  Progress  from "react-progressbar";
import ChatComponent from "../messaging/ChatComponent";

class ClientMainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile_data: null,
            visible: false,
            redirect_home: false,
            completion : 75,
            chat_token: null,
            visible3: null
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
    openMsgModal(){
        this.setState({
            visible3: true
        })
    }

    closeMsgModal(){
        this.setState({
            visible3: false
        })
    }

    componentDidMount() {
        this.getData()
        this.chatToken()

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

    getData = () => {
        var token = localStorage.getItem('id');
        axios.get('http://localhost:4000/user/userdata/' + token)
            .then(response => {
                console.log(response.data.profile_data)
                this.setState({
                    profile_data: response.data.profile_data
                })
            })

        if (this.state.profile_data){
            if (this.state.profile_data.Location == null){
                if (this.state.profile_data.profilePic == null){
                    this.setState( {
                        completion : 75
                    })
                }

                else {
                    this.setState ( {
                        completion : 90
                    })
                }
            }

            else {
                if (this.state.profile_data.profilePic == null){
                    this.setState ( {
                        completion : 80
                    })
                }

                else {
                    this.setState ( {
                        completion : 100
                    })
                }
            }
        }
    }

    /** 
    * @desc: function to check chatToken from localStorage
    * @required: localStorage
    */
    chatToken=()=>{
        var chat_token = localStorage.getItem('chat_token');
        console.log("chat_token:",chat_token)
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
                                        <br />
                                        <h3 className="profile-username text-center">{this.state.profile_data.FirstName}</h3>
                                        <ul className="list-group list-group-unbordered mb-3 text-center">
                                            <li className="list-group-item">
                                                <strong>Ratings </strong>
                                                <br/>
                                                <div style={{fontSize: 28}}>
                                                    <StarRatingComponent
                                                        name="rate1"
                                                        editing={false}
                                                        starCount={5}
                                                        value={finalRating} 
                                                    />
                                                </div>
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
                                        <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                                        <p className="text-muted text-center">{this.state.profile_data.Location}</p>
                                        <hr />

                                        <input type="button" class="btn btn-success" value="Messages" onClick={() => this.openMsgModal()} />
                                        <div>
                                        <Modal visible={this.state.visible3} width="80%" height="100%" effect="fadeInUp" onClickAway={() => this.closeMsgModal()}>   
                                            <ChatComponent/>                                                    
                                        </Modal>
                                        </div>
                                        <hr/>

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
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}


                                {/*Seoond Card in Right Side*/}
                                <div className="card card-primary">
                                    <div className="card-header text-center">
                                        <h3 className="card-title text-center"><strong>Profile Status</strong></h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <strong><i className="far fa-file-alt mr-1" />Profile completed : {this.state.completion}% </strong>
                                        <hr />
                                        <Progress
                                            completed = {this.state.completion}
                                        />
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