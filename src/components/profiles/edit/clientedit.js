import React, { Component } from 'react'
import axios from '../../../../backend/node_modules/axios';
import ProfilePicUpload from '../profilePicUpload';

function validate (Tele, Address){
    return {
        Tele : Tele.length === 0,
        Address : Address.length === 0,
    };
}

function validateTel (tel){
    const reg = /^(0)(7)([0-9]{8})$/;
    const reg2 = /^(7)([0-9]{8})$/;

    if (reg.test(tel)){
        return reg.test(tel);
    }
    
    else if (reg2.test(tel)){
        return reg2.test(tel);
    }
}

class ClientEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profile_data: null,
            Tel: '',
            Location: '',
            Home:'' ,
            profilePic: '',
             
            touched : {
                Tel: false,
                Home: false,
                Location: false,
                profilePic: false
            }
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
                    Tel: response.data.profile_data.Tel,
                    Home:response.data.profile_data.Home,
                    Location:response.data.profile_data.Location,
                    profilePic:response.data.profile_data.profilePic
                })
            })
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

    onChangeAddress = (e) => {
        console.log(e.target.value);
        this.setState({
            Home: e.target.value
        });
    }

    handleBlur = field => e => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    };

    onUpdate = (e) => {
        e.preventDefault();

        const nurseobj = {
            Tel: this.state.Tel,
            Location: this.state.Location,
            Home:this.state.Home,
            UpdateDate: new Date()
        };
    
        if (!this.canBeSubmitted()) {
            e.preventDefault();
            return;
        }

        else if(!validateTel(this.state.Tel)){
            alert("Enter valid telephone number");
        }

        else {
            const headers = {
                'Content-Type': 'application/json'
            }
        
            var token = localStorage.getItem('id');
            console.log(nurseobj);
            axios.put('http://localhost:4000/user/userdata/update/' + token, nurseobj, { headers: headers })
                .then(response => {
                    alert("Details successfully updated");
                    if (response.data.success) {
                        this.getData()
                        this.props.loadData()
                    }
                });
        }
    }

    canBeSubmitted() {
        const errors = validate(this.state.Tel, this.state.Home);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    render() {
        if (!this.state.profile_data) {
            return (
                <div> <text>Loading</text> </div>
            );
        }
        
        //validating the fields in update form whether filled or not
        const errors = validate(this.state.Tel, this.state.Home);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        //marking the touched but unfilled fields in red
        const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;
        }

        return (
            <div>
                <form role="form">
                    <div className="card-body">
                        {/* Edit Telephone Number */}
                        <div className="form-group">
                             <label htmlFor="exampleInputEmail1">Telephone : {this.state.Tel}</label>
                            <input type="text" className="form-control"
                            value={this.state.Tel}
                            onChange={this.onChangeTel}
                            className={shouldMarkError("Tel") ? "error" : ""}
                            onBlur={this.handleBlur("Tel")}
                            placeholder="Enter Telephone" />
                        </div>

                        {/* Edit Location */} 
                        <div>
                            <div className="form-group">
                                <label htmlFor="inputlocation">Address : {this.state.Home}</label>
                                <input type="text" className="form-control"
                                 value={this.state.Home}
                                onChange={this.onChangeAddress}
                                className={shouldMarkError("Home") ? "error" : ""}
                                onBlur={this.handleBlur("Home")}
                                placeholder="Address"/>
                            </div>                
                            <div className="form-group"> 
                            <label htmlFor="inputlocation">District : {this.state.Location}</label>
                                    <select id="inputState" 
                                    className="form-control"
                                    onChange={this.onChangeLocation}
                                    className={shouldMarkError("Location") ? "error" : ""}
                                    onBlur={this.handleBlur("Location")}
                                    >
                                        <option default>Update District</option>
                                        <option value="Colombo">Colombo</option>
                                        <option value="Galle">Galle</option>
                                        <option value="Gampaha">Gampaha</option>
                                        <option value="Kurunegala">Kurunegala</option>
                                    </select>
                            </div>
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
                        {/* <div className="form-group">
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
                        </div> */}
                        <div><ProfilePicUpload/></div>
                    </div>

                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit"
                        className="btn btn-primary"
                        disabled={isDisabled}
                        onClick={this.onUpdate}>
                            Submit</button>
                    </div>
                </form>
                
                {/* <div><ProfilePicUpload/></div> */}
            </div>
        )
    }
}

export default ClientEdit;