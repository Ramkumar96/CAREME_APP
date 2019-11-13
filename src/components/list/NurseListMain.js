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

    nursesort = (event) =>{
       let ab = this.state.CAREME_APP;
       const selector = event.target.value;

       if(selector === "1"){
           ab.sort((a,b) => (a.nurseID < b.nurseID) ? 1 : -1);
           this.setState({CAREME_APP: ab});
       }

       else if(selector === "2"){
        ab.sort((a,b) => (a.age > b.age) ? -1 : 1);
        this.setState({CAREME_APP: ab});
    }
    }


    render(){
        
        let nurse = this.state.CAREME_APP.map(nurse => {
            return <NurseListProfile fname={nurse.nurseFirstName}
            lname={nurse.nurseLastName} 
            nurse_id={nurse.nurseID}
            key={nurse._id}
            type={nurse.userID}
        />})

        return(
            <div align="justify">
                <Navigationbar/>

                <div className="form-group">
                    <label>Select Your Location</label>
                    <select onChange={(event)=>this.nursesort(event)} title="location" className="form-control" value={this.state.NurseLocation} onChange={this.onChangeNurseLocation}>
                    <option value={2}>Age</option>
                      <option value={1}>NurseID</option>
                      
                    </select>
                  </div>
                
               
                {nurse}
    
                
                 
                
             </div>
        );
    }
}

export default NurseListMain;