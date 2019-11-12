import React, {Component} from "react";
import ProfileNavbar from '../ProfileNavbar';
import ProfilePic from "../ProfilePic";
import NurseProfileInfo from "./nurseProfileInfo";
import ProfileRight from "../ProfileRight";

class NurseMainPage extends Component{
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
                            <NurseProfileInfo/>
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

export default NurseMainPage;