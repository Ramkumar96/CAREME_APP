import React,{Component} from "react";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {
  render() {
    return (
         <div>
         <nav class="navbar navbar-expand-lg px-4 bg-light">
            <a class="navbar-brand" href="#">
              Care Me
            </a>

            {/* <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#myNavbar">
              <span class="toggler-icon"> 
                <i class="fas fa-bars"></i>
              </span> 
            </button> */}

            <a class="navbar-brand" href="#">
              How it works
            </a>
            <div>
            <button type="button" class="btn btn-outline-primary">Login</button>
            </div>
          </nav>

              <div class="container-fluid">
                <div class="row max-height justify-content-center align-items-center">
                  <div class="col-10 mx-auto banner text-center">
                      <h1 class="text-capitalize">
                        welcome to <strong class="banner-title">Care Me</strong>
                      </h1>
                        <span>
                        <a href="#store" class="btn banner-link text-uppercase my-2">I want a Nurse</a>
                        </span>
                        <span>
                        <a href="#store" class="btn banner-link text-uppercase my-2">I want a Patient</a>
                        </span>
                  </div>
                </div> 
              </div>
        </div>           
    );
  }
}

export default App;