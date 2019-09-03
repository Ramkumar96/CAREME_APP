import React,{Component} from "react";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import Login from './components/login';  
import Homepage from './components/homepage/Homepage';


class App extends Component {

  render() {
    return (
      <div>
        <Homepage/>
      </div>         
    );
  }
}

export default App;