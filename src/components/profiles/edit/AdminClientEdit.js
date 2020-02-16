import React, { Component } from 'react'
import axios from '../../../../backend/node_modules/axios';
import ProfilePicUpload from '../profilePicUpload';
import Dialog from 'react-bootstrap-dialog';

function validate(Tele, Address) {
    return {
        Tele: Tele.length === 0,
        Address: Address.length === 0,
    };
}

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
            Home: this.state.Home,
            UpdateDate: new Date()
        };

        if (!this.canBeSubmitted()) {
            e.preventDefault();
            return;
        }

        else if (!validateTel(this.state.Tel)) {
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
                                className={shouldMarkError("Tel") ? "error" : ""}
                                onBlur={this.handleBlur("Tel")}
                                placeholder="Enter Telephone" />
                        </div>

                        <div className="form-group">
                        <span className="mr-2">
                            <label htmlFor="inputlocation">Address :</label>
                        </span>
                            
                            <input type="text" className="form-control"
                                value={this.state.Home}
                                onChange={this.onChangeAddress}
                                className={shouldMarkError("Home") ? "error" : ""}
                                onBlur={this.handleBlur("Home")}
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

                        <div><ProfilePicUpload /></div>
                    </div>

                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit"
                            className="btn btn-primary btn-block"
                            disabled={isDisabled}
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