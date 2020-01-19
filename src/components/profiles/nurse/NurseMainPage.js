import React, { Component } from "react";
import ProfileNavbar from '../ProfileNavbar';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import NurseEdit from "../edit/nurseedit";
import Modal from 'react-awesome-modal';
import Calendar from "./Calender";
import { Button } from 'react-bootstrap';
import axios from './../../../../backend/node_modules/axios';
import NurseCalendar from "./NurseCalendar";
import StarRatingComponent from "react-star-rating-component";


class NurseMainPage extends Component {

    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.state = {
            profile_data: null,
            visible: false
        }
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    openDeacModal() {
        this.setState({
            visible1: true
        });
    }

    closeDeacModal(){
        this.setState({
            visible1: false
        });
    }

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

    deactivate() {
        this.setState ({
            visible1:false
        });

        const obj = {
            FirstName : this.state.profile_data.FirstName,
            LastName : this.state.profile_data.LastName,
            nurseID : this.state.profile_data.nurseID,
            Email : this.state.profile_data.Email,
            NIC : this.state.profile_data.NIC,
            Address : this.state.profile_data.Address,
            PW : this.state.profile_data.PW,
            CPW : this.state.profile_data.CPW,
            Tel : this.state.profile_data.Tel,
            userID : this.state.profile_data.userID,
            RegDate : this.state.profile_data.RegDate,
            DeacDate : new Date()
        };

        axios.post('http://localhost:4000/userDeac/add', obj)
            .then(res => { console.log(res.data) });

        axios.post('http://localhost:4000/user/delete', obj)
            .then( response => {
                if(response.data.success){
                    this.setState({
                        visible1: false,
                        redirect_home:true
                    })
                }
            });
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        var token = localStorage.getItem('id');
        axios.get('http://localhost:4000/user/userdata/' + token)
            .then(response => {
                //console.log(response.data.profile_data)
                this.setState({
                    profile_data: response.data.profile_data
                })
            })
    }

    render() {

        if (!this.state.profile_data) {
            return (
                <div> <text>Loading</text> </div>
            );
        }

        if(this.state.redirect_home){
            return(
                <Redirect to='/'/>
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
                    <div className="backg">
                        <div className="container-fluid">
                            <div className="row">

                                {/* Nurse Profile Pic container */}
                                <div className="col-lg-3">
                                    <div>
                                        {/* Profile Image */}
                                        <div className="card card-primary card-outline">
                                            <div className="card-body box-profile">
                                                <div className="text-center">
                                                    <img className="profile-user-img img-fluid img-circle" src={this.state.profile_data.profilePic} alt="User profile picture" />
                                                </div>
                                                <h3 className="profile-username text-center">{this.state.profile_data.FirstName}</h3>


                                                <ul className="list-group list-group-unbordered mb-3 text-center">
                                                    <li className="list-group-item">
                                                        <h6 className="text-center">@{this.state.profile_data.FirstName}{this.state.profile_data.LastName}</h6>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <h6 className="text-center">Gender : {this.state.profile_data.nurseGender}</h6>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <h6 className="text-center">Age : {this.state.profile_data.Age}</h6>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <h6 className="text-center">Experience : {this.state.profile_data.nurseExp}</h6>
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
                                                <strong><i className="fas fa-book mr-1" /> Education</strong>
                                                <p className="text-muted">
                                                    {this.state.profile_data.nurseEdu}
                                                </p>
                                                <hr />
                                                <strong><i className="fas fa-book mr-1" /> University</strong>
                                                <p className="text-muted">
                                                    {this.state.profile_data.nurseUni}
                                                </p>
                                                <hr />
                                                <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                                                <p className="text-muted">{this.state.profile_data.Location}</p>
                                                <hr />
                                                <strong><i className="fas fa-pencil-alt mr-1" /> Skills</strong>
                                                <p className="text-muted">
                                                    {this.state.profile_data.nurseType} Nurse
                                                </p>
                                            </div>
                                            {/* /.card-body */}
                                        </div>
                                        {/* /.card */}
                                    </div>
                                </div>

                                {/* Nurse Prfoile Info middle container */}
                                <div className="col-lg-6">
                                    {/*Proffile Info */}
                                    <div className="card">
                                        <div className="card-header p-2">
                                            <ul className="nav nav-pills">
                                                <li className="nav-item"><a className="nav-link active" href="#profile" data-toggle="tab">Profile</a></li>
                                                {/* <li className="nav-item"><a className="nav-link" href="#timeline" data-toggle="tab">Timeline</a></li> */}
                                                <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
                                            </ul>
                                        </div>{/* /.card-header */}

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

                                                <div className="tab-pane" id="settings">
                                                    <NurseEdit
                                                        loadData={this.getData} />

                                                </div>
                                                {/* /.tab-pane */}
                                            </div>
                                            {/* /.tab-content */}
                                        </div>{/* /.card-body */}
                                    </div>
                                    {/* /.nav-tabs-custom */}


                                </div>

                                {/* Nurse Profile Right side conatiner */}
                                <div className="col-lg-3">
                                    {/*First Card in Right Side*/}
                                    <div className="card card-primary">
                                        <div className="card-body text-center">
                                            <strong>Ratings </strong> <br/>
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
                                            {/* Calender for booking */}
                                            <a href="/nursecalendar" className="btn btn-warning btn-block"><b>Edit Availability</b>
                                            </a>
                                            <Modal visible={this.state.visible} width="75%" height="75%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                                <div>
                                                    <NurseCalendar/>   
                                                </div>
                                            </Modal>

                                            <hr/>
                                            {/* Deactivate Modal */}
                                            <input type="button" class="btn btn-danger btn-block" value="Deactivate" onClick={() => this.openDeacModal()} />
                                            <Modal visible={this.state.visible1} width="25%" height="25%" effect="fadeInUp" onClickAway={() => this.closeDeacModal()}>
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
                                            <h3 className="card-title text-center"><strong>Verifications</strong></h3>
                                        </div>
                                        {/* /.card-header */}
                                        <div className="card-body">
                                            <strong><i className="fas fa-email mr-1" /> Email </strong><small class="badge badge-success"><i class="far fa-check-circle mr-2"></i>  Fully Verified</small>

                                            <hr />
                                            <strong><i className="fas fa-mobile mr-1" /> Phone </strong><small class="badge badge-success"><i class="far fa-check-circle mr-2"></i>  Fully Verified</small>

                                            <hr />
                                            <strong><i className="fas fa-pencil-alt mr-1" />NIC </strong><small class="badge badge-success"><i class="far fa-check-circle mr-2"></i>  Fully Verified</small>

                                            <hr />
                                            <strong><i className="far fa-file-alt mr-1" />Reg No </strong><small class="badge badge-danger"><i class="far fa-check-circle mr-2"></i>  Fully Verified</small>

                                        </div>
                                        {/* /.card-body */}
                                    </div>
                                    {/* /.card */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NurseMainPage;