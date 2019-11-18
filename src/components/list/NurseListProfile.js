import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';





class NurseListProfile extends Component{


    render(){

return (

    
    
    <div class="col-md-6">
        {/* Default box */}
        
        <div id={`${this.props.nType}`} className={`${this.props.nType}`}>
        <div id={`${this.props.loc}`} className={`${this.props.loc}`}>
        <div id={`${ this.props.exp}`} className={`${ this.props.exp}`} >
            <div className="card-body pb-0">
            <div className="row d-flex align-items-stretch">
                <div className="d-flex align-items-stretch">
                <div className="card bg-light">
                    <div className="card-header text-muted border-bottom-0">
                    
                    </div>
                    <div className="card-body pt-0">
                    <div className="row">
                        <div className="col-7">
                        <h2 className="lead"><b>{this.props.fname} {this.props.lname}</b></h2>
                        <p className="text-muted text-sm"><b>About:</b> {this.props.nType} Nurse </p>
                        <ul className="ml-4 mb-0 fa-ul text-muted">
                            <li className="small"><span className="fa-li"><ion-icon name="person"></ion-icon></span> Age: {this.props.age} Years</li>
                            <li className={`small ${ this.props.loct}` } id="loct"><span className="fa-li"><ion-icon name="pin"></ion-icon></span> Location: {this.props.loc}</li>
                            <li className={`small ${ this.props.exp}`}  id="exp"><span className="fa-li"><ion-icon name="calendar"></ion-icon></span> Experience: {this.props.exp} Years</li>
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
            </div></div></div></div></div>
            
    </div>
    

        
    )
}
}

export default NurseListProfile