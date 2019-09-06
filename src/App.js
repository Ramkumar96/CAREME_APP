import React,{Component} from "react";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './components/homepage/Homepage';


class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={HomePage} />
      </Router>
    );
  }
}

export default App;
