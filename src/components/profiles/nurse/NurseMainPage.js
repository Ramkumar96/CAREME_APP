import React, { Component } from "react";
import ProfileNavbar from '../ProfileNavbar';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import NurseEdit from "../edit/nurseedit";
import Modal from 'react-awesome-modal';

import { Button } from 'react-bootstrap';
import axios from './../../../../backend/node_modules/axios';
import NurseCalendar from "./NurseCalendar";
import StarRatingComponent from "react-star-rating-component";
import NurseNotification from "./booking/NurseNotification";
import Progress from "react-progressbar";
import Footer from "../../homepage/footer/Footer";
import ChatComponent from "../messaging/ChatComponent";
import { StreamChat } from 'stream-chat';

class NurseMainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile_data: null,
            completedPer: 100,
            visible1: false,
            visible3: false
        }
    }

    /** 
    * @desc: Functions to change visible variable for deactivation modals
    */
    openDeacModal() {
        this.setState({
            visible1: true
        });
    }
    closeDeacModal() {
        this.setState({
            visible1: false
        });
    }


    /** 
   * @desc: Functions to change visible variable for Message modals
   */
    openMsgModal() {
        this.setState({
            visible3: true
        })
    }
    closeMsgModal() {
        this.setState({
            visible3: false
        })
    }


    /** 
   * @desc: Function for profile Deactivation
   * @output :user profile will be deactivated and redirected to homepage
   */
    deactivate() {
        this.setState({
            visible1: false
        });

        const obj = {
            FirstName: this.state.profile_data.FirstName,
            LastName: this.state.profile_data.LastName,
            nurseID: this.state.profile_data.nurseID,
            Email: this.state.profile_data.Email,
            NIC: this.state.profile_data.NIC,
            Address: this.state.profile_data.Address,
            PW: this.state.profile_data.PW,
            CPW: this.state.profile_data.CPW,
            Tel: this.state.profile_data.Tel,
            userID: this.state.profile_data.userID,
            RegDate: this.state.profile_data.RegDate,
            DeacDate: new Date(),
            completedPer: null
        };

        axios.post('http://localhost:4000/userDeac/add', obj)
            .then(res => { console.log(res.data) });

        axios.post('http://localhost:4000/user/delete', obj)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        visible1: false,
                        redirect_home: true
                    })
                }
            });
    }

    componentDidMount() {
        this.getData()
    }


    /** 
    * @desc: Function to retrive the user data from the backed of a 
    * particular user using the id retrived from the local storage
    * @output : User data retrived from the backend
    */
    getData = () => {
        var token = localStorage.getItem('id');

        axios.get('http://localhost:4000/user/userdata/' + token)
            .then(response => {
                //console.log(response.data.profile_data)
                this.setState({
                    profile_data: response.data.profile_data
                })
                this.progressBar();
            })
    }

    progressBar() {
        let completion = 100;

        if (this.state.profile_data) {
            if (this.state.profile_data.Location == null) {
                completion = completion - 10;
            }

            if (this.state.profile_data.Age == null) {
                completion = completion - 6;
            }

            if (this.state.profile_data.nurseExp == null) {
                completion = completion - 10;
            }

            if (this.state.profile_data.nurseUni == null) {
                completion = completion - 6;
            }

            if (this.state.profile_data.nurseEdu == null) {
                completion = completion - 8;
            }

            if (this.state.profile_data.nurseType == null) {
                completion = completion - 10;
            }

            if (this.state.profile_data.profilePic == null) {
                completion = completion - 10;
            }

            this.setState({
                completedPer: completion
            })

            console.log(this.state.completedPer);
        }
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

        const finalRating = ratingVal / rateCount;

        /** 
        * @desc: code snippets to start a chat-coversation
        * @required: stream-chat, stream-chat-react
        */
        const client = new StreamChat("jh66vkvun7x5");
        const userToken = localStorage.getItem('chat_token');

        //    const senderEmail = this.state.clientEmail;
        //    var n = senderEmail.indexOf("@");
        //    var senderName = senderEmail.slice(0, n);
        //    console.log(senderName);

        const receiverEmail = this.state.profile_data.Email;
        var m = receiverEmail.indexOf("@");
        var receiverName = receiverEmail.slice(0, m);
        console.log(receiverName);

        //    var channelName = senderName.concat('-',receiverName);
        //    console.log(channelName);

        //    client.setUser( //logged in user details
        //        {
        //            id: senderName,
        //            name: senderName,
        //            image: localStorage.getItem('user_pic'),
        //        }, 
        //        userToken,
        //    );
        client.setUser( //logged in user details
            {
                id: receiverName,
                name: receiverName,
                image: localStorage.getItem('user_pic'),
            },
            userToken,
        );

        return (
            <div>
                <div class="wrapper">
                    <ProfileNavbar />
                    <br></br>
                    <div className="backg">
                        <div className="container-fluid">
                            <div className="row">

                                {/* Nurse Left side profile cards */}
                                <div className="col-lg-3">
                                    <div>
                                        {/* Profile pic card*/}
                                        <div className="card card-primary card-outline">
                                            <div className="card-body box-profile">
                                                <div className="text-center">
                                                    {/* Profile Image */}
                                                    <img className="profile-user-img img-fluid img-circle" src={this.state.profile_data.profilePic} alt="User profile picture" />
                                                </div>
                                                <h3 className="profile-username text-center">{this.state.profile_data.FirstName}</h3>


                                                <ul className="list-group list-group-unbordered mb-3 text-center">
                                                    <li className="list-group-item">
                                                        <h6 className="text-center">Gender : {this.state.profile_data.nurseGender}</h6>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <h6 className="text-center">Age : {this.state.profile_data.Age}</h6>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <h6 className="text-center">Experience : {this.state.profile_data.nurseExp}</h6>
                                                    </li>
                                                </ul>
                                            </div>
                                        {/* /.card-body */}
                                    </div>


                                    {/* About Me Card */}
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
                                    {/* /. About me card */}
                                </div>
                            </div>

                                {/* Nurse Prfile Info middle container */}
                                <div className="col-lg-6">
                                    {/*Profile Info */}
                                    <div className="card">
                                        <div className="card-header p-2">
                                            <ul className="nav nav-pills">
                                                <li className="nav-item"><a className="nav-link active" href="#profile" data-toggle="tab">Profile</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#notification" data-toggle="tab">Notification</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
                                            </ul>
                                        </div>{/* /.card-header */}

                                        <div className="card-body">
                                            <div className="tab-content">
                                                  {/* Profile details Tab */}
                                                <div className="active tab-pane" id="profile">
                                                    <div className="timeline timeline-inverse">
                                                        {/* timeline item */}
                                                        <div>
                                                            <div className="timeline-item">
                                                                <h3 className="timeline-header border-0"> <strong>First Name:  </strong>{this.state.profile_data.FirstName}</h3>
                                                            </div>
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

                                            {/* Notifications Tab */}
                                            <div className="tab-pane" id="notification">
                                                <NurseNotification />
                                            </div>

                                            {/* Update profile Tab, Calling the child component Nurseedit and 
                                            passing the getData function from parent component NurseMainPage */}
                                            <div className="tab-pane" id="settings">
                                                <NurseEdit
                                                    loadData={this.getData} />
                                            </div>
                                        </div>
                                        {/* /.tab-content */}
                                    </div>
                                </div>
                            </div>

                            {/* Nurse Profile Right side Card */}
                            <div className="col-lg-3">
                                {/*First Card in Right Side*/}
                                <div className="card card-primary">
                                    <div className="card-body text-center">
                                        {/* Ratings */}
                                        <strong>Ratings </strong> 
                                        <div style={{ fontSize: 28 }}>
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
                                        {/* Message button and Modal */}
                                        <button class="btn btn-outline-success btn-block" onClick={() => this.openMsgModal()}> <i className="fa fa-envelope mr-2"></i>Messages</button>
                                        <div>
                                            <Modal visible={this.state.visible3} width="80%" height="100%" effect="fadeInUp" onClickAway={() => this.closeMsgModal()}>
                                                <ChatComponent />
                                            </Modal>
                                        </div>
                                        <hr />

                                        {/* Nurse Calender for booking */}
                                        <a href="/nursecalendar" className="btn btn-outline-warning btn-block"><i className="fa fa-calendar-alt mr-2"></i>Edit Availability</a>
                                        <hr />


                                        {/* Deactivate Button and Modal*/}
                                        <Button className="btn btn-danger btn-block" onClick={() => this.openDeacModal()}><i className="fa fa-user-times mr-2"></i>Deactivate</Button>
                                        <Modal visible={this.state.visible1} width="25%" height="25%" effect="fadeInUp" onClickAway={() => this.closeDeacModal()}>
                                            <div class="modal-content">
                                                <div className="modal-header"><h4 align="center">Deactivate <i class="fa fa-user-times"></i></h4></div>
                                                <div className="modal-body"><i class="fa fa-question-circle"></i> Are you sure you want to Deactivate?</div>
                                                <div className="modal-footer"> <Button className="btn btn-danger btn-block" type="submit" onClick={() => this.deactivate()}>Deactivate</Button></div>
                                            </div>
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
                                        <strong><i className="fas fa-email mr-1" /> Profile Completed : {this.state.completedPer}% </strong>
                                        <hr />

                                        <Progress
                                            completed={this.state.completedPer}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default NurseMainPage;