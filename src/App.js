import React,{Component} from "react";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './components/homepage/Homepage';
import InfoForm from './components/registerPage/nurseRegister/infoForm';
import ClientForm from './components/registerPage/clientRegister/clientForm';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/infoForm" component={InfoForm} />
        <Route path="/clientForm" component={ClientForm} />
      </Router>
    );
  }
}

export default App;
