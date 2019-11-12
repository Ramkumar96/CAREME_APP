import React, {Component} from "react";
import '../ProfilePageStyle.css'


class NurseProfilePage extends Component{
    render(){
        return(
            <div>              
              <div className="container-fluid">
                    {/* first row cover photo */}
                   <div className="row">
                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 image-section">
                            <img src="https://png.pngtree.com/thumb_back/fw800/back_pic/00/08/57/41562ad4a92b16a.jpg" alt="cover"/>
                       </div>
                   </div>

                    {/* second row container */}
                   <div className="row">
                       {/* profile photo coloumn */}
                        <div className="col-lg-3 col-md-3 col-sm-0 text-center profile-blue">
                            <img src="//placehold.it/200" className="profile img-fluid img-circle d-block" alt="avatar"/>
                            <br/>
                            <h5>@username</h5> 
                            <span class="badge badge-pill badge-success">Fully Verified Nurse</span>
                            <br/>   
                            <br/>
                            <h6>Member since 2018</h6>  
                            <br/>
                            <h5>6 Reccomendations</h5>
                        </div>



                        {/* profile details coloumn */}
                        <div className="col-lg-6 col-md-6 col-sm-12 profile-blue middle-container">
                            <div className="row">
                                <div className="col-md-8 col-sm-6 col-xs-6">
                                    <h3>RamKumar</h3>
                                    <h5>Professional Nurse</h5>
                                </div> 
                            </div>
                            <br/>
                            <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <label><strong>First Name:</strong></label>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <h6>Expert</h6>
                                    </div>
                            </div>

                            <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <label><strong>Last Name:</strong></label>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <h6>Expert</h6>
                                    </div>
                            </div>

                            <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <label><strong>Email Adress:</strong></label>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <h6>Expert</h6>
                                    </div>
                            </div>

                            <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <label><strong>Telephone:</strong></label>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <h6>Expert</h6>
                                    </div>
                            </div>

                            <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <label><strong>Home Address:</strong></label>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <h6>Expert</h6>
                                    </div>
                            </div>

                            <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <label><strong>Birth of Date:</strong></label>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <h6>Expert</h6>
                                    </div>
                            </div>

                            <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <label><strong>Gender:</strong></label>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <h6>Expert</h6>
                                    </div>
                            </div>

                            <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <label><strong>anything:</strong></label>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <h6>Expert</h6>
                                    </div>
                            </div>
                        </div>


                        {/* Edit Button right side container */}
                        <div className="col-lg col-md-3 col-sm-0 profile-blue right-container">
                            <div className="row">
                                <a href="/Edit" className="btn btn-outline-primary btn-block " >Edit Profile</a>
                            </div> 

                            <div className="text-center container">
                                <h1 className="rating-num">
                                    4.0
                                </h1>
                            </div>

                            <div className="text-center container">
                                <div className="rating">
                                    <span className="glyphicon glyphicon-star"> d</span>
                                    <span className="glyphicon glyphicon-star">d</span>
                                    <span className="glyphicon glyphicon-star">d</span>
                                    <span className="glyphicon glyphicon-star">d</span>
                                    <span className="glyphicon glyphicon-star-empty">d</span>
                                </div>
                            </div> 

                            <div className="row">
                                <a href="/search" className="btn btn-info btn-block" >Search Nurse</a>
                            </div>  
                        </div>
                   </div>

                    {/* third row for review sections */}
                   <div className="row reviewbanner">
                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 image-section">
                            
                       </div>
                   </div>

             
               
                </div>
                
            </div>
        );
    }
}

export default NurseProfilePage;