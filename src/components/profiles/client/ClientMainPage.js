import React, { Component } from "react";
import ProfileNavbar from '../ProfileNavbar';
//import ClientProfilePage from './ClientPofilePage';

import ClientEdit from "../edit/clientedit";
import axios from "../../../../backend/node_modules/axios";




class ClientMainPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            profile_data: null
        }
    }

    componentDidMount() {
        this.getData()

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
    }
    
    render() {

        if(!this.state.profile_data){
            return(
            <div> <text>Loading</text> </div>
            );
         }

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
                                            <img className="profile-user-img img-fluid img-circle" src="/images/client.jpg" alt="User profile picture" />
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
                                                loadData={this.getData}/>
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
                                        <a href="/nursemainlist" className="btn btn-warning btn-block"><b>Find A Nurse</b>
                                        </a>
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