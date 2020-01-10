import React, { Component } from 'react';
import axios from 'axios';

export default class ProfilePicUpload extends Component {
    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            profilePic: '',
            _id: ''
        }
    }

    onFileChange(e) {
        this.setState({
            profilePic: e.target.files[0]
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        // const formData = localStorage.getItem(_id);
        formData.append('id',localStorage.getItem('id'));
        
        formData.append('profilePic', this.state.profilePic);
        axios.post('http://localhost:4000/user/user-profile/', formData, {
         })
            .then(response => {
                alert("profile photo uploaded")
                console.log(response)
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                    <label htmlFor="exampleInputFile">Update your Profile Picture</label>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit" >Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}