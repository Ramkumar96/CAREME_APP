import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';





class NurseListProfile extends Component{


    render(){

return (
    <div>
        {/* Default box */}
        <div>
            <div className="card-body pb-0">
            <div className="row d-flex align-items-stretch">
                <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                <div className="card bg-light">
                    <div className="card-header text-muted border-bottom-0">
                    <b>Nurse ID</b> {this.props.nurse_id}
                    </div>
                    <div className="card-body pt-0">
                    <div className="row">
                        <div className="col-7">
                        <h2 className="lead"><b>{this.props.fname} {this.props.lname}</b></h2>
                        <p className="text-muted text-sm"><b>About: </b> Web Designer / UX / Graphic Artist / Coffee Lover </p>
                        <ul className="ml-4 mb-0 fa-ul text-muted">
                            <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building" /></span> Address: Demo Street 123, Demo City 04312, NJ</li>
                            <li className="small"><span className="fa-li"><i className="fas fa-lg fa-phone" /></span> Phone #: + 800 - 12 12 23 52</li>
                        </ul>
                        </div>
                        <div className="col-5 text-center">
                        <img src="../../dist/img/user1-128x128.jpg" alt className="img-circle img-fluid" />
                        </div>
                    </div>
                    </div>
                    <div className="card-footer">
                    <div className="text-right">
                        <a href="#" className="btn btn-sm bg-teal">
                        <i className="fas fa-comments" />
                        </a>
                        <a href="http://localhost:3003/profile" className="btn btn-sm btn-primary">
                        <i className="fas fa-user" /> View Profile
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </div></div></div>
    </div>

        
    )
}
}

export default NurseListProfile