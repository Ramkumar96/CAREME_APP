import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme, VictoryAxis } from 'victory';
import React, { Component } from 'react';
import axios from '../../../../backend/node_modules/axios';
import Admindashleftnav from "./admindashleftnav";
import ProfileNavbar from "../ProfileNavbar";
import { Button, Form, Col, Row } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';

class TotalUserReport extends Component {
    constructor (props){
        super(props); 

        this.state = {
            userCountDistrict: [],
            nurseTypeCount: [],
            monthLabels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            districts: ["Colombo", "Galle", "Gampaha", "Kurunegala"],
            nurseTypes: ["Emergency", "Surgical", "Geriatric", "Midwife", "Pediatric", "Psychiatric"],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/user/countNurses')
            .then(response => {
                this.setState({
                    totalActiveNurses : response.data.nurseCount
                })

                console.log("The total active nurses now : ", this.state.totalActiveNurses)
            })

        //total number of clients in the system
        axios.get('http://localhost:4000/user/countClients')
            .then(response => {
                this.setState({
                    totalActiveClients : response.data.clientCount
                })

                console.log("The total active clients now : ", this.state.totalActiveClients)
            })

        //all users based on their location
        axios.post('http://localhost:4000/user/countTotalUsersDistrict')
            .then(response => {
                this.setState({
                    resBody: response.data.userCountDistrict
                })

                let j=1;
                for (let i=0; i<4; i++){
                    this.state.userCountDistrict[j] = this.state.resBody[i];
                    j++;
                }

                console.log("The total users according to districts : ", this.state.userCountDistrict)

                this.setState({
                    userCountDistrict: this.state.userCountDistrict
                })
            })

        //all nurses based on their type
        axios.post('http://localhost:4000/user/countTotalNursesType')
            .then(response => {
                this.setState({
                    resBody: response.data.nurseTypeCount
                })

                let j=1;
                for (let i=0; i<6; i++){
                    this.state.nurseTypeCount[j] = this.state.resBody[i];
                    j++;
                }

                console.log("The total nurses according to type : ", this.state.nurseTypeCount)

                this.setState({
                    nurseTypeCount : this.state.nurseTypeCount
                })
            })
    }
    
    render() {
            return (
                <div>
                    <Admindashleftnav />
                    
                    <div>
                        <ProfileNavbar />

                        <div className="content-wrapper"> 
                            <h2 style= {{paddingLeft:15}}>CareMe Total User Statistics</h2>
                            <br/>
                                <div className="box-left">
                                <h3 style= {{paddingLeft:15}}> Total users upto date </h3>
                                <VictoryPie 
                                    radius = {30}
                                    colorScale = {["orange", "gold"]}
                                    innerRadius = {15}
                                    outerRadius = {30}
                                    height = {100}
                                    data = {[
                                        {x: "Nurses\n"+this.state.totalActiveNurses, y:this.state.totalActiveNurses},
                                        {x: "Clients\n"+this.state.totalActiveClients, y:this.state.totalActiveClients}
                                    ]}
                                    style={{ labels: { fontSize: 7}}}
                                />     
                                <br/> 
                                </div>
                            
                                <h3 style= {{paddingLeft:15}}>Total users based on location</h3>
                                <VictoryChart 
                                    maxDomain ={{y:20}}
                                    height = {125}
                                    width = {400}
                                    theme={VictoryTheme.material}
                                    padding={{ top: 10, bottom: 30, left: 80, right: 100 }}
                                    domainPadding={{x:15}}
                                    >

                                    <VictoryAxis dependentAxis
                                        style = {{ tickLabels: {fontSize: 6}}}
                                    />

                                    <VictoryAxis crossAxis
                                        style = {{ tickLabels : {fontSize: 6}}}
                                    />
                                        
                                    <VictoryBar
                                        alignment="middle"
                                        style = {{ data : {fill: "#c43a31"}}}
                                        cornerRadius={{topLeft: 5}}
                                        data={this.state.userCountDistrict}
                                        categories={{ x: this.state.districts }}
                                    />
                                </VictoryChart>
                                    
                                <h3 style= {{paddingLeft:15}}>Total number of nurses based on type</h3>
                                <VictoryChart 
                                    maxDomain ={{y:20}}
                                    height = {125}
                                    width = {400}
                                    theme={VictoryTheme.material}
                                    padding={{ top: 10, bottom: 30, left: 80, right: 100 }}
                                    domainPadding={{x:8}}
                                    >

                                    <VictoryAxis dependentAxis
                                        style = {{ tickLabels: {fontSize: 6}}}
                                    />

                                    <VictoryAxis crossAxis
                                        style = {{ tickLabels : {fontSize: 6}}}
                                    />
                                        
                                    <VictoryBar
                                        alignment="middle"
                                        style = {{ data : {fill: "#c43a31"}}}
                                        cornerRadius={{topLeft: 5}}
                                        data={this.state.nurseTypeCount}
                                        categories={{ x: this.state.nurseTypes }}
                                    />
                                </VictoryChart>
                        </div>
                    </div>
                </div>
            );      
    }
}

export default TotalUserReport;