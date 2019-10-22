import React, { Component } from 'react'

class ProfilePic extends Component {
    render() {
        return (
            <div>
                {/* Profile Image */}
                <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                    <div className="text-center">
                    <img className="profile-user-img img-fluid img-circle" src="../../dist/img/user4-128x128.jpg" alt="User profile picture" />
                    </div>
                    <h3 className="profile-username text-center">Nina Mcintire</h3>
                    <p className="text-muted text-center">Software Engineer</p>
                    <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                        <b>Followers</b> <a className="float-right">1,322</a>
                    </li>
                    <li className="list-group-item">
                        <b>Following</b> <a className="float-right">543</a>
                    </li>
                    <li className="list-group-item">
                        <b>Friends</b> <a className="float-right">13,287</a>
                    </li>
                    </ul>                   
                </div>
                {/* /.card-body */}
                </div>


                {/* About Me Box */}
                <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">About Me</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                    <strong><i className="fas fa-book mr-1" /> Education</strong>
                    <p className="text-muted">
                    B.S. in Computer Science from the University of Tennessee at Knoxville
                    </p>
                    <hr />
                    <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                    <p className="text-muted">Malibu, California</p>
                    <hr />
                    <strong><i className="fas fa-pencil-alt mr-1" /> Skills</strong>
                    <p className="text-muted">
                    <span className="tag tag-danger">UI Design</span>
                    <span className="tag tag-success">Coding</span>
                    <span className="tag tag-info">Javascript</span>
                    <span className="tag tag-warning">PHP</span>
                    <span className="tag tag-primary">Node.js</span>
                    </p>
                    <hr />
                    <strong><i className="far fa-file-alt mr-1" /> Notes</strong>
                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
                </div>
                {/* /.card-body */}
                </div>
                {/* /.card */}
    </div> 
        );
    }
}

export default ProfilePic;
