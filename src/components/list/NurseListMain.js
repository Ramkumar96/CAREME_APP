import React, {Component} from "react";
import Navigationbar from '../homepage/navigationbar/Navigationbar';
//import NurseListProfile from './NurseListProfile';
import axios from 'axios';
//import { NONAME } from "dns";
import TestList from "./TestList";

/*import NurseProfilePage from './NursePofilePage';
*/
function searchingFor(term){
    //Edited coding start
    var names = term.trim().split(" ");
    console.log(term);
    console.log(names);
    //Edited coding end
    if(names.length>1){
        return function(x){
            return (x.FirstName.toLowerCase().includes(names[0].toLowerCase()) && x.LastName.toLowerCase().includes(names[1].toLowerCase()))  || !term;
        }
    }else{
        return function(x){
            return (x.FirstName.toLowerCase().includes(names[0].toLowerCase()) || x.LastName.toLowerCase().includes(names[0].toLowerCase()))  || !term;
        }
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
        this.setState({term: event.target.value});
         if(event.target.value==''){
            window.location.reload();
        }
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
        var tenplus = document.getElementsByClassName('10+');
        var fiveten = document.getElementsByClassName('5-10');
        var threefive = document.getElementsByClassName('3-5');
        var onetwo = document.getElementsByClassName('1-2');
        var zero = document.getElementsByClassName('null');

        if(selector ==="0"){
            //alert('Hello 01');
            for (var i=0;i<tenplus.length;i+=1){
                tenplus[i].style.display = 'block';
            }
            for (var i=0;i<fiveten.length;i+=1){
                fiveten[i].style.display = 'block';
            }
            for (var i=0;i<threefive.length;i+=1){
                threefive[i].style.display = 'block';
            }
            for (var i=0;i<onetwo.length;i+=1){
                onetwo[i].style.display = 'block';
            }
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }
        }
        
        if(selector ==="1"){
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
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }

        }
        else if(selector ==="2"){
            // alert('Hello 02');
            
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
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }
        }
        else if(selector ==="3"){
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
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }
        }
        else if(selector ==="4"){
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
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }
        }
    }



    nursesortloc = (event) => {
        let fil = this.state.CAREME_APP;
        const selector = event.target.value;
        // outside render
        var colombo = document.getElementsByClassName('Colombo');
        var gampaha = document.getElementsByClassName('Gampaha');
        var galle = document.getElementsByClassName('Galle');
        var kurunegala = document.getElementsByClassName('Kurunegala');
        var zero = document.getElementsByClassName('null');

        if(selector ==="0"){
            // alert('Hello 01');
            
            for (var i=0;i<colombo.length;i+=1){
                colombo[i].style.display = 'block';
            }
            for (var i=0;i<gampaha.length;i+=1){
                gampaha[i].style.display = 'block';
            }
            for (var i=0;i<galle.length;i+=1){
                galle[i].style.display = 'block';
            }
            for (var i=0;i<kurunegala.length;i+=1){
                kurunegala[i].style.display = 'block';
            }
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }

        }
        
        
        if(selector ==="1"){
            // alert('Hello 01');

            for (var i=0;i<colombo.length;i+=1){
                colombo[i].style.display = 'block';
            }
            for (var i=0;i<gampaha.length;i+=1){
                gampaha[i].style.display = 'none';
            }
            for (var i=0;i<galle.length;i+=1){
                galle[i].style.display = 'none';
            }
            for (var i=0;i<kurunegala.length;i+=1){
                kurunegala[i].style.display = 'none';
            }
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }

        }
        else if(selector ==="2"){
            // alert('Hello 02');
            var elems1 = document.getElementById('colombo');
            for (var i=0;i<colombo.length;i+=1){
                colombo[i].style.display = 'none';
            }
            for (var i=0;i<gampaha.length;i+=1){
                gampaha[i].style.display = 'block';
            }
            for (var i=0;i<galle.length;i+=1){
                galle[i].style.display = 'none';
            }
            for (var i=0;i<kurunegala.length;i+=1){
                kurunegala[i].style.display = 'none';
            }
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }
        }
        else if(selector ==="3"){
            // alert('Hello 03');
            for (var i=0;i<colombo.length;i+=1){
                colombo[i].style.display = 'none';
            }
            for (var i=0;i<gampaha.length;i+=1){
                gampaha[i].style.display = 'none';
            }
            for (var i=0;i<galle.length;i+=1){
                galle[i].style.display = 'block';
            }
            for (var i=0;i<kurunegala.length;i+=1){
                kurunegala[i].style.display = 'none';
            }
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }
        }
        else if(selector ==="4"){
            // alert('Hello 04');
            for (var i=0;i<colombo.length;i+=1){
                colombo[i].style.display = 'none';
            }
            for (var i=0;i<gampaha.length;i+=1){
                gampaha[i].style.display = 'none';
            }
            for (var i=0;i<galle.length;i+=1){
                galle[i].style.display = 'none';
            }
            for (var i=0;i<kurunegala.length;i+=1){
                kurunegala[i].style.display = 'block';
            }
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }
        }
    }


    nursesorttype = (event) => {
        let fil = this.state.CAREME_APP;
        const selector = event.target.value;
        // outside render
        var emerg = document.getElementsByClassName('Emergency');
        var surg = document.getElementsByClassName('Surgical');
        var geri = document.getElementsByClassName('Geriatric');
        var mid = document.getElementsByClassName('Midwife');
        var peri = document.getElementsByClassName('Pediatric');
        var ment = document.getElementsByClassName('Psychiatric');
        var zero = document.getElementsByClassName('null');
        
        if(selector ==="0"){
            // alert('Hello 01');
            for (var i=0;i<emerg.length;i+=1){
                emerg[i].style.display = 'block';
            }
            for (var i=0;i<surg.length;i+=1){
                surg[i].style.display = 'block';
            }
            for (var i=0;i<geri.length;i+=1){
                geri[i].style.display = 'block';
            }
            for (var i=0;i<mid.length;i+=1){
                mid[i].style.display = 'block';
            }    
            for (var i=0;i<peri.length;i+=1){
                peri[i].style.display = 'block';
            }        
            for (var i=0;i<ment.length;i+=1){
                ment[i].style.display = 'block';
            }
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }

        }
        
        
        if(selector ==="1"){
            // alert('Hello 01');
            for (var i=0;i<emerg.length;i+=1){
                emerg[i].style.display = 'block';
            }
            for (var i=0;i<surg.length;i+=1){
                surg[i].style.display = 'none';
            }
            for (var i=0;i<geri.length;i+=1){
                geri[i].style.display = 'none';
            }
            for (var i=0;i<mid.length;i+=1){
                mid[i].style.display = 'none';
            }    
            for (var i=0;i<peri.length;i+=1){
                peri[i].style.display = 'none';
            }        
            for (var i=0;i<ment.length;i+=1){
                ment[i].style.display = 'none';
            }
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }

        }
        else if(selector ==="2"){
            // alert('Hello 02');
            var elems1 = document.getElementById('colombo');
            for (var i=0;i<emerg.length;i+=1){
                emerg[i].style.display = 'none';
            }
            for (var i=0;i<surg.length;i+=1){
                surg[i].style.display = 'block';
            }
            for (var i=0;i<geri.length;i+=1){
                geri[i].style.display = 'none';
            }
            for (var i=0;i<mid.length;i+=1){
                mid[i].style.display = 'none';
            }    
            for (var i=0;i<peri.length;i+=1){
                peri[i].style.display = 'none';
            }        
            for (var i=0;i<ment.length;i+=1){
                ment[i].style.display = 'none';
            }
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }

        }
        else if(selector ==="3"){
            // alert('Hello 03');
            for (var i=0;i<emerg.length;i+=1){
                emerg[i].style.display = 'none';
            }
            for (var i=0;i<surg.length;i+=1){
                surg[i].style.display = 'none';
            }
            for (var i=0;i<geri.length;i+=1){
                geri[i].style.display = 'block';
            }
            for (var i=0;i<mid.length;i+=1){
                mid[i].style.display = 'none';
            }    
            for (var i=0;i<peri.length;i+=1){
                peri[i].style.display = 'none';
            }        
            for (var i=0;i<ment.length;i+=1){
                ment[i].style.display = 'none';
            }
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }

        }
        else if(selector ==="4"){
            // alert('Hello 04');
            for (var i=0;i<emerg.length;i+=1){
                emerg[i].style.display = 'none';
            }
            for (var i=0;i<surg.length;i+=1){
                surg[i].style.display = 'none';
            }
            for (var i=0;i<geri.length;i+=1){
                geri[i].style.display = 'none';
            }
            for (var i=0;i<mid.length;i+=1){
                mid[i].style.display = 'block';
            }    
            for (var i=0;i<peri.length;i+=1){
                peri[i].style.display = 'none';
            }        
            for (var i=0;i<ment.length;i+=1){
                ment[i].style.display = 'none';
            }
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }

        }
        else if(selector ==="5"){
            // alert('Hello 04');
            for (var i=0;i<emerg.length;i+=1){
                emerg[i].style.display = 'none';
            }
            for (var i=0;i<surg.length;i+=1){
                surg[i].style.display = 'none';
            }
            for (var i=0;i<geri.length;i+=1){
                geri[i].style.display = 'none';
            }
            for (var i=0;i<mid.length;i+=1){
                mid[i].style.display = 'none';
            }    
            for (var i=0;i<peri.length;i+=1){
                peri[i].style.display = 'block';
            }        
            for (var i=0;i<ment.length;i+=1){
                ment[i].style.display = 'none';
            }
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }
            
        }
        else if(selector ==="6"){
            // alert('Hello 04');
            for (var i=0;i<emerg.length;i+=1){
                emerg[i].style.display = 'none';
            }
            for (var i=0;i<surg.length;i+=1){
                surg[i].style.display = 'none';
            }
            for (var i=0;i<geri.length;i+=1){
                geri[i].style.display = 'none';
            }
            for (var i=0;i<mid.length;i+=1){
                mid[i].style.display = 'none';
            }    
            for (var i=0;i<peri.length;i+=1){
                peri[i].style.display = 'none';
            }        
            for (var i=0;i<ment.length;i+=1){
                ment[i].style.display = 'block';
            }
            for (var i=0;i<zero.length;i+=1){
                zero[i].style.display = 'none';
            }
            
        }
    }
    
    


  


    render(){
        const {term, CAREME_APP} = this.state;
        let nurse = this.state.CAREME_APP.filter(searchingFor(this.state.term)).map(nurse => {
            if(!nurse.Age)
            return;
            return <TestList fname={nurse.FirstName}
            lname={nurse.LastName} 
            nurse_id={nurse.nurseID}
            age= {nurse.Age}
            exp= {nurse.nurseExp}
           id={nurse._id}
            loc= {nurse.Location}
            nType= {nurse.nurseType}
            key={nurse._id}
            nurse_data={nurse}
        />})

        return(
            <div>
                <Navigationbar/>
                <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <center>
                <form>
                    <input placeholder="Search by Name" class="form-control text-center" width="100%" type="text" onChange={this.searchHandler} value={term}/>
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
                        <option>Select by Age</option>
                        <option value={1}>Age: Low To High</option>
                        <option value={2}>Age: High - Low</option>
                    </select>
                </div>
            </div>

            <div class="col">
                <div className="form-group">
                    <label>Filter by years in experience </label>
                    <select class="form-control" onChange={(event)=>this.nursesortexp(event)}>
                        <option value={0}>Select number of years</option>
                        <option value={1}>1-2</option>
                        <option value={2}>3-5</option>
                        <option value={3}>5-10</option>
                        <option value={4}>10+</option>
                    </select>
                </div>
            </div>

            <div class="col">
                <div className="form-group">
                    <label>Sort by Location </label>
                    <select class="form-control" onChange={(event)=>this.nursesortloc(event)}>
                        <option value={0}>Select district</option>
                        <option value={1}>Colombo</option>
                        <option value={2}>Gampaha</option>
                        <option value={3}>Galle</option>
                        <option value={4}>Kurunegala</option>
                    </select>
                </div>
            </div>
              
            <div class="col">
                <div className="form-group">
                    <label>Sort by Nurse Type </label>
                    <select class="form-control" onChange={(event)=>this.nursesorttype(event)}>
                        <option value={0}>Select Type</option>
                        <option value={1}>Emergency Nurse</option>
                        <option value={2}>Surgical Nurse</option>
                        <option value={3}>Geriatric Nurse</option>
                        <option value={4}>Midwife Nurse</option>
                        <option value={5}>Pediatric Nurse</option>
                        <option value={6}>Psychiatric Nurse</option>
                    </select>
                </div>
            </div>

            </div>
            </center>

            </div>
        
            <div class="container" style={{width: 960}}>
                <div class="row">
                        {nurse}
                </div>
            </div>




   

       
            
    </div>
            

        );
    }
}

export default NurseListMain;