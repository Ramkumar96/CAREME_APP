import React, { Component } from 'react';
import axios from 'axios';

export default class ProfilePicUpload extends Component {
    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            profilePic: ''
        }
    }

    onFileChange(e) {
        this.setState({
            profilePic: e.target.files[0]
        })
    }

    // onUploadProfilePic=(e)=>{
    //     e.preventDefault();
    //     const profile  = {
    //         profilePic: this.state.profilePic
    //     }

    //     const headers = {
    //         'Content-Type': 'application/json'
    //     }

    //     var token = localStorage.getItem('id');
    //     console.log(profile);
    //     axios.put('http://localhost:4000/user/userdata/update/' +token , profile,{headers: headers})
    //     .then(response)
    // };




    onSubmit=(e)=> {
        e.preventDefault()


        const formData ={
            Email:this.state.Email,
            profilePic: this.state.profilePic
        }


        const headers = {
            'Content-Type': 'application/json'
        }

        var token = localStorage.getItem('id');
        // const formData = new FormData()
        // formData.append('profilePic', this.state.profilePic)
        axios.post('http://localhost:4000/user/user-profile/' + token, formData, { headers: headers })
            .then(response => {
                alert("profile poto uploaded")
                console.log(response)
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <h3>Upload Profile Picture</h3>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit" onClick={this.onSubmit}>Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}