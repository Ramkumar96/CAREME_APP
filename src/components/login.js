import React from 'react';  
import './style.css';  

class Login extends React.Component {  
  render() {  
        return (  
            <div className='popup'>  
            <div className='popup\_inner'>  
                <h1>{this.props.text}</h1>  
                <button onClick={this.props.closeLogin}>close</button>  
            </div>  
            </div>  
        );  
    }  
}  

export default Login;