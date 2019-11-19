import React, { Component } from 'react'
import axios from '../../../../backend/node_modules/axios';

class NurseEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profile_data: null,
            Email: '',
            Tel: '',
            Location: '',
            nurseUni: '',
            nurseEdu: '',
            nurseExp: '',
            nurseType: '',
            // nurseExpT:''
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
                    profile_data: response.data.profile_data,
                    Email: response.data.profile_data.Email,
                    Tel: response.data.profile_data.Tel
                })
            })

    }



    onChangeEmail = (e) => {

        this.setState({
            Email: e.target.value

        });

    }

    onChangeTel = (e) => {
        console.log(e.target.value);
        this.setState({
            Tel: e.target.value
        });
    }

    onChangeLocation = (e) => {
        console.log(e.target.value);
        this.setState({
            Location: e.target.value
        });
    }

    onChangeUniversity = (e) => {
        console.log(e.target.value);
        this.setState({
            nurseUni: e.target.value
        })
    }

    onChangeEducation = (e) => {
        console.log(e.target.value);
        this.setState({
            nurseEdu: e.target.value
        })
    }

    onChangeExperience = (e) => {
        console.log(e.target.value);
        this.setState({
            nurseExp: e.target.value
        })
    }

    // onChangeExperienceT = (e) => {
    //     console.log(e.target.value);
    //     this.setState({
    //         nurseExpT: e.target.value
    //     })
    // }


    onChangeType = (e) => {
        console.log(e.target.value);
        this.setState({
            nurseType: e.target.value
        })

    }

    onUpdate = (e) => {
        e.preventDefault();

        const nurseobj = {
            Email: this.state.Email,
            Tel: this.state.Tel,
            Location: this.state.Location,
            nurseUni: this.state.nurseUni,
            nurseEdu: this.state.nurseEdu,
            nurseExp: this.state.nurseExp,
            nurseType: this.state.nurseType,
            // nurseExpT:this.state.nurseExpT
        };
        const headers = {
            'Content-Type': 'application/json'
        }
        var token = localStorage.getItem('id');
        console.log(nurseobj);
        axios.put('http://localhost:4000/user/userdata/update/' + token, nurseobj, { headers: headers })
            .then(response => {
                alert("Details updated successfully");
                if (response.data.success) {
                    this.getData()
                    this.props.loadData()
                }
            });

       
    }



    render() {
        if (!this.state.profile_data) {
            return (
                <div> <text>Loading</text> </div>
            );
        }


        return (
            <div>

                <form role="form">
                    <div className="card-body">
                        {/* Edit Email Address */}
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email"
                                className="form-control"
                                value={this.state.Email}
                                onChange={this.onChangeEmail}
                                placeholderplaceholder="Enter email" />

                        </div>


                        {/* Edit Telephone Number */}
                        <div className="form-group">
                            <label htmlFor="telephone">Telephone</label>
                            <input type="text"
                                className="form-control"
                                value={this.state.Tel}
                                onChange={this.onChangeTel}
                                placeholder="Enter email" />
                        </div>

                        {/* Edit Location */}
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Location</label>
                            <div className="form-group">
                                <select id="dropDownLocation"
                                    className="form-control"
                                    onChange={this.onChangeLocation}>
                                    <option location="Colombo">Colombo</option>
                                    <option location="Gampaha">Gampaha</option>
                                    <option location="Kurunegala">Kurunegala</option>
                                    <option location="Galle">Galle</option>
                                 
                                </select>
                            </div>


                        </div>

                        {/* Edit University */}
                        <div className="form-group">
                            <label htmlFor="university">University</label>
                            <select id="dropDownUniversity"
                                class="form-control "
                                onChange={this.onChangeUniversity}>
                                <option university="College of Nursing Colombo" selected>College of Nursing Colombo</option>
                                <option university="Sri Lanka Medical Council">Sri Lanka Medical Council</option>
                                <option university="University of Moratuwa">University of Moratuwa</option>
                                <option university="Open University of Sri Lanka">Open University of Sri Lanka</option>
                                <option university="Open University (Gampaha Study Center)">Open University (Gampaha Study Center)</option>
                                <option university="International Institute of Health Sciences (IIHS)">International Institute of Health Sciences (IIHS)</option>
                                <option university="Sri Lanka Institute of Information Technology">Sri Lanka Institute of Information Technology</option>
                                <option university="University Of Peradeniya">University Of Peradeniya</option>
                                <option university="University Of Colombo">University Of Colombo</option>
                                <option university="University of Ruhunu">University of Ruhunu</option>
                            </select>
                        </div>

                        {/* Education Level */}
                        <div className="form-group">
                            <label htmlFor="educationlevel">Education Level</label>
                            <select id="dropDownEdu"
                                class="form-control"
                                onChange={this.onChangeEducation}>
                                <option education="Diploma in Nursing" selected>Diploma in Nursing</option>
                                <option education="B.Sc degree in Nursing">B.Sc degree in Nursing</option>
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
                            <label>Carrier Experience (in years)</label>
                            <select multiple
                                className="form-control"
                                onChange={this.onChangeExperience}>
                                <option  experience="1-2">1-2</option>
                                <option experience="3-5">3-5</option>
                                <option experience="5-10">5-10</option>
                                <option  experience="10+">10+</option>
                            </select>
                        </div>

                        {/* Edit Type category */}
                        <form role="form">
                            <label>Type Category</label>
                            <div className="row">
                                <div className="col-sm-6">
                                    {/* checkbox */}
                                    <div className="form-group">
                                        <div className="custom-control custom-radio">
                                            <input className="custom-control-input" type="radio" id="customRadio1" name="customRadio"
                                                defaultChecked
                                                value="Emergency"
                                                checked={this.state.nurseType === "Emergency Nurse"}
                                                onChange={this.onChangeType} />
                                            <label htmlFor="customRadio1" className="custom-control-label">Emergency Nurse</label>
                                        </div>
                                        <div className="custom-control custom-radio">
                                            <input className="custom-control-input" type="radio" id="customRadio2" name="customRadio"
                                                value="Surgical"
                                                checked={this.state.nurseType === "Surgical Nurse"}
                                                onChange={this.onChangeType} />
                                            <label htmlFor="customRadio2" className="custom-control-label">Surgical Nurse</label>
                                        </div>
                                        <div className="custom-control custom-radio">
                                            <input className="custom-control-input" type="radio" id="customRadio3" name="customRadio"
                                                value="Geriatric" //i changed this
                                                checked={this.state.nurseType === "Geriatric Nurse"}
                                                onChange={this.onChangeType} />
                                            <label htmlFor="customRadio3" className="custom-control-label">Geriatric Nurse</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    {/* radio */}
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio" id="customRadio4" name="customRadio"
                                            value="Midwife"
                                            checked={this.state.nurseType === "Midwife"}
                                            onChange={this.onChangeType} />
                                        <label htmlFor="customRadio4" className="custom-control-label">Midwife</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio" id="customRadio5" name="customRadio"
                                            value="Pediatric" //i changed this
                                            checked={this.state.nurseType === "Pediatric Nurse"}
                                            onChange={this.onChangeType} />
                                        <label htmlFor="customRadio5" className="custom-control-label">Pediatric Nurse</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio" id="customRadio6" name="customRadio"
                                            value="Psychiatric"
                                            checked={this.state.nurseType === "Mental Health Nurse"}
                                            onChange={this.onChangeType} />
                                        <label htmlFor="customRadio6" className="custom-control-label">Psychiatric Nurse</label>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>

                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit"
                            className="btn btn-primary"
                            onClick={this.onUpdate}>
                            Submit</button>
                    </div>
                </form>



            </div>
        )
    }
}

export default NurseEdit;