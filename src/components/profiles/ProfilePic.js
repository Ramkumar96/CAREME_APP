import React, { Component } from 'react';
import axios from '../../../backend/node_modules/axios';



class ProfilePic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile_data: null
        }
    }


    componentDidMount() {

        var token = localStorage.getItem('id');
        axios.get('http://localhost:4000/user/userdata/' + token)
            .then(response => {
                console.log(response.data.profile_data)
                this.setState({
                    profile_data: response.data.profile_data
                })
            })
    }



    render() {
    
        // if(!this.state.profile_data){
        //    return(
        //    <div> <text>Loading</text> </div>
        //    );
        // }
        
        // if(this.state.profile_data){
            return (
                <div>
                    {/* Profile Image */}
                    <div className="card card-primary card-outline">
                        <div className="card-body box-profile">
                            <div className="text-center">
                                <img className="profile-user-img img-fluid img-circle" src="../../dist/img/user4-128x128.jpg" alt="User profile picture" />
                            </div>
                            <h3 className="profile-username text-center">name</h3>
                            {/* {this.state.profile_data.FirstName} */}
                            {/* <p className="text-muted text-center">Software Engineer</p> */}
    
                            <ul className="list-group list-group-unbordered mb-3 text-center">
                                <li className="list-group-item">
                                    <h6 className="text-center">@username</h6>
                                </li>
                                <li className="list-group-item">
                                    <h6 className="text-center">Member since 2015</h6>
                                </li>
                                <li className="list-group-item text-center">
                                    <small class="badge badge-success"><i class="far fa-check-circle mr-2"></i>Fully Verified</small>
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
                                B.S. in Nursing from the University of Peradeniya
                        </p>
                            <hr />
                            <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                            <p className="text-muted">Nugegoda,Colombo</p>
                            <hr />
                            <strong><i className="fas fa-pencil-alt mr-1" /> Skills</strong>
                            <p className="text-muted">
                                <span className="tag tag-primary">care</span>
                                <span className="tag tag-primary">injection</span>
                                <span className="tag tag-primary">medicine</span>
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
        // }
        
    }
}

export default ProfilePic;
