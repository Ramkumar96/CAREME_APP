import React, { Component } from 'react'

export default class ProfileInfo extends Component {
    render() {
        return (
            <div>
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
        )
    }
}
