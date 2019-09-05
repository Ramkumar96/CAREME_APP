import React,{Component} from "react";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './components/homepage/Homepage';
import InfoForm from './components/registerPage/nurseRegister/infoForm';
import ValidateForm from './components/registerPage/nurseRegister/validateForm';
import ClientForm from './components/registerPage/clientRegister/clientForm';
import LoginForm from './components/loginPage/LoginForm';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {showInfoForm:false};
  }

  toggleInfoForm(){
    this.setState({
        showInfoForm: !this.state.showInfoForm
    });
  }

  render() {
    return (
      <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/infoForm" component={InfoForm} />
        <Route path="/validateForm" component={ValidateForm} />
        <Route path="/clientForm" component={ClientForm} />
        <Route path="/LoginForm" component={LoginForm} />
      </Router>
    );
  }
}

export default App;
