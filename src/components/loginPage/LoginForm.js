import React, { Component } from "react";
import Navigationbar from '../homepage/navigationbar/Navigationbar';

class LoginForm extends Component {
    state = {
        email: "",
        password:"",

    }
    
    change = e =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    
    render (){
      return (
        <div><Navigationbar/>
        <form>
                <h1>Login</h1>
                <input
                name="email" 
                placeholder = "Email address"
                // type = "email" 
                value={this.state.email} 
                on onChange= {e=> this.change(e)}
                />
                <br/>
                <input
                name="password" 
                type='password'
                placeholder = "Password" 
                value={this.state.password} 
                on onChange= {e=> this.change(e)}
                />
                <br/>
                <button class="btn btn-outline-primary" onClick= {e => this.onSubmit(e)}>Login</button>
            </form>
            </div>
      );
    }
}

export default LoginForm;