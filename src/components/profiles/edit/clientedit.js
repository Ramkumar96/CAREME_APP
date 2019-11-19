import React, { Component } from 'react'
import axios from '../../../../backend/node_modules/axios';

class ClientEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profile_data: null,
            Email: '',
            Tel: '',
            Location: '',
            Home:''
          
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
                    Location:response.data.profile_data.Location
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

    onChangeAddress = (e) => {
        console.log(e.target.value);
        this.setState({
            Home: e.target.value
        });
    }

    onUpdate = (e) => {
        e.preventDefault();

        const nurseobj = {
            Email: this.state.Email,
            Tel: this.state.Tel,
            Location: this.state.Location,
            Home:this.state.Home
         
        };
        const headers = {
            'Content-Type': 'application/json'
        }
        var token = localStorage.getItem('id');
        console.log(nurseobj);
        axios.put('http://localhost:4000/user/userdata/update/' + token, nurseobj, { headers: headers })
            .then(response => {
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
                            <label htmlFor="exampleInputEmail">Email address:{this.state.Email}</label>
                            <input type="email" className="form-control" 
                            id="exampleInputEmail1" 
                            value={this.state.Email}
                            onChange={this.onChangeEmail}
                            placeholder="Enter email" />
                        </div>

                        {/* Edit Telephone Number */}
                        <div className="form-group">
                             <label htmlFor="exampleInputEmail1">Telephone : {this.state.Tel}</label>
                            <input type="text" className="form-control"
                            value={this.state.Tel}
                            onChange={this.onChangeTel}
                            placeholder="Enter Telephone" />
                        </div>

                        {/* Edit Location */} 
                        <div>
                            <div className="form-group">
                                <label htmlFor="inputlocation">Address:{this.state.Home},{this.state.Location}</label>
                                <input type="text" className="form-control"
                                 value={this.state.Home}
                                onChange={this.onChangeAddress}
                                placeholder="Address"/>
                            </div>                
                            <div className="form-group"> 
                                    <select id="inputState" 
                                    className="form-control"
                                    onChange={this.onChangeLocation}
                                    >
                                        <option selected value="Ampara">Ampara</option>
                                        <option value="Anuradhapura">Anuradhapura</option>
                                        <option value="Badulla">Badulla</option>
                                        <option value="Batticaloa">Batticaloa</option>
                                        <option value="Colombo">Colombo</option>
                                        <option value="Galle">Galle</option>
                                        <option value="AGampaha">Gampaha</option>
                                        <option value="Hambantota">Hambantota</option>
                                        <option value="Jaffna">Jaffna</option>
                                        <option value="Kalutara">Kalutara</option>
                                        <option value="Kandy">Kandy</option>
                                        <option value="Kegalle">Kegalle</option>
                                        <option value="Kilinochchi">Kilinochchi</option>
                                        <option value="Kurunegala">Kurunegala</option>
                                        <option value="Mannar">Mannar</option>
                                        <option value="Matale">Matale</option>
                                        <option value="Matara">Matara</option>
                                        <option value="Monaragala">Monaragala</option>
                                        <option value="Mullaitivu">Mullaitivu</option>
                                        <option value="Nuwara Eliya">Nuwara Eliya</option>
                                        <option value="Polonnaruwa">Polonnaruwa</option>
                                        <option value="Puttalam">Puttalam</option>
                                        <option value="Ratnapura">Ratnapura</option>
                                        <option value="Trincomalee">Trincomalee</option>
                                        <option value="Vavuniya">Vavuniya</option>       
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

export default ClientEdit;