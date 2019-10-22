import React, {Component} from "react";
import ProfileNavbar from '../ProfileNavbar';
//import ClientProfilePage from './ClientPofilePage';
import ProfilePic from "../ProfilePic";

class ClientMainPage extends Component{
    render(){
        return(
            <div>
                <div class="wrapper">
                <ProfileNavbar/>
                <ProfilePic/>
                </div>
             </div>
        );
    }
}

export default ClientMainPage;