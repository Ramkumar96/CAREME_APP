import React, { Component } from 'react'
import Admindashleftnav from './admindashleftnav'
import Navigationbar from '../../homepage/navigationbar/Navigationbar'
import Adminup from './adminup'
import ProfileNavbar from '../ProfileNavbar'

class adminMaindash extends Component {
    render() {
        return (
            <div>
                <ProfileNavbar />
                <Adminup/>
                <Admindashleftnav/>
            </div>
        )
    }
}

export default adminMaindash;