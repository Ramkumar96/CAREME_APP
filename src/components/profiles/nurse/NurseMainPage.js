import React, {Component} from "react";
import ProfileNavbar from '../ProfileNavbar';
import NurseProfilePage from './NursePofilePage';

class ClientMainPage extends Component{
    render(){
        return(
            <div>
                <ProfileNavbar/>
                <NurseProfilePage/>
                
             </div>
        );
    }
}

export default NurseMainPage;