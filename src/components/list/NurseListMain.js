import React, {Component} from "react";
import Navigationbar from '../homepage/navigationbar/Navigationbar';
import NurseListProfile from './NurseListProfile';
import axios from 'axios';



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

    


    render(){
        const {term, CAREME_APP} = this.state;
        let nurse = this.state.CAREME_APP.filter(searchingFor(this.state.term)).map(nurse => {
            return <NurseListProfile fname={nurse.FirstName}
            lname={nurse.LastName} 
            nurse_id={nurse.nurseID}
            key={nurse._id}
        />})

        return(
            <div>
                <Navigationbar/>
                <form>
                    <input type="text" onChange={this.searchHandler} value={term}/>
                </form>
                    {nurse}
               
                

                    
            
            </div>
        );
    }
}

export default NurseListMain;