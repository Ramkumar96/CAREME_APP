import React, {Component} from "react";
import Navigationbar from '../homepage/navigationbar/Navigationbar';
import NurseListProfile from './NurseListProfile';
import axios from 'axios';
import { placeholder } from "@babel/types";



/*import NurseProfilePage from './NursePofilePage';
*/
function searchingFor(term){
    return function(x){
        return x.FirstName.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class NurseListMain extends Component{

    constructor(props) {
        super(props);
        this.state = {CAREME_APP: [],
        term:'',};
        

        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event){
        this.setState({term: event.target.value})
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

    //sorting age

    nursesortage = (event) => {
        let fil = this.state.CAREME_APP;
        const selector = event.target.value;

       if(selector ==="1"){
           fil.sort((a,b) => (a.Age > b.Age) ? 1: -1);
           this.setState({CAREME_APP: fil});
       }

    }


  


    render(){
        const {term, CAREME_APP} = this.state;
        let nurse = this.state.CAREME_APP.filter(searchingFor(this.state.term)).map(nurse => {
            return <NurseListProfile fname={nurse.FirstName}
            lname={nurse.LastName} 
            nurse_id={nurse.nurseID}
            age= {nurse.Age}
            exp= {nurse.nurseExp}
            key={nurse._id}
        />})

        return(
            <div>
                <Navigationbar/>
                <form>
                    <input type="text" onChange={this.searchHandler} value={term}/>
                </form>
            <tr>
                <td>
                <div className="form-group">
                    <label>Sort by </label>
                    <select onChange={(event)=>this.nursesortage(event)}>
                        <option>select here</option>
                        <option value={1}>Age</option>
                    </select>
                </div>
                </td>

                <td>
                <div className="form-group">
                    <label>Sort by Experience </label>
                    <select onChange={(event)=>this.nursesortexp(event)}>
                        <option>select Experience</option>
                        <option value={1}>1-2</option>
                        <option value={2}>3-5</option>
                        <option value={3}>5-10</option>
                        <option value={4}>10+</option>
                    </select>
                </div>
                </td>

                <td>

                </td>
            </tr>
                    {nurse}
               
                

                    
            
            </div>
        );
    }
}

export default NurseListMain;