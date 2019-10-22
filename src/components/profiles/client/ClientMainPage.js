import React, {Component} from "react";
import ProfileNavbar from '../ProfileNavbar';
//import ClientProfilePage from './ClientPofilePage';
import ProfilePic from "../ProfilePic";
import ProfileInfo from "../ProfileInfo";
import ProfileRight from "../ProfileRight";
class ClientMainPage extends Component{
    render(){
        return(
            <div>
                <div class="wrapper">
                
                    <ProfileNavbar/>
                    <br></br>
                    <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3">
                            <ProfilePic/>
                        </div>
                        <div className="col-lg-6">
                            <ProfileInfo/>
                        </div>
                        <div className="col-lg-3">
                            <ProfileRight/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClientMainPage;