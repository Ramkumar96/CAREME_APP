import React, { Component } from 'react'
import axios from '../../../../backend/node_modules/axios';
import ProfilePicUpload from '../profilePicUpload';
import Dialog from 'react-bootstrap-dialog';

function validateTel(tel) {
    const reg = /^(0)(7)([0-9]{8})$/;
    const reg2 = /^(7)([0-9]{8})$/;

    if (reg.test(tel)) {
        return reg.test(tel);
    }

    else if (reg2.test(tel)) {
        return reg2.test(tel);
    }
}

class NurseEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profile_data: null,
            Tel: '',
            Location: '',
            nurseUni: '',
            nurseEdu: '',
            nurseExp: '',
            nurseType: '',
            Age: '',
            nurseGender: '',

            touched: {
                Age: false,
                nurseGender: false,
                Tel: false,
                Location: false,
                nurseUni: false,
                nurseEdu: false,
                nurseExp: false,
                nurseType: false
            }
        }
    }


    onShowDialog() {
        this.dialog.showAlert("Details added successfully");
    }

    onShowTelephoneError() {
        this.dialog.showAlert("Your telephone number is invalid");
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
                console.log(response.data.profile_data)
                this.setState({
                    profile_data: response.data.profile_data,
                    Email: response.data.profile_data.Email,
                    Tel: response.data.profile_data.Tel,
                    Location: response.data.profile_data.Location,
                    nurseUni: response.data.profile_data.nurseUni,
                    nurseEdu: response.data.profile_data.nurseEdu,
                    nurseExp: response.data.profile_data.nurseExp,
                    nurseType: response.data.profile_data.nurseType,
                    Age: response.data.profile_data.Age,
                    nurseGender: response.data.profile_data.nurseGender,
                })
                console.log(response.data.profile_data)
            })
    }

    onChangeAge = (e) => {
        console.log(e.target.value);
        this.setState({
            Age: e.target.value
        })
    }

    onChangeGender = (e) => {
        console.log(e.target.value);
        this.setState({
            nurseGender: e.target.value
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

    onChangeType = (e) => {
        console.log(e.target.value);
        this.setState({
            nurseType: e.target.value
        })
    }

    handleBlur = field => e => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    };


    /** 
    * @desc: Function to triggered while clicking the submit button
    * will send put request with nurseobj object to backend for updating
    *  the fields in the databse
    */
    onUpdate = (e) => {
        e.preventDefault();

        const nurseobj = {
            Age: this.state.Age,
            nurseGender: this.state.nurseGender,
            Tel: this.state.Tel,
            Location: this.state.Location,
            nurseUni: this.state.nurseUni,
            nurseEdu: this.state.nurseEdu,
            nurseExp: this.state.nurseExp,
            nurseType: this.state.nurseType,
            UpdateDate: new Date()
        };
        if (!validateTel(this.state.Tel)) {
            this.onShowTelephoneError();
        }

        else {
            const headers = {
                'Content-Type': 'application/json'
            }

            var token = localStorage.getItem('id');
            //console.log(nurseobj);
            axios.put('http://localhost:4000/user/userdata/update/' + token, nurseobj, { headers: headers })
                .then(response => {
                    this.onShowDialog();
                    if (response.data.success) {
                        this.getData()
                        this.props.loadData()
                    }
                });
            }
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
                            <span className="mr-2">
                                <label htmlFor="exampleInputEmail1">Age : </label>
                            </span>
                            <input type="text"
                                className="form-control"
                                value={this.state.Age}
                                onChange={this.onChangeAge}
                            />
                        </div>
                        {/* Edit Gender */}
                        <div className="form-group">
                            <span className="mr-2">
                                <label htmlFor="exampleInputEmail1">Gender : </label>
                            </span>
                            <select
                                className="form-control"
                                onChange={this.onChangeGender}
                                value={this.state.Gender}
                            >
                                <option defaultValue> Select Gender </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* Edit Telephone Number */}
                        <div className="form-group">
                            <span className="mr-2">
                                <label htmlFor="telephone">Telephone :</label>
                            </span>
                            <input type="text"
                                className="form-control"
                                value={this.state.Tel}
                                onChange={this.onChangeTel}
                                placeholder="Enter email" />
                        </div>

                        {/* Edit Location */}
                        <div className="form-group">
                            <span className="mr-2">
                                <label htmlFor="exampleInputEmail1">Location :</label>
                            </span>
                            <select id="dropDownLocation"
                                className="form-control"
                                value={this.state.Location}
                                onChange={this.onChangeLocation}>
                                <option defaultValue> Select District </option>
                                <option location="Colombo">Colombo</option>
                                <option location="Gampaha">Gampaha</option>
                                <option location="Kurunegala">Kurunegala</option>
                                <option location="Galle">Galle</option>
                            </select>
                        </div>

                        {/* Edit University */}
                        <div className="form-group">
                            <span className="mr-2">
                                <label htmlFor="university">University :</label>
                            </span>
                            <select id="dropDownUniversity"
                                value={this.state.nurseUni}
                                class="form-control"
                                onChange={this.onChangeUniversity}>
                                {/* <option defaultValue> Select University </option> */}
                                <option university="College of Nursing Colombo">College of Nursing Colombo</option>
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
                            <span className="mr-2">
                                <label htmlFor="educationlevel">Education Level : </label>
                            </span>
                            <select id="dropDownEdu"
                                value={this.state.nurseEdu}
                                class="form-control"
                                onChange={this.onChangeEducation}
                            >
                                <option defaultValue> Select level of education </option>
                                <option education="Diploma in Nursing">Diploma in Nursing</option>
                                <option education="B.Sc degree in Nursing">B.Sc degree in Nursing</option>
                            </select>
                        </div>

                        {/* Update Profile Picture */}
                        <div><ProfilePicUpload /></div>

                        {/* Edit Experience */}
                        <div className="form-group">
                            <span className="mr-2">
                                <label>Carrier Experience (in years) : </label>
                            </span>
                            <select
                                className="form-control"
                                value={this.state.nurseExp}
                                onChange={this.onChangeExperience} >
                                <option defaultValue> Select years of experience </option>
                                <option experience="1-2">1-2</option>
                                <option experience="3-5">3-5</option>
                                <option experience="5-10">5-10</option>
                                <option experience="10+">10+</option>
                            </select>
                        </div>

                        {/* Edit Type category */}
                        <form role="form">
                            <span className="mr-2">
                                <label>Type Category : </label>
                            </span>
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
                                            <label htmlFor="customRadio1" className="custom-control-label default">Emergency Nurse</label>
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
                                                value="Geriatric"
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
                                            value="Pediatric"
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
                            className="btn btn-primary btn-block"
                            onClick={this.onUpdate}>
                            Submit</button>
                    </div>
                </form>

                <Dialog ref={(component) => { this.dialog = component }} />
            </div>
        )
    }
}

export default NurseEdit;