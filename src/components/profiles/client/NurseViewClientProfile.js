import React, { Component } from "react";
import ProfileNavbar from '../ProfileNavbar';
import Modal from 'react-awesome-modal';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import axios from "../../../../backend/node_modules/axios";
import StarRatingComponent from "react-star-rating-component";
import { Button, Form, Col } from 'react-bootstrap';
import Complaint from "../complaint";

class NurseViewClientProfile extends Component {

    constructor(props) {
        super(props);

        this.onChangeReview = this.onChangeReview.bind(this);
        this.onSubmitReview = this.onSubmitReview.bind(this);

        this.state = {
            profile_data: null,
            visible: false,
            redirect_home: false,
            nurseEmail: localStorage.getItem('user_Email'),
            visible1: false,
            Review: '',
            visible2: false
        }
    }

    openComplaintModal() {
        this.setState({
            visible2: true
        })
    }

    closeComplaintModal() {
        this.setState({
            visible2: false
        })
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

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        //var token = localStorage.getItem('id');
        axios.get('http://localhost:4000/user/userdata/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data.profile_data)
                this.setState({
                    profile_data: response.data.profile_data
                })

                localStorage.setItem("accusedEmail", this.state.profile_data.Email);
                localStorage.setItem("accusedUserFName", this.state.profile_data.FirstName);
                localStorage.setItem("accusedUserLName", this.state.profile_data.LastName);
                localStorage.setItem("accusedByID", 0);
                localStorage.setItem("accusedUserID", 1);
            })
    }

    onStarClick(nextValue) {
        this.setState({
            Rating: nextValue
        })

        const obj = {
            RatedBy: this.state.nurseEmail,
            RatedUser: this.state.profile_data.Email,
            Rating: nextValue,
            RatedDate: new Date()
        }

        console.log(obj);

        const checkObj = {
            RatesUser: this.state.profile_data.Email,
            RatedBy: this.state.nurseEmail
        }

        const userObj = {
            Rating: nextValue,
            RatedUser: this.state.profile_data.Email
        }

        const headers = {
            'Content-Type': 'application/json'
        }


        axios.post('http://localhost:4000/rating/checkPresence', checkObj, { headers: headers })
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        toDeleteRating : res.data.response_body.Rating
                    })

                    const toReduce = {
                        Rating: this.state.toDeleteRating,
                        RatedUser: this.state.profile_data.Email
                    }
                    
                    axios.put('http://localhost:4000/user/deductRating', toReduce)
                        .then(response => {
                            //console.log(response.data);
                        });

                    axios.post('http://localhost:4000/rating/delete', obj)
                        .then(response => {
                            //console.log(response.data);
                        });
                }

                axios.post('http://localhost:4000/rating/add', obj)
                    .then(res => {
                        //console.log(res.data) 
                    });
            })

        axios.put('http://localhost:4000/user/userdata/updateRating/', userObj, { headers: headers })
            .then(response => {
                alert("Details successfully updated");
                if (response.data.success) {
                    this.getData()
                }
            });
    }

    onChangeReview(e) {
        this.setState({
            Review: e.target.value
        });
    }

    openReviewModal() {
        this.setState({
            visible1: true
        })
    }

    closeReviewModal() {
        this.setState({
            visible1: false
        })
    }

    onSubmitReview(e) {
        e.preventDefault();

        const dataObject = {
            ReviewBy: this.state.nurseEmail,
            ReviewedUser: this.state.profile_data.Email,
            Review: this.state.Review,
            ReviewDate: new Date()
        }

        console.log(dataObject);

        axios.post('http://localhost:4000/review/add', dataObject)
            .then(res => {
                alert("Review Successful! Thank you for taking a moment.");
            });

        this.setState({
            Review: '',
            visible1: false
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
                                                <h6 className="text-center">Member since 2019</h6>
                                            </li>

                                            <li className="list-group-item">
                                                <h6 className="text-center">{this.state.profile_data.FirstName}'s Rating : </h6>
                                                <div style={{ fontSize: 28 }}>
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
                                            {/* <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Update Profile</a></li> */}
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
                                        <strong>Rate {this.state.profile_data.FirstName} </strong>
                                        <br/>
                                        <div style={{fontSize: 28}}>
                                            <StarRatingComponent
                                                className="rateStar"
                                                name="rate1"
                                                starCount={5}
                                                value={this.state.Rating}
                                                onStarClick={this.onStarClick.bind(this)}
                                            />
                                        <hr />
                                        </div>
                                        <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                                        <p className="text-muted text-center">{this.state.profile_data.Location}</p> 
                                        <hr />

                                        <input type="button" class="btn btn-warning btn-block" value="Leave a Review" onClick={() => this.openReviewModal()} />
                                            <Modal visible={this.state.visible1} width="50%" height="30%" effect="fadeInUp" onClickAway={() => this.closeReviewModal()}>
                                                <h3>Leave a Review</h3>

                                                <Form>
                                                    <Form.Group>
                                                        <Form.Control
                                                            required
                                                            type="textarea"
                                                            value={this.state.Review}
                                                            onChange={this.onChangeReview}
                                                            placeholder="Leave a review"
                                                        />
                                                    </Form.Group>

                                                    <Button type="submit" variant="primary" onClick={this.onSubmitReview.bind(this)}>Submit</Button>
                                                </Form>
                                            </Modal>
                                            <hr /> 

                                            <input type="button" class="btn btn-success" value="Add a complaint" onClick={() => this.openComplaintModal()} />
                                            <Modal visible={this.state.visible2} width="75%" height="75%" effect="fadeInUp" onClickAway={() => this.closeComplaintModal()}>
                                                <div>
                                                    <Complaint />
                                                </div>
                                            </Modal>                           
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

export default NurseViewClientProfile;