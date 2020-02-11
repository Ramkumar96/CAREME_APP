import { VictoryBar, VictoryLabel, VictoryChart, VictoryPie, VictoryTheme, VictoryLine } from 'victory';
import React, { Component } from 'react';
import axios from '../../../../backend/node_modules/axios';
import Admindashleftnav from "./admindashleftnav";
import ProfileNavbar from "../ProfileNavbar";
import { textAlign, fontSize } from '@material-ui/system';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { yellow } from '@material-ui/core/colors';
import { Chart } from "chart.js";

class UserReport extends Component {
    constructor (props){
        super(props); 
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onSubmitRequest = this.onSubmitRequest.bind(this);

        this.state = {
            visibleMonthReport : false,
            visibleYearReport : false,
            activeNursesYear : [],
            activeClientsYear : [],
            deacClientsYear : [],
            deacNursesYear : [],
            monthLabels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
    }

    onChangeMonth(e){
        this.setState({
            month: e.target.value
        })
    }

    onChangeYear(e){
        this.setState({
            year: e.target.value
        })
    }

    onSubmitRequest(e){
        e.preventDefault();

        if (this.state.month==-1 || this.state.year==-1){
            alert("Please select period for report generation");
        }

        else {
            const data = {
                month: this.state.month,
                year: this.state.year
            }

            const headers = {
                'Content-Type': 'application/json'
            }

            console.log(data);

            if (this.state.month!=0){
                axios.get('http://localhost:4000/user/countNurses')
                    .then(response => {
                        this.setState({
                            totalActiveNurses : response.data.nurseCount
                        })

                        console.log("The total active nurses now : ", this.state.totalActiveNurses)
                    })

                axios.get('http://localhost:4000/user/countClients')
                    .then(response => {
                        this.setState({
                            totalActiveClients : response.data.clientCount
                        })

                        console.log("The total active clients now : ", this.state.totalActiveClients)
                    })


                axios.post('http://localhost:4000/user/countNursesMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            activeNurses: response.data.nurseCount
                        })

                        console.log("Number of nurses registered this month : ", this.state.activeNurses);
                    })

                axios.post('http://localhost:4000/user/countClientsMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            activeClients: response.data.clientCount
                        })

                        console.log("Number of clients registered this month : ", this.state.activeClients);
                    })

                axios.post('http://localhost:4000/userDeac/countNursesMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            deactivatedNurses: response.data.nurseCount
                        })

                        console.log("Number of nurses deactivated this month : ", this.state.deactivatedNurses);
                    })

                axios.post('http://localhost:4000/userDeac/countClientsMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            deactivatedClients: response.data.clientCount
                        })

                        console.log("Number of clients deactivated this month : ", this.state.deactivatedClients);
                    })
                
                axios.post('http://localhost:4000/rating/countRatings', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            ratingCount: response.data.ratingCount
                        })

                        console.log("Number of ratings this month : ", this.state.ratingCount);
                    })
            
                axios.post('http://localhost:4000/review/countReviews', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            reviewCount: response.data.reviewCount
                        })

                        console.log("Number of reviews this month : ", this.state.reviewCount);
                    })

                this.setState ({
                    visibleMonthReport: true
                })
            }

            else if (this.state.month==0) {
                axios.post('http://localhost:4000/user/countNursesYear', data, {headers: headers})
                    .then(response => {
                        this.setState({
                            resBody: response.data.nurseCount
                        })

                        this.state.activeNursesYear[0]=0;
                        let j=1;
                        for (let i=0; i<12; i++){
                            this.state.activeNursesYear[j] = this.state.resBody[i];
                            j++;
                        }

                        console.log("The total active nurses now : ", this.state.activeNursesYear)

                        this.setState({
                            activeNursesYear: this.state.activeNursesYear
                        })
                    })

                axios.post('http://localhost:4000/user/countClientsYear', data, {headers: headers})
                .then(response => {
                    this.setState({
                        resBody: response.data.clientCount
                    })

                    this.state.activeClientsYear[0]=0;
                    let j=1;
                    for (let i=0; i<12; i++){
                        this.state.activeClientsYear[j] = this.state.resBody[i];
                        j++;
                    }

                    console.log("The total active clients now : ", this.state.activeClientsYear)

                    this.setState({
                        activeClientsYear: this.state.activeClientsYear
                    })
                })

                axios.post('http://localhost:4000/userDeac/countClientsYear', data, {headers: headers})
                .then(response => {
                    this.setState({
                        resBody: response.data.clientCount
                    })

                    this.state.deacClientsYear[0]=0;
                    let j=1;
                    for (let i=0; i<12; i++){
                        this.state.deacClientsYear[j] = this.state.resBody[i];
                        j++;
                    }

                    console.log("The total deactivated clients now : ", this.state.deacClientsYear)

                    this.setState({
                        deacClientsYear: this.state.deacClientsYear
                    })
                })

                axios.post('http://localhost:4000/userDeac/countNursesYear', data, {headers: headers})
                .then(response => {
                    this.setState({
                        resBody: response.data.nurseCount
                    })

                    this.state.deacNursesYear[0]=0;
                    let j=1;
                    for (let i=0; i<12; i++){
                        this.state.deacNursesYear[j] = this.state.resBody[i];
                        j++;
                    }

                    console.log("The total deactivated nurses now : ", this.state.deacNursesYear)

                    this.setState({
                        deacNursesYear: this.state.deacNursesYear
                    })
                })

                this.setState({
                    visibleYearReport : true
                })
            }
        }
    }
    
    render() {
        if (this.state.visibleMonthReport){
            return (
                <div>
                    <Admindashleftnav />
                    
                    <div>
                        <ProfileNavbar />

                        <div className="content-wrapper"> 
                        <div>
                                <h2> User Classification </h2>
                                    <VictoryPie 
                                        radius = {30}
                                        padding = {{top: 10}}
                                        colorScale = {["orange", "gold"]}
                                        data = {[
                                            {x: "Nurses\n"+this.state.totalActiveNurses, y:this.state.totalActiveNurses},
                                            {x: "Clients\n"+this.state.totalActiveClients, y:this.state.totalActiveClients}
                                        ]}
                                        style={{ labels: { fontSize: 7}}}
                                    />
                                </div>

                                <h2> New user registrations for the month </h2>

                                <VictoryPie 
                                    radius = {30}
                                    colorScale = {["blue", "cyan"]}
                                    data = {[
                                        {x: "Nurses\n"+this.state.activeNurses, y:this.state.activeNurses},
                                        {x: "Clients\n"+this.state.activeClients, y:this.state.activeClients}
                                    ]}
                                    style={{ labels: { fontSize: 7}}}
                                />

                                <h2> User deactivations for the month </h2>

                                <VictoryPie 
                                    radius = {30}
                                    colorScale = {["black", "grey"]}
                                    data = {[
                                        {x: "Nurses\n"+this.state.deactivatedNurses, y:this.state.deactivatedNurses},
                                        {x: "Clients\n"+this.state.deactivatedClients, y:this.state.deactivatedClients}
                                    ]}
                                    style={{ labels: { fontSize: 7}}}
                                />

                                <h2> User ratings and reviews for the month </h2>

                                <VictoryPie 
                                    radius = {30}
                                    colorScale = {["orange", "gold"]}
                                    data = {[
                                        {x: "Ratings\n"+this.state.ratingCount, y:this.state.ratingCount},
                                        {x: "Reviews\n"+this.state.reviewCount, y:this.state.reviewCount}
                                    ]}
                                    style={{ labels: { fontSize: 7}}}
                                />
                        </div>
                    </div>
                </div>
            );
        }

        else if (this.state.visibleYearReport){
            return (
                <div>
                    <Admindashleftnav />

                    <div>
                        <ProfileNavbar />

                        <div className="content-wrapper">
                            <h2>Nurse registrations in {this.state.year}</h2>

                            <VictoryChart 
                                maxDomain ={{y:20}}
                                height = {200}
                                width = {500}
                                theme={VictoryTheme.material}
                                padding={{ top: 20, bottom: 40, left: 80, right: 100 }}
                                domainPadding={{x:10}}
                                >
                                    
                                <VictoryBar
                                    alignment="middle"
                                    style = {{ data : {fill: "#c43a31"}}}
                                    cornerRadius={{topLeft: 10}}
                                    data={this.state.activeNursesYear}
                                    categories={{ x: this.state.monthLabels }}
                                />
                            </VictoryChart>

                            <h2>Client registrations in {this.state.year}</h2>

                            <VictoryChart
                                maxDomain ={{y:20}}
                                height = {200}
                                width = {500}
                                theme={VictoryTheme.material}
                                padding={{ top: 20, bottom: 40, left: 80, right: 100 }}
                                domainPadding={{x:10}}
                                >
                                    
                                <VictoryBar
                                    alignment="middle"
                                    style = {{ data : {fill: "#c43a31" }}}
                                    cornerRadius={{topLeft: 10}}
                                    data={this.state.activeClientsYear}
                                    categories={{ x: this.state.monthLabels }}
                                />
                            </VictoryChart>

                            <h2>Nurse deactivations in {this.state.year}</h2>

                            <VictoryChart
                                maxDomain ={{y:20}}
                                height = {200}
                                width = {500}
                                theme={VictoryTheme.material}
                                padding={{ top: 20, bottom: 40, left: 80, right: 100 }}
                                domainPadding={{x:10}}
                                >
                                    
                                <VictoryBar
                                    alignment="middle"
                                    style = {{ data : {fill: "#c43a31" }}}
                                    cornerRadius={{topLeft: 10}}
                                    data={this.state.deacNursesYear}
                                    categories={{ x: this.state.monthLabels }}
                                />
                            </VictoryChart>

                            <h2>Client deactivations in {this.state.year}</h2>

                            <VictoryChart
                                maxDomain ={{y:20}}
                                height = {200}
                                width = {500}
                                theme={VictoryTheme.material}
                                padding={{ top: 20, bottom: 40, left: 80, right: 100 }}
                                domainPadding={{x:10}}
                                >
                                    
                                <VictoryBar
                                    alignment="middle"
                                    style = {{ data : {fill: "#c43a31" }}}
                                    cornerRadius={{topLeft: 10}}
                                    data={this.state.deacClientsYear}
                                    categories={{ x: this.state.monthLabels }}
                                />
                            </VictoryChart>
                        </div>
                    </div>
                </div>
            );
        }   

        return (
            <div>
                <Admindashleftnav />

                <div>
                    <ProfileNavbar />
                    <div className="content-wrapper">
                        <h2>User Reports</h2>

                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <select class="form-control" onChange={(event)=>this.onChangeYear(event)}>
                                        <option value={-1} selected>Select Year</option>
                                        <option value={2020}>2020</option>
                                        <option value={2019}>2019</option>
                                    </select>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <select class="form-control" onChange={(event)=>this.onChangeMonth(event)} placeholder="Select sub period">
                                        <option value={-1} selected>Select subperiod</option>
                                        <option value={0}>Complete Year</option>
                                        <option value={1}>January</option>
                                        <option value={2}>February</option>
                                        <option value={3}>March</option>
                                        <option value={4}>April</option>
                                        <option value={5}>May</option>
                                        <option value={6}>June</option>
                                        <option value={7}>July</option>
                                        <option value={8}>August</option>
                                        <option value={9}>September</option>
                                        <option value={10}>October</option>
                                        <option value={11}>November</option>
                                        <option value={12}>December</option>
                                    </select>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Button type="submit" variant="primary" onClick={this.onSubmitRequest.bind(this)}>Generate Report</Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserReport;