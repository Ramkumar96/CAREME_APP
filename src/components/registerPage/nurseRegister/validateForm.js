import React, { Component } from "react";
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
        <form>
                <input
                name="firstName" 
                placeholder = "Enter your first name here" 
                value={this.state.firstName} 
                on onChange= {e=> this.change(e)}
                />
                <br/>
                <input
                name="lastName" 
                placeholder = "Enter your last name here" 
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
                placeholder = "Enter your Nurses Counsil Registration Number" 
                value={this.state.NIC} 
                on onChange= {e=> this.change(e)}
                />
                <br/><Link to={"/infoForm"} class="btn btn-outline-primary"> Request Membership</Link>
                {/* <button class="btn btn-outline-primary" onClick= {e => this.onSubmit(e)}>Request Membership</button> */}
            </form>
      );
    }
}

export default ValidateForm;