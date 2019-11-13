import React, {Component} from "react";
import Navigationbar from '../homepage/navigationbar/Navigationbar';
import NurseListProfile from './NurseListProfile';
import axios from 'axios';


/*import NurseProfilePage from './NursePofilePage';
*/


class NurseListMain extends Component{

    constructor(props) {
        super(props);
        this.state = {CAREME_APP: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/User/')
            .then(response => {
                this.setState({ CAREME_APP: response.data });
                console.log(this.state.CAREME_APP);
            })
            .catch(function (error){
                console.log(error);
            })
    }



    render(){
        let nurse = this.state.CAREME_APP.map(nurse => {
            return <NurseListProfile fname={nurse.FirstName}
            lname={nurse.LastName} 
            nurse_id={nurse.nurseID}
            key={nurse._id}
        />})

        return(
            <div>
                <Navigationbar/>
                
                <table cellspacing="200">
                <tr>
                    <td>{nurse}</td>
                </tr> 
                </table>
                
                
                    
            
                
                 
                
             </div>
        );
    }
}

export default NurseListMain;