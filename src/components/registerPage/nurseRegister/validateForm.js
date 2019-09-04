import React, { Component } from "react";
import Navigationbar from '../../homepage/navigationbar/Navigationbar';
import { BrowserRouter as Router, Link } from "react-router-dom";

class ValidateForm extends Component {
    state = {
        firstName: "",
        lastName: "",
        NIC:"",
        regNo:"",

    }
    
    change = e =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    
    render (){
      return (
            <div>
                <Navigationbar/>
                <form>
                    <h1>Request Membership</h1>
                    <input
                        name="firstName" 
                        placeholder = "Enter first name" 
                        value={this.state.firstName} 
                        on onChange= {e=> this.change(e)}
                    />
                    <br/>
                    <input
                        name="lastName" 
                        placeholder = "Enter last name" 
                        value={this.state.lastName} 
                        on onChange= {e=> this.change(e)}
                    />
                    <br/>
                    <input
                        name="NIC" 
                        placeholder = "Enter NIC Number" 
                        value={this.state.NIC} 
                        on onChange= {e=> this.change(e)}
                    />
                    <br/>
                    <input
                        name="regNo" 
                        placeholder = "Enter Nurses Counsil Registration Number" 
                        value={this.state.regNo} 
                        on onChange= {e=> this.change(e)}
                    />
                    <br/>
                        <Link to={"/infoForm"} class="btn btn-outline-primary"> Request Membership</Link>
                        {/* <button class="btn btn-outline-primary" onClick= {e => this.onSubmit(e)}>Request Membership</button> */}
                </form>
            </div>
        );
    }
}

export default ValidateForm;