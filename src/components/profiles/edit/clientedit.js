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

class ClientEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profile_data: null,
            Tel: '',
            Location: '',
            Home: '',
            profilePic: '',

            touched: {
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
                    Home: response.data.profile_data.Home,
                    Location: response.data.profile_data.Location,
                    profilePic: response.data.profile_data.profilePic
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

    onShowDialog() {
        this.dialog.showAlert("Details added successfully");
    }

    onShowTelephoneError() {
        this.dialog.showAlert("Your telephone number is invalid");
    }


    /** 
    * @desc: Function to triggered while clicking the submit button
    * will send put request with nurseobj object to backend for updating
    *  the fields in the databse
    */

    onUpdate = (e) => {
        e.preventDefault();

        const nurseobj = {
            Tel: this.state.Tel,
            Location: this.state.Location,
            Home: this.state.Home,
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
            console.log(nurseobj);
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
                <form >
                    <div className="card-body">
                        {/* Edit Telephone Number */}
                        <div className="form-group">
                            <span className="mr-2">
                                <label htmlFor="exampleInputEmail1">Telephone :</label>
                            </span>
                            <input type="text" className="form-control"
                                value={this.state.Tel}
                                onChange={this.onChangeTel}
                                placeholder="Enter Telephone" />
                        </div>

                        {/* Edit the Address */}
                        <div className="form-group">
                            <span className="mr-2">
                                <label htmlFor="inputlocation">Address :</label>
                            </span>
                            <input type="text" className="form-control"
                                value={this.state.Home}
                                onChange={this.onChangeAddress}
                                placeholder="Address" />
                        </div>
                        <div className="form-group">
                            <span className="mr-2">
                                <label htmlFor="inputlocation">District : </label>
                            </span>
                            <select id="inputState"
                                value={this.state.Location}
                                className="form-control"
                                onChange={this.onChangeLocation}
                            >
                                <option default>Update District</option>
                                <option value="Colombo">Colombo</option>
                                <option value="Galle">Galle</option>
                                <option value="Gampaha">Gampaha</option>
                                <option value="Kurunegala">Kurunegala</option>
                            </select>
                        </div>


                        {/* Edit Profile Picture */}
                        <div><ProfilePicUpload /></div>
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
                {/* <div><ProfilePicUpload/></div> */}
            </div>
        )
    }
}

export default ClientEdit;