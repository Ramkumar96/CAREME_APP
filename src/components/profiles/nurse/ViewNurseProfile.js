import React, { Component } from "react";
import ProfileNavbar from '../ProfileNavbar';
import axios from "axios";
import Modal from 'react-awesome-modal';
import Calendar from "./Calender";
import StarRatingComponent from 'react-star-rating-component';
import { fontSize } from "@material-ui/system";
import { Button, Form, Col } from 'react-bootstrap';
import { tsExpressionWithTypeArguments } from "@babel/types";
import Complaint from "../complaint";

class ViewNurseProfile extends Component {

    constructor(props) {
        super(props);
        this.onChangeReview = this.onChangeReview.bind(this);
        this.onSubmitReview = this.onSubmitReview.bind(this);

        this.state = {
            profile_data: null,
            visible: false,
            clientEmail: localStorage.getItem("user_Email"),
            nurseEmail: null,
            response_body: null,
            visible1: false,
            Review: ''
        }
    }

    componentDidMount() {
        this.getData();
        // this.getRating();
        //console.log(this.props.match.params)
    }

    getData = () => {
        var token = localStorage.getItem('id');
        axios.get('http://localhost:4000/user/userdata/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data.profile_data)
                this.setState({
                    profile_data: response.data.profile_data,
                })
            })
    }

    // getRating = () => {
    //     if (this.state.profile_data){
    //         const checkObject = {
    //             nurseEmail : this.state.profile_data.Email,
    //             clientEmail : this.state.clientEmail
    //         }   

    //         const headers = {
    //             'Content-Type': 'application/json'
    //         }

    //         axios.post('http://localhost:4000/rating/checkPresence', checkObject, {headers:headers})
    //         .then (res => {
    //             if (res.data.success){
    //                 this.setState({
    //                     response_body : res.data.response_body
    //                 })
    //             }
    //         })

    //         // if (this.state.response_body){
    //         //     this.setState({
    //         //         Rating: this.state.response_body.Rating
    //         //     })
    //         // }

    //         if (!this.state.response_body) {
    //             this.setState({
    //                 Rating: 0
    //             })
    //         }

    //         console.log(this.state.Rating);
    //     }
    // }

    onStarClick(nextValue) {
        const obj = {
            RatedBy : this.state.clientEmail,
            RatedUser : this.state.profile_data.Email,
            Rating : nextValue,
            RatedDate: new Date()
        }

        const checkObj = {
            nurseEmail : this.state.profile_data.Email,
            clientEmail : this.state.clientEmail
        }

        const userObj = {
            Rating: nextValue,
            nurseEmail: this.state.profile_data.Email
        }

        const headers = {
            'Content-Type': 'application/json'
          }

        axios.post('http://localhost:4000/rating/checkPresence', checkObj, {headers:headers})
          .then (res => {
              if (res.data.success){
                axios.post('http://localhost:4000/rating/delete', obj)
                .then( response => {
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

    openReviewModal(){
        this.setState({
            visible1: true
        })
    }

    closeReviewModal(){
        this.setState({
            visible1: false
        })
    }

    openComplaintModal(){
        this.setState({
            visible2: true
        })
    }

    closeComplaintModal(){
        this.setState({
            visible2: false
        })
    }

    onSubmitReview(e){
        e.preventDefault();

        const dataObject = {
            ReviewBy: this.state.clientEmail,
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

        const {Rating} = this.setState;

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
                                                </ul>
                                            </div>
                                            {/* /.card-body */}
                                        </div>
                                    </div>
                                </div>

                                {/* Nurse Prfoile Info middle container */}
                                <div className="col-lg-6">
                                    {/*Proffile Info */}
                                    <div className="card">
                                        <div className="card-header p-2">
                                            <ul className="nav nav-pills">
                                                <li className="nav-item"><a className="nav-link active" href="#profile" data-toggle="tab">Profile</a></li>
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
                                                                <h3 className="timeline-header border-0"> <strong>Location:  </strong>{this.state.profile_data.Location}</h3>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="timeline-item">
                                                                <h3 className="timeline-header border-0"> <strong>Skill:  </strong>{this.state.profile_data.nurseType} Nurse</h3>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="timeline-item">
                                                                <h3 className="timeline-header border-0"> <strong>Education:  </strong>{this.state.profile_data.nurseEdu}</h3>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="timeline-item">
                                                                <h3 className="timeline-header border-0"> <strong>University:  </strong>{this.state.profile_data.nurseUni}</h3>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="timeline-item">
                                                                <h3 className="timeline-header border-0"> <strong>Email:  </strong>{this.state.profile_data.Email}</h3>
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

                                {/* Nurse Profile Right side conatiner */}
                                <div className="col-lg-3">
                                    {/*First Card in Right Side*/}
                                    <div className="card card-primary">
                                        <div className="card-body text-center">
                                            <strong>Rate {this.state.profile_data.FirstName} </strong>
                                            <br/>
                                            <div style={{fontSize: 28}}>
                                                <StarRatingComponent 
                                                    className = "rateStar"
                                                    name="rate1" 
                                                    starCount={5}
                                                    value={Rating}
                                                    onStarClick={this.onStarClick.bind(this)}
                                                />
                                            <hr/>
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
                                            <hr/>

                                            <a href={`/clientviewnursecalendar/${this.props.match.params.id}`} className="btn btn-danger btn-block"><b>Check Calendar</b></a>
                                            {/* <input type="button" class="btn btn-danger btn-block" value="Check Calender" onClick={() => this.openLoginModal()} /> */}
                          
                                            <hr/>

                                            {/* Calender for booking */}

                                            {/* complaint management*/}
                                            <input type="button" class="btn btn-success" value="Add a complaint" onClick={() => this.openComplaintModal()} />
                                            <Modal visible={this.state.visible2} width="75%" height="75%" effect="fadeInUp" onClickAway={() => this.closeComplaintModal()}>
                                                <div>
                                                    <Complaint/>

                                                </div>
                                            </Modal>
                                        </div>
                                        {/* /.card-body */}
                                    </div>
                                    {/* /.card */}


                                    {/*Second Card in Right Side*/}
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

export default ViewNurseProfile;