import React, { Component } from "react";
import axios from "axios";

export default class ProfilePicUpload extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      profilePic: "",
      _id: ""
    };
  }

  onFileChange(e) {
    this.setState({
      profilePic: e.target.files[0]
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    // const formData = localStorage.getItem(_id);
    formData.append("id", localStorage.getItem("id"));

    formData.append("profilePic", this.state.profilePic);
    axios
      .post("http://localhost:4000/user/user-profile/", formData, {})
      .then(response => {
        alert("Profile photo uploaded");
        console.log(response);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.onSubmit}>
            <span className="mr-2">
              <label htmlFor="exampleInputFile">Profile Picture : </label>
            </span>

            <input type="file" onChange={this.onFileChange} />
            <div className="form-group">
              <button className="btn btn-secondary btn-sm " type="submit">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}