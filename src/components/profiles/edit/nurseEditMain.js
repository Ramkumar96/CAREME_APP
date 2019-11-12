import React, { Component } from 'react';
import Navigationbar from '../../homepage/navigationbar/Navigationbar';
import NurseEditform from './nurseEditform';
import { BrowserRouter as Router, Link } from "react-router-dom";

class nurseEditMain extends Component {
    render() {
        return (
            <div>
                <Navigationbar />
                <NurseEditform />                
            </div>
        );
    }
}

export default nurseEditMain;