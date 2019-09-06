import React,{Component} from "react";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './components/homepage/Homepage';
import LoginForm from './components/loginPage/LoginForm';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/LoginForm" component={LoginForm} />
      </Router>
    );
  }
}

export default App;
