import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme, VictoryAxis } from 'victory';
import React, { Component } from 'react';
import axios from '../../../../backend/node_modules/axios';
import Admindashleftnav from "./admindashleftnav";
import ProfileNavbar from "../ProfileNavbar";
import { Button, Form, Col, Row } from 'react-bootstrap';

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
            ratingCountYear : [],
            reviewCountYear : [],
            userCountDistrict: [],
            nurseTypeCount: [],
            monthLabels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            districts: ["Colombo", "Galle", "Gampaha", "Kurunegala"],
            nurseTypes: ["Emergency", "Surgical", "Geriatric", "Midwife", "Pediatric", "Psychiatric"]
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

                axios.post('http://localhost:4000/user/countUsersDistrictMonth', data, {headers: headers})
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

                axios.post('http://localhost:4000/complaint/countNurseComplaints', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            nurseComCount: response.data.nurseComCount
                        })

                        console.log("Number of complaints against nurses this month : ", this.state.nurseComCount);
                    })

                axios.post('http://localhost:4000/complaint/countClientComplaints', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            clientComCount: response.data.clientComCount
                        })

                        console.log("Number of complaints against clients this month : ", this.state.clientComCount);
                    })

                axios.post('http://localhost:4000/user/countNursesTypeMonth', data, {headers: headers})
                    .then(response => {
                        this.setState({
                            resBody: response.data.nurseTypeCount
                        })

                        let j=1;
                        for (let i=0; i<4; i++){
                            this.state.nurseTypeCount[j] = this.state.resBody[i];
                            j++;
                        }

                        console.log("The total nurses according to type : ", this.state.nurseTypeCount)

                        this.setState({
                            nurseTypeCount : this.state.nurseTypeCount
                        })
                    })

                this.setState ({
                    visibleMonthReport: true
                })
            }

            else if (this.state.month==0) {
                axios.post('http://localhost:4000/user/countUsersDistrict', data, {headers: headers})
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

                axios.post('http://localhost:4000/user/countNursesType', data, {headers: headers})
                    .then(response => {
                        this.setState({
                            resBody: response.data.nurseTypeCount
                        })
    
                        let j=1;
                        for (let i=0; i<4; i++){
                            this.state.nurseTypeCount[j] = this.state.resBody[i];
                            j++;
                        }
    
                        console.log("The total nurses according to type : ", this.state.nurseTypeCount)
    
                        this.setState({
                            nurseTypeCount : this.state.nurseTypeCount
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

                axios.post('http://localhost:4000/rating/countRatingsYear', data, {headers: headers})
                .then(response => {
                    this.setState({
                        resBody: response.data.ratingCount
                    })

                    this.state.ratingCountYear[0]=0;
                    let j=1;
                    for (let i=0; i<12; i++){
                        this.state.ratingCountYear[j] = this.state.resBody[i];
                        j++;
                    }

                    console.log("The total ratings this year : ", this.state.ratingCountYear)

                    this.setState({
                        ratingCountYear: this.state.ratingCountYear
                    })
                })

                axios.post('http://localhost:4000/review/countReviewsYear', data, {headers: headers})
                .then(response => {
                    this.setState({
                        resBody: response.data.reviewCount
                    })

                    this.state.reviewCountYear[0]=0;
                    let j=1;
                    for (let i=0; i<12; i++){
                        this.state.reviewCountYear[j] = this.state.resBody[i];
                        j++;
                    }

                    console.log("The total reviews this year : ", this.state.reviewCountYear)

                    this.setState({
                        reviewCountYear: this.state.reviewCountYear
                    })
                })

                this.setState({
                    visibleYearReport : true
                })
            }
        }
    }
    
    render() {
        var newUsers, deacUsers, userRatesRevs, userComplaints;

        if (this.state.activeNurses!=0 || this.state.activeClients!=0){
            newUsers = <VictoryPie 
            radius = {30}
            colorScale = {["orange", "gold"]}
            innerRadius = {15}
            outerRadius = {30}
            height = {85}
            data = {[
                {x: "Nurses\n"+this.state.activeNurses, y:this.state.activeNurses},
                {x: "Clients\n"+this.state.activeClients, y:this.state.activeClients}
            ]}
            style={{ labels: { fontSize: 7}}}
        />
        }

        else {
            newUsers = <h5>No new registered users for this period.</h5>
        }

        if (this.state.deactivatedClients!=0 || this.state.deactivatedNurses!=0){
            deacUsers = <VictoryPie 
                radius = {30}
                colorScale = {["orange", "gold"]}
                innerRadius = {15}
                outerRadius = {30}
                height = {85}
                data = {[
                    {x: "Nurses\n"+this.state.deactivatedNurses, y:this.state.deactivatedNurses},
                    {x: "Clients\n"+this.state.deactivatedClients, y:this.state.deactivatedClients}
                ]}
                style={{ labels: { fontSize: 7}}}
            />
        }

        else {
            deacUsers = <h5>No user deactivations this month</h5>
        }

        if (this.state.ratingCount!=0 || this.state.reviewCount!=0){
            userRatesRevs = <VictoryPie 
                radius = {30}
                colorScale = {["orange", "gold"]}
                innerRadius = {15}
                outerRadius = {30}
                height = {85}
                data = {[
                    {x: "Ratings\n"+this.state.ratingCount, y:this.state.ratingCount},
                    {x: "Reviews\n"+this.state.reviewCount, y:this.state.reviewCount}
                ]}
                style={{ labels: { fontSize: 7}}}
            />
        }
        
        else {
            userRatesRevs = <h5>No user ratings or reviews this month</h5>
        }

        if (this.state.nurseComCount!=0 || this.state.clientComCount!=0){
            userComplaints = <VictoryPie 
                radius = {30}
                colorScale = {["orange", "gold"]}
                innerRadius = {15}
                outerRadius = {30}
                height = {85}
                data = {[
                    {x: "Against nurses\n"+this.state.nurseComCount, y:this.state.nurseComCount},
                    {x: "Against Clients\n"+this.state.clientComCount, y:this.state.clientComCount}
                ]}
                style={{ labels: { fontSize: 7}}}
            />
        }
        
        else {
            userComplaints = <h5>No user complaints this month</h5>
        }

        if (this.state.visibleMonthReport){
            return (
                <div>
                    <Admindashleftnav />
                    
                    <div>
                        <ProfileNavbar />

                        <div className="content-wrapper"> 
                            <h2>CareMe Usage Statistics for the month of {this.state.monthLabels[this.state.month-1]} - {this.state.year}</h2>
                            <br/>
                                <div className="box-left">
                                <h3> User Classification </h3>
                                <VictoryPie 
                                    radius = {30}
                                    colorScale = {["orange", "gold"]}
                                    innerRadius = {15}
                                    outerRadius = {30}
                                    height = {85}
                                    data = {[
                                        {x: "Nurses\n"+this.state.totalActiveNurses, y:this.state.totalActiveNurses},
                                        {x: "Clients\n"+this.state.totalActiveClients, y:this.state.totalActiveClients}
                                    ]}
                                    style={{ labels: { fontSize: 7}}}
                                />     
                                <br/> 
                                </div>
                            
                                <h3> New user registrations for the month </h3>
                                {newUsers}
                                <br/>

                                <h3 style= {{paddingLeft:15}}>User registrations based on location in the month of {this.state.monthLabels[this.state.month-1]} - {this.state.year}</h3>
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
                                    
                                <h3 style= {{paddingLeft:15}}>Nurse registrations based on type in the month of {this.state.monthLabels[this.state.month-1]} -  {this.state.year}</h3>
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

                                <h3> User deactivations for the month </h3>
                                {deacUsers}
                                <br/>

                                <h3> User ratings and reviews for the month </h3>
                                {userRatesRevs}
                                <br/>

                                <h3> User complaints for the month </h3>
                                {userComplaints}
                                <br/>
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
                            <h2> Usage statistics for the year of {this.state.year}</h2>
                            <br/>

                            <h3 style= {{paddingLeft:15}}>User registrations based on location in {this.state.year}</h3>
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

                            <h3 style= {{paddingLeft:15}}>Nurse registrations in {this.state.year}</h3>
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
                                    data={this.state.activeNursesYear}
                                    categories={{ x: this.state.monthLabels }}
                                />
                            </VictoryChart>

                            <h3 style= {{paddingLeft:15}}>Nurse registrations based on type in {this.state.year}</h3>
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

                            <h3 style= {{paddingLeft:15}}>Client registrations in {this.state.year}</h3>

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
                                    style = {{ data : {fill: "#c43a31" }}}
                                    cornerRadius={{topLeft: 5}}
                                    data={this.state.activeClientsYear}
                                    categories={{ x: this.state.monthLabels }}
                                />
                            </VictoryChart>

                            <h3 style= {{paddingLeft:15}}>Nurse deactivations in {this.state.year}</h3>

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
                                    style = {{ data : {fill: "#c43a31" }}}
                                    cornerRadius={{topLeft: 5}}
                                    data={this.state.deacNursesYear}
                                    categories={{ x: this.state.monthLabels }}
                                />
                            </VictoryChart>

                            <h3 style= {{paddingLeft:15}}>Client deactivations in {this.state.year}</h3>

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
                                    style = {{ data : {fill: "#c43a31" }}}
                                    cornerRadius={{topLeft: 5}}
                                    data={this.state.deacClientsYear}
                                    categories={{ x: this.state.monthLabels }}
                                />
                            </VictoryChart>

                            <h3 style= {{paddingLeft:15}}>User ratings in {this.state.year}</h3>

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
                                    style = {{ data : {fill: "#c43a31" }}}
                                    cornerRadius={{topLeft: 5}}
                                    data={this.state.ratingCountYear}
                                    categories={{ x: this.state.monthLabels }}
                                />
                            </VictoryChart>

                            <h3 style= {{paddingLeft:15}}>User reviews in {this.state.year}</h3>

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
                                    style = {{ data : {fill: "#c43a31" }}}
                                    cornerRadius={{topLeft: 5}}
                                    data={this.state.reviewCountYear}
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