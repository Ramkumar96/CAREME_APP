import React, {Component} from "react";
import ProfileNavbar from '../ProfileNavbar';
import ClientProfilePage from './ClientPofilePage';

class ClientMainPage extends Component{
    render(){
        return(
            <div>
                <ProfileNavbar/>
                <ClientProfilePage/>
                
             </div>
        );
    }
}

export default ClientMainPage;