import React, {Component} from "react";
import Navigationbar from '../homepage/navigationbar/Navigationbar';
import NurseListProfile from './NurseListProfile';
import axios from 'axios';
import { placeholder } from "@babel/types";
import { display } from "@material-ui/system";
import { NONAME } from "dns";



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
       else if(selector ==="2"){
        fil.sort((a,b) => (a.Age < b.Age) ? 1: -1);
        this.setState({CAREME_APP: fil});
    }

    }

    nursesortexp = (event) => {
        let fil = this.state.CAREME_APP;
        const selector = event.target.value;
        // outside render
        var tenplus = document.getElementsByClassName('tenplus');
        var fiveten = document.getElementsByClassName('fiveten');
        var threefive = document.getElementsByClassName('threefive');
        var onetwo = document.getElementsByClassName('onetwo');

        if(selector =="1"){
            // alert('Hello 01');
            for (var i=0;i<tenplus.length;i+=1){
                tenplus[i].style.display = 'none';
            }
            for (var i=0;i<fiveten.length;i+=1){
                fiveten[i].style.display = 'none';
            }
            for (var i=0;i<threefive.length;i+=1){
                threefive[i].style.display = 'none';
            }
            for (var i=0;i<onetwo.length;i+=1){
                onetwo[i].style.display = 'block';
            }

        }
        else if(selector =="2"){
            // alert('Hello 02');
            var elems1 = document.getElementById('onetwo');
            for (var i=0;i<tenplus.length;i+=1){
                tenplus[i].style.display = 'none';
            }
            for (var i=0;i<fiveten.length;i+=1){
                fiveten[i].style.display = 'none';
            }
            for (var i=0;i<threefive.length;i+=1){
                threefive[i].style.display = 'block';
            }
            for (var i=0;i<onetwo.length;i+=1){
                onetwo[i].style.display = 'none';
            }
        }
        else if(selector =="3"){
            // alert('Hello 03');
            for (var i=0;i<tenplus.length;i+=1){
                tenplus[i].style.display = 'none';
            }
            for (var i=0;i<fiveten.length;i+=1){
                fiveten[i].style.display = 'block';
            }
            for (var i=0;i<threefive.length;i+=1){
                threefive[i].style.display = 'none';
            }
            for (var i=0;i<onetwo.length;i+=1){
                onetwo[i].style.display = 'none';
            }
        }
        else if(selector =="4"){
            // alert('Hello 04');
            for (var i=0;i<tenplus.length;i+=1){
                tenplus[i].style.display = 'block';
            }
            for (var i=0;i<fiveten.length;i+=1){
                fiveten[i].style.display = 'none';
            }
            for (var i=0;i<threefive.length;i+=1){
                threefive[i].style.display = 'none';
            }
            for (var i=0;i<onetwo.length;i+=1){
                onetwo[i].style.display = 'none';
            }
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
            expt= {nurse.nurseExpT}
            loc = {nurse.Location}
            key={nurse._id}
        />})

        return(
            <div>
                <Navigationbar/>
                <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <center>
                <form>
                    <input placeholder="Search to Find The Nurse" class="form-control text-center" width="100%" type="text" onChange={this.searchHandler} value={term}/>
                </form>
                </center>
                </div>
                </div>

                <center>
<br></br>
                <div class="row">   

            <div class="col">
                <div className="form-group">
                    <label>Sort by </label>
                    <select class="form-control" onChange={(event)=>this.nursesortage(event)}>
                        <option>Select the order</option>
                        <option value={1}>Age: Low To High</option>
                        <option value={2}>Age: High - Low</option>
                    </select>
                </div>
            </div>

            <div class="col">
                <div className="form-group">
                    <label>Sort by Experience </label>
                    <select class="form-control" onChange={(event)=>this.nursesortexp(event)}>
                        <option>select Experience</option>
                        <option value={1}>1-2</option>
                        <option value={2}>3-5</option>
                        <option value={3}>5-10</option>
                        <option value={4}>10+</option>
                    </select>
                </div>
            </div>
              

            </div>
            </center>

            </div>
            <div class="container">
            <div class="row">
                    {nurse}
                    </div>
                    </div>
                    
            
            </div>

        );
    }
}

export default NurseListMain;