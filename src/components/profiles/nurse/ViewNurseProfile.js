import React, { Component } from "react";
import ProfileNavbar from '../ProfileNavbar';
import axios from "axios";
import Modal from 'react-awesome-modal';
import Calendar from "./Calender";

class ViewNurseProfile extends Component {

    constructor(props) {
        super(props);
        this.openLoginModal = this.openLoginModal.bind(this);
        this.state = {
            profile_data: null,
            visible: false
        }
    }

    openLoginModal() {
        this.setState({
            visible: true
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

    componentDidMount() {
        this.getData();
        console.log(this.props.match.params)
    }

    getData = () => {
        var token = localStorage.getItem('id');
        axios.get('http://localhost:4000/user/userdata/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data.profile_data)
                this.setState({
                    profile_data: response.data.profile_data
                })
            })
    }

    render() {
        console.log(this.state.profile_data)
        if (!this.state.profile_data) {
            return (
                <div> <text>Loading</text> </div>
            );
        }

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
                                                    <img className="profile-user-img img-fluid img-circle" src="/images/nur.jpg" alt="User profile picture" />
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
                                            <strong>Ratings </strong>
                                            <p className="text-muted text-center">
                                                <i className="fas fa-star mr-1" />
                                                <i className="fas fa-star mr-1" />
                                                <i className="fas fa-star mr-1" />
                                                <i className="fas fa-star mr-1" />
                                                <i className="fas fa-star mr-1" />
                                            </p>
                                            <hr />
                                            <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                                            <p className="text-muted text-center">{this.state.profile_data.Location}</p>
                                            <hr />
                                            {/* Calender for booking */}
                                            <input type="button" class="btn btn-danger btn-block" value="Check Calender" onClick={() => this.openLoginModal()} />
                                            <Modal visible={this.state.visible} width="75%" height="75%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                                <div>
                                                    <Calendar />

                                                </div>
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