import React, { Component } from 'react'

class ProfileRight extends Component {
    render() {
        return (
            <div>
            
                {/*First Card in Right Side*/}
                <div className="card card-primary">
                    {/* <div className="card-header">
                    <h3 className="card-title">About Me</h3>
                    </div>
                    /.card-header */}

                    <div className="card-body text-center">
                    <strong>Ratings </strong>
                    <p className="text-muted text-center">
                        <i className="fas fa-star mr-1"/> 
                        <i className="fas fa-star mr-1"/> 
                        <i className="fas fa-star mr-1"/> 
                        <i className="fas fa-star mr-1"/> 
                        <i className="fas fa-star mr-1"/> 
                    </p>
                    <hr />
                    <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                    <p className="text-muted">Malibu, California</p>
              
                    <hr />
                    <a href="#" className="btn btn-warning btn-block"><b>Find A Nurse</b></a>
                    </div>
                    {/* /.card-body */}
                </div>
                {/* /.card */}


                {/*Seoond Card in Right Side*/}
                <div className="card card-primary">
                    <div className="card-header text-center">
                    <h3 className="card-title text-center"><strong>Verifications</strong></h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <strong><i className="fas fa-email mr-1" /> Email</strong>
                    <hr />
                    <strong><i className="fas fa-mobile mr-1" /> Phone</strong>
                    <hr />
                    <strong><i className="fas fa-pencil-alt mr-1" />NIC</strong>
                    <hr />
                    <strong><i className="far fa-file-alt mr-1" />Reg No</strong>
                    </div>
                    {/* /.card-body */}
                </div>
                {/* /.card */}




            </div>
           

        );
    }
}

export default ProfileRight;