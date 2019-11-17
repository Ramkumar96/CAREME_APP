import React, { Component } from 'react'
import Admindashleftnav from './admindashleftnav'
import Navigationbar from '../../homepage/navigationbar/Navigationbar'
import Adminup from './adminup'

 


class adminMaindash extends Component {
    render() {
        return (
            <div>
                <Navigationbar />
                <Adminup/>
                <Admindashleftnav/>
               
                
 
 
                
                
            </div>
        )
    }
}

export default adminMaindash;
