import React, { Component } from 'react'
import axios from '../../../../backend/node_modules/axios';

class NurseEdit extends Component {

    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeTel = this.onChangeTel.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeUniversity = this.onChangeUniversity.bind(this);
        this.onChangeEducation = this.onChangeEducation.bind(this);
        this.onChangeExperience = this.onChangeExperience.bind(this);
        this.onChangeType= this.onChangeType.bind(this);
        

        this.state = {
            Email: '',
            Tel: '',
            Location: '',
            nurseUni:'',
            nurseEdu:'',
            nurseExp:'',
            nurseType:''
        }


    }


    // componentDidMount() { 
    //     axios.get('http://localhost:4000/user/userdata/' + this.props.match.params.id)
    //         .then(response => {
    //             console.log(response.data.profile_data)

    //             this.setState({
    //                 Email:response.data.profile_data.Email,
    //                 Tel:response.data.profile_data.Tel,
    //                 profile_data: response.data.profile_data
    //             })

    //             console.log(response.data.profile_data.Email)
    //         })
    // }

    onChangeEmail=(e)=> {
        console.log(e.target.value);
        this.setState({
            Email: e.target.value
            
        });
    }

    onChangeTel=(e)=> {
        console.log(e.target.value);
        this.setState({
            Tel: e.target.value
        });
    }

    onChangeLocation=(e)=> {
        console.log(e.target.value);
        this.setState({
            Location: e.target.value
        });
    }

    onChangeUniversity=(e)=>{
        console.log(e.target.value);
        this.setState({
            nurseUni: e.target.value
        })
    }

    onChangeEducation=(e)=>{
        console.log(e.target.value);
        this.setState({
            nurseEdu:e.target.value
        })
    }

    onChangeExperience=(e)=>{
        console.log(e.target.value);
        this.setState({
            nurseExp:e.target.value
        })
    }

    onChangeType=(e)=>{
        console.log(e.target.value);
        this.setState({
            nurseType:e.target.value
        })

    }

    onSubmit(e) {
        e.preventDefault();
        const nurseobj = {
            Email: this.state.Email,
            Tel: this.state.Tel,
            Location: this.state.Location,
            nurseUni:this.state.nurseUni,
            nurseEdu:this.state.nurseEdu,
            nurseExp:this.state.nurseExp,
            nurseType:this.state.nurseType
        };
        console.log(nurseobj);
        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, nurseobj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }



    render() {
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
                                placeholder="Enter email" />
                       
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
                                    <option location="Colombo 01">Colombo 01</option>
                                    <option location="Colombo 02">Colombo 02</option>
                                    <option location="Colombo 03">Colombo 03</option>
                                    <option location="Colombo 04">Colombo 04</option>
                                    <option location="Colombo 05">Colombo 05</option>
                                    <option location="Colombo 06">Colombo 06</option>
                                    <option location="Colombo 07">Colombo 07</option>
                                    <option location="Colombo 08">Colombo 08</option>
                                    <option location="Colombo 09">Colombo 09</option>
                                    <option location="Colombo 10">Colombo 10</option>
                                    <option location="Colombo 11">Colombo 11</option>
                                    <option location="Colombo 12">Colombo 12</option>
                                    <option location="Colombo 13">Colombo 13</option>
                                    <option location="Colombo 14">Colombo 14</option>
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
                            <label>Carrier Experience</label>
                            <select multiple 
                            className="form-control"
                            onChange={this.onChangeExperience}>
                                <option experience="1-2 Years">1-2 Years</option>
                                <option experience="3-4 Year">3-4 Year</option>
                                <option experience="5-10 Year">5-10 Year</option>
                                <option experience="Over 10+ Years">Over 10+ Years</option>
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
                                            value="Emergency Nurse"
                                            checked={this.state.nurseType  === "Emergency Nurse"} 
                                            onChange={this.onChangeType}/>
                                            <label htmlFor="customRadio1" className="custom-control-label">Emergency Nurse</label>
                                        </div>
                                        <div className="custom-control custom-radio">
                                            <input className="custom-control-input" type="radio" id="customRadio2" name="customRadio"
                                             value="Surgical Nurse"
                                            checked={this.state.nurseType  === "Surgical Nurse"} 
                                            onChange={this.onChangeType}/>
                                            <label htmlFor="customRadio2" className="custom-control-label">Surgical Nurse</label>
                                        </div>
                                        <div className="custom-control custom-radio">
                                            <input className="custom-control-input" type="radio" id="customRadio3" name="customRadio" 
                                             value="Geriatric Nurse"
                                             checked={this.state.nurseType  === "Geriatric Nurse"} 
                                             onChange={this.onChangeType}/>
                                            <label htmlFor="customRadio3" className="custom-control-label">Geriatric Nurse</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    {/* radio */}
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio" id="customRadio4" name="customRadio"
                                         value="Midwife Nurse"
                                         checked={this.state.nurseType  === "Midwife Nurse"} 
                                         onChange={this.onChangeType}/>
                                        <label htmlFor="customRadio4" className="custom-control-label">Midwife Nurse</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio" id="customRadio5" name="customRadio"
                                         value="perdiactric Nurse"
                                         checked={this.state.nurseType === "perdiactric Nurse"} 
                                         onChange={this.onChangeType}/>
                                        <label htmlFor="customRadio5" className="custom-control-label">perdiactric Nurse</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio" id="customRadio6" name="customRadio"
                                         value="Mental Health Nurse"
                                         checked={this.state.nurseType === "Mental Health Nurse"} 
                                         onChange={this.onChangeType}/>
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