import React, { Component } from "react";
import ProfileNavbar from '../ProfileNavbar';
import ProfilePic from "../ProfilePic";
import NurseProfileInfo from "./nurseProfileInfo";
import ProfileRight from "../ProfileRight";

class NurseMainPage extends Component {
    render() {
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
                                                <img className="profile-user-img img-fluid img-circle" src="../../dist/img/user4-128x128.jpg" alt="User profile picture" />
                                            </div>
                                            <h3 className="profile-username text-center">name</h3>
                                            {/* {this.state.profile_data.FirstName} */}
                                            {/* <p className="text-muted text-center">Software Engineer</p> */}

                                            <ul className="list-group list-group-unbordered mb-3 text-center">
                                                <li className="list-group-item">
                                                    <h6 className="text-center">@username</h6>
                                                </li>
                                                <li className="list-group-item">
                                                    <h6 className="text-center">Member since 2015</h6>
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
                                                B.S. in Nursing from the University of Peradeniya
                        </p>
                                            <hr />
                                            <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                                            <p className="text-muted">Nugegoda,Colombo</p>
                                            <hr />
                                            <strong><i className="fas fa-pencil-alt mr-1" /> Skills</strong>
                                            <p className="text-muted">
                                                <span className="tag tag-primary">care</span>
                                                <span className="tag tag-primary">injection</span>
                                                <span className="tag tag-primary">medicine</span>
                                            </p>
                                            <hr />
                                            <strong><i className="far fa-file-alt mr-1" /> Notes</strong>
                                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
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
                                                            <h3 className="timeline-header border-0"> <strong>First Name:  </strong>Ramkumar</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>Last Name:  </strong>Ramkumar</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>Email:  </strong>Ramkumar</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>Address:  </strong>Ramkumar</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>Telephone:  </strong>Ramkumar</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>otherss:  </strong>Ramkumar</h3>
                                                        </div>
                                                    </div>




                                                    {/* END timeline item */}

                                                </div>
                                                {/* /.tab-pane */}
                                            </div>

                                            <div className="tab-pane" id="settings">
                                                <form className="form-horizontal">
                                                    <div className="form-group row">
                                                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                                                        <div className="col-sm-10">
                                                            <input type="email" className="form-control" id="inputName" placeholder="Name" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                                        <div className="col-sm-10">
                                                            <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="inputName2" className="col-sm-2 col-form-label">Name</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="inputName2" placeholder="Name" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="inputExperience" className="col-sm-2 col-form-label">Experience</label>
                                                        <div className="col-sm-10">
                                                            <textarea className="form-control" id="inputExperience" placeholder="Experience" defaultValue={""} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Skills</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="inputSkills" placeholder="Skills" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="offset-sm-2 col-sm-10">
                                                            <div className="checkbox">
                                                                <label>
                                                                    <input type="checkbox" /> I agree to the <a href="#">terms and conditions</a>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="offset-sm-2 col-sm-10">
                                                            <button type="submit" className="btn btn-danger">Submit</button>
                                                        </div>
                                                    </div>
                                                </form>
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
                                        <p className="text-muted">Malibu, California</p>

                                        <hr />
                                        <a href="#" className="btn btn-warning btn-block"><b>Find A Nurse</b></a>
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
                                        <strong><i className="fas fa-email mr-1" /> Email</strong>
                                        <hr />
                                        <strong><i className="fas fa-mobile mr-1" /> Phone</strong>
                                        <hr />
                                        <strong><i className="fas fa-pencil-alt mr-1" />NIC</strong>
                                        <hr />
                                        <strong><i className="far fa-file-alt mr-1" />Reg No</strong>
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