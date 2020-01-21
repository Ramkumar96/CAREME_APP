import { VictoryBar, VictoryChart, VictoryPie } from 'victory';
import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import axios from '../../../../backend/node_modules/axios';
import Admindashleftnav from "./admindashleftnav";
import ProfileNavbar from "../ProfileNavbar";
import Modal from 'react-awesome-modal';

class UserReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleUserCount : null,
        }
    }

    closeUserGraph(){
        this.setState({
            visibleUserCount : false
        })
    }

    getUserData (){
        axios.get('http://localhost:4000/user/countNurses')
            .then(response => {
                this.setState({
                    nurseCount : response.data.nurseCount
                })

                console.log(this.state.nurseCount)
            })

        axios.get('http://localhost:4000/user/countClients')
        .then(response => {
            this.setState({
                clientCount : response.data.clientCount,
                visibleUserCount : true
            })

            console.log(this.state.clientCount)
        })
    }

    render() {
        return (
            <div>
                <Admindashleftnav />

                <div>
                    <ProfileNavbar />
                    <div className="content-wrapper">
                        <h1>Hi, welcome to the reports section</h1>
                        <Button onClick={() => this.getUserData()}>User Pie Chart</Button>
                        <Modal visible={this.state.visibleUserCount} width="50%" height="50%" effect="fadeInLeft" onClickAway={() => this.closeUserGraph()}>
                            <div>
                                <VictoryPie 
                                    radius = {20}
                                    colorScale = {["orange", "gold"]}
                                    data = {[
                                        {x: "Nurses\n"+this.state.nurseCount, y:this.state.nurseCount},
                                        {x: "Clients\n"+this.state.clientCount, y:this.state.clientCount}
                                    ]}
                                    style={{ labels: { fontSize: 5, fill: "black"}}}
                                />
                            </div>
                        </Modal>

                        <a href="/userTable">User details table</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserReport;