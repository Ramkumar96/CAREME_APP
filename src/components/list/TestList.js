import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
//import ViewNurseProfile from '../profiles/nurse/ViewNurseProfile';



export default class TestList extends Component {
  constructor(){
    super();
    this.state={
      view_profile:false
    }
  }

 
  render() {
    console.log(this.props)
    return (
      <>
    
   

      <div>
      
        <div className="p-3 ">
          <div id={`${this.props.loc}`} className={`${this.props.loc}`}>

            <div id={`${this.props.exp}`} className={`${this.props.exp}`} >
              <div id={`${this.props.nType}`} className={`${this.props.nType}`}>
                <div className="card " style={{ width: '18rem' }}>
                  <img className="card-img-top" src={this.props.pic} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title"><b>{this.props.fname} {this.props.lname}</b></h5>
                    <p className="card-text"><b>About:</b> {this.props.nType} Nurse </p>
                    <ul className="ml-4 mb-0 fa-ul text-muted">
                      <li className="small"><span className="fa-li"><ion-icon name="person"></ion-icon></span> Age: {this.props.age} Years</li>
                      <li className={`small ${this.props.loct}`} id="loct"><span className="fa-li"><ion-icon name="pin"></ion-icon></span> Location: {this.props.loc}</li>
                      <li className={`small ${this.props.exp}`} id="exp"><span className="fa-li"><ion-icon name="calendar"></ion-icon></span> Experience: {this.props.exp} Years</li>
                    </ul>
                    <center>
                      <div className="text-right">
                       
                        {/* navbar fin nurse button */}
                        {/* <button class="btn btn-sm btn-primary" type="submit" href={'/viewnurseprofile/'+this.props.id}>
                          View Profile
                        </button> */}
                        {/* <button class="btn btn-sm btn-primary" type="submit" >
                          <a href={'/viewnurseprofile/'+this.props.id}><i className="fas fa-user" /> View Profile</a>
                        </button> */}


                      </div></center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
</>
    )
  }
}
