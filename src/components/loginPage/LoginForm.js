import React, { Component } from "react";

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
        <form>
                <input
                name="email" 
                placeholder = "Email address" 
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
      );
    }
}

export default LoginForm;