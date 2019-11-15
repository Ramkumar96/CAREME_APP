import React, { Component } from 'react'

class NurseEdit extends Component {
    render() {
        return (
            <div>

                <form role="form">
                    <div className="card-body">
                        {/* Edit Email Address */}
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                        </div>

                        {/* Edit Telephone Number */}
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Telephone</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                        </div>

                        {/* Edit Location */}
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Location</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                        </div>

                        {/* Edit University */}
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Studied At</label>
                            {/* <input type="text" className="form-control" id="exampleInputPassword1" placeholder="University of Colombo" /> */}
                            <select id="inputState" class="form-control">
                                <option selected>College of Nursing Colombo</option>
                                <option>Sri Lanka Medical Council</option>
                                <option>University of Moratuwa</option>
                                <option>Open University of Sri Lanka</option>
                                <option>Open University (Gampaha Study Center)</option>
                                <option>International Institute of Health Sciences (IIHS)</option>
                                <option>Sri Lanka Institute of Information Technology</option>
                                <option>University Of Peradeniya</option>
                                <option>University Of Colombo</option>
                                <option>University of Ruhunu</option>
                            </select>
                        </div>

                        {/* Education Level */}
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Education Level</label>
                            {/* <input type="text" className="form-control" id="exampleInputPassword1" placeholder="University of Colombo" /> */}
                            <select id="inputState" class="form-control">
                                <option selected>Diploma in Nursing</option>
                                <option>B.Sc degree in Nursing</option>
                            </select>
                        </div>


                        {/* Upload NIC Picture */}
                        <div className="form-group">
                            <label htmlFor="exampleInputFile">Upload NIC Copy</label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="exampleInputFile" />
                                    <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <span className="input-group-text" id>Upload</span>
                                </div>
                            </div>
                        </div>


                        {/* Update Profile Picture */}
                        <div className="form-group">
                            <label htmlFor="exampleInputFile">Update your Profile Picture</label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="exampleInputFile" />
                                    <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <span className="input-group-text" id>Upload</span>
                                </div>
                            </div>
                        </div>

                        {/* Edit Experience */}
                        <div className="form-group">
                            <label>Carrier Experience</label>
                            <select multiple className="form-control">
                                <option>1-2 Years</option>
                                <option>3-4 Year</option>
                                <option>5-10 Year</option>
                                <option>Over 10+ Years</option>
                            </select>
                        </div>

                        {/* Edit Skill category */}
                        <form role="form">
                            <label>Skill Category</label>
                            <div className="row">
                                <div className="col-sm-6">
                                    {/* checkbox */}
                                    <div className="form-group">
                                        <div className="custom-control custom-radio">
                                            <input className="custom-control-input" type="radio" id="customRadio1" name="customRadio" />
                                            <label htmlFor="customRadio1" className="custom-control-label">Emergency Nurse</label>
                                        </div>
                                        <div className="custom-control custom-radio">
                                            <input className="custom-control-input" type="radio" id="customRadio2" name="customRadio" defaultChecked />
                                            <label htmlFor="customRadio2" className="custom-control-label">Surgical Nurse</label>
                                        </div>
                                        <div className="custom-control custom-radio">
                                            <input className="custom-control-input" type="radio" id="customRadio3" name="customRadio" defaultChecked />
                                            <label htmlFor="customRadio3" className="custom-control-label">Geriatric Nurse</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    {/* radio */}
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio" id="customRadio4" name="customRadio" />
                                        <label htmlFor="customRadio4" className="custom-control-label">Midwife Nurse</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio" id="customRadio5" name="customRadio" defaultChecked />
                                        <label htmlFor="customRadio5" className="custom-control-label">perdiactric Nurse</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio" id="customRadio6" name="customRadio" defaultChecked />
                                        <label htmlFor="customRadio6" className="custom-control-label">Mental Health Nurse</label>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>

                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>



            </div>
        )
    }
}

export default NurseEdit;