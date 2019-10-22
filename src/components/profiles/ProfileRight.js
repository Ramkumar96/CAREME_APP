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


                {/*First Card in Right Side*/}
                <div className="card card-primary">
                    {/* <div className="card-header">
                    <h3 className="card-title">About Me</h3>
                    </div>
                    /.card-header */}

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

export default ProfileRight;