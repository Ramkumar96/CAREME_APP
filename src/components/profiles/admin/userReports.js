import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme, VictoryAxis } from 'victory';
import React, { Component } from 'react';
import axios from '../../../../backend/node_modules/axios';
import Admindashleftnav from "./admindashleftnav";
import ProfileNavbar from "../ProfileNavbar";
import { Button, Form, Col, Row } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';

class UserReport extends Component {
    constructor (props){
        super(props); 
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onSubmitRequest = this.onSubmitRequest.bind(this);

        this.state = {
            visibleMonthTotalUsers : false,
            visibleMonthActDeac: false,
            visibleYearActDeac: false,
            visibleMonthRateComps : false,
            visibleYearRateComps : false,
            visibleMonthRequests: false,
            visibleYearRequests: false,
            activeNursesYear : [],
            activeClientsYear : [],
            deacClientsYear : [],
            deacNursesYear : [],
            ratingCountYear : [],
            reviewCountYear : [],
            userCountDistrict: [],
            nurseTypeCount: [],
            acceptedCountYear: [],
            requestCountYear: [],
            deletedCountYear: [],
            monthLabels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            districts: ["Colombo", "Galle", "Gampaha", "Kurunegala"],
            nurseTypes: ["Emergency", "Surgical", "Geriatric", "Midwife", "Pediatric", "Psychiatric"],
            month: -1,
            year: -1,
            reportType: -1
        }
    }

    onChangeMonth(e){
        this.setState({
            month: e.target.value
        })
    }

    onChangeReportType(e){
        this.setState({
            reportType: e.target.value
        })
    }

    onChangeYear(e){
        this.setState({
            year: e.target.value
        })
    }

    onShowErrorDialog(){
        this.dialog.showAlert("Please complete request for report generation");
    }

    onSubmitRequest(e){
        e.preventDefault();

        if (this.state.month==-1 || this.state.year==-1 || this.state.reportType==-1){
            this.onShowErrorDialog();
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

            if (this.state.reportType==0){
                //total number of nurses in the system
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
                axios.post('http://localhost:4000/user/countTotalUsersDistrict', data, {headers: headers})
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
                axios.post('http://localhost:4000/user/countTotalNursesType', data, {headers: headers})
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
                    
                this.setState({
                    visibleMonthTotalUsers: true
                })
            }

            else if (this.state.reportType == 1){
                if (this.state.month!=0){
                    //new clients registered in the month
                    axios.post('http://localhost:4000/user/countClientsMonth', data, {headers: headers})
                        .then(response=> {
                            this.setState({
                                activeClients: response.data.clientCount
                            })

                            console.log("Number of clients registered this month : ", this.state.activeClients);
                        })

                    //new nurses registered this month
                    axios.post('http://localhost:4000/user/countNursesMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            activeNurses: response.data.nurseCount
                        })

                        console.log("Number of nurses registered this month : ", this.state.activeNurses);
                    })

                    //new users registered within the month based on location
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

                    //number of clients deactivated this month
                    axios.post('http://localhost:4000/userDeac/countClientsMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            deactivatedClients: response.data.clientCount
                        })

                        console.log("Number of clients deactivated this month : ", this.state.deactivatedClients);
                    })

                    //number of nurses deactivated this month
                    axios.post('http://localhost:4000/userDeac/countNursesMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            deactivatedNurses: response.data.nurseCount
                        })

                        console.log("Number of nurses deactivated this month : ", this.state.deactivatedNurses);
                    })

                    this.setState({
                        visibleMonthActDeac: true
                    })
                }

                else {
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
                        visibleYearActDeac: true
                    })
                }
            }

            else if (this.state.reportType==2){
                if (this.state.month!=0){
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


                    this.setState({
                        visibleMonthRateComps : true
                    })
                }

                else if (this.state.month==0){
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
                        visibleYearRateComps: true
                    })
                }
            }

            else if (this.state.reportType==3){
                if (this.state.month!=0){
                    axios.post('http://localhost:4000/request/countRequestsMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            requestCount: response.data.requestCount
                        })

                        console.log("Number of requests this month : ", this.state.requestCount);
                    })
            
                    axios.post('http://localhost:4000/accept/countRequestsMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            acceptedCount : response.data.acceptedCount
                        })

                        console.log("Number of requests accepted this month : ", this.state.acceptedCount);
                    })

                    axios.post('http://localhost:4000/requestDeleted/countRequestsMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            deletedCount : response.data.deletedCount
                        })

                        console.log("Number of requests deleted this month : ", this.state.deletedCount);
                    })

                    this.setState({
                        visibleMonthRequests : true
                    })
                }

                else if (this.state.month==0){
                    axios.post('http://localhost:4000/request/countRequestsYear', data, {headers: headers})
                    .then(response => {
                        this.setState({
                            resBody: response.data.requestCount
                        })
    
                        this.state.requestCountYear[0]=0;
                        let j=1;
                        for (let i=0; i<12; i++){
                            this.state.requestCountYear[j] = this.state.resBody[i];
                            j++;
                        }
    
                        console.log("The total requests this year : ", this.state.requestCountYear)
    
                        this.setState({
                            requestCountYear: this.state.requestCountYear
                        })
                    })
    
                    axios.post('http://localhost:4000/accept/countRequestsYear', data, {headers: headers})
                    .then(response => {
                        this.setState({
                            resBody: response.data.acceptedCount
                        })
    
                        this.state.acceptedCountYear[0]=0;
                        let j=1;
                        for (let i=0; i<12; i++){
                            this.state.acceptedCountYear[j] = this.state.resBody[i];
                            j++;
                        }
    
                        console.log("The total accepted requests this year : ", this.state.acceptedCountYear)
    
                        this.setState({
                            acceptedCountYear: this.state.acceptedCountYear
                        })
                    })

                    axios.post('http://localhost:4000/requestDeleted/countRequestsYear', data, {headers: headers})
                    .then(response => {
                        this.setState({
                            resBody: response.data.deletedCount
                        })
    
                        this.state.deletedCountYear[0]=0;
                        let j=1;
                        for (let i=0; i<12; i++){
                            this.state.deletedCountYear[j] = this.state.resBody[i];
                            j++;
                        }
    
                        console.log("The total deleted requests this year : ", this.state.deletedCountYear)
    
                        this.setState({
                            deletedCountYear: this.state.deletedCountYear
                        })
                    })

                    this.setState({
                        visibleYearRequests: true
                    })
                }
            }
        }
    }
    
    render() {
        var newUsers, deacUsers, userRatesRevs, userComplaints, userRequests;

        if (this.state.activeNurses!=0 || this.state.activeClients!=0){
            newUsers = <VictoryPie 
                radius = {30}
                colorScale = {["orange", "gold"]}
                innerRadius = {15}
                outerRadius = {30}
                height = {150}
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
                height = {150}
                data = {[
                    {x: "Deactivated Nurses\n"+this.state.deactivatedNurses, y:this.state.deactivatedNurses},
                    {x: "Deactivated Clients\n"+this.state.deactivatedClients, y:this.state.deactivatedClients}
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
                height = {150}
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
                height = {150}
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

        if (this.state.acceptedCount!=0 || this.state.deletedCount!=0){
            userRequests = <VictoryPie 
                radius = {30}
                colorScale = {["orange", "gold"]}
                innerRadius = {15}
                outerRadius = {30}
                height = {150}
                data = {[
                    {x: "Accepted requests\n"+this.state.acceptedCount, y:this.state.acceptedCount},
                    {x: "Deleted requests\n"+this.state.deletedCount, y:this.state.deletedCount}
                ]}
                style={{ labels: { fontSize: 7}}}
            />
        }

        else {
            userRequests = <h5>No accepted or deleted requests this month</h5>
        }

        if(this.state.visibleMonthTotalUsers){
            return (
                <div>
                    <Admindashleftnav />
                    
                    <div>
                        <ProfileNavbar />

                        <div className="content-wrapper"> 
                            <h2>CareMe Total User Statistics for the month of {this.state.monthLabels[this.state.month-1]} - {this.state.year}</h2>
                            <br/>
                                <div className="box-left">
                                <h3> User Classification </h3>
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
                            
                                <h3 style= {{paddingLeft:15}}>Total users based on location as of the month of {this.state.monthLabels[this.state.month-1]} - {this.state.year}</h3>
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
                                    
                                <h3 style= {{paddingLeft:15}}>Total number of nurses based on type as the month of {this.state.monthLabels[this.state.month-1]} -  {this.state.year}</h3>
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

        if(this.state.visibleMonthRequests){
            return (
                <div>
                    <Admindashleftnav />
                    
                    <div>
                        <ProfileNavbar />

                        <div className="content-wrapper"> 
                            <h2>CareMe Requests Statistics for the month of {this.state.monthLabels[this.state.month-1]} - {this.state.year}</h2>
                            <br/>
                                <h3>Total requests</h3> 
                                <h5>Total requests sent this month: {this.state.requestCount}</h5>
                                <br/> <br/>

                                <h3> Total requests accepted and deleted this month </h3>
                                {userRequests}
                                <br/>
                        </div>
                    </div>
                </div>
            );
        }

        if (this.state.visibleMonthActDeac){
            return (
                <div>
                    <Admindashleftnav />
                    
                    <div>
                        <ProfileNavbar />

                        <div className="content-wrapper"> 
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
                        </div>
                    </div>
                </div>
            );
        }

        if (this.state.visibleYearActDeac){
            return (
                <div>
                    <Admindashleftnav />
                    
                    <div>
                        <ProfileNavbar />

                        <div className="content-wrapper"> 
                            <h2> Usage statistics for the year of {this.state.year}</h2>
                            <br/>

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
                        </div>
                    </div>
                </div>
            );
        }

        if (this.state.visibleYearRequests){
            return (
                <div>
                    <Admindashleftnav />
                    
                    <div>
                        <ProfileNavbar />

                        <div className="content-wrapper"> 
                            <h2> User requests statistics for the year of {this.state.year}</h2>
                            <br/>

                            <h3 style= {{paddingLeft:15}}>User requests in {this.state.year}</h3>
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
                                    data={this.state.requestCountYear}
                                    categories={{ x: this.state.monthLabels }}
                                />
                            </VictoryChart>

                            <h3 style= {{paddingLeft:15}}>Accepted requests in {this.state.year}</h3>
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
                                    data={this.state.acceptedCountYear}
                                    categories={{ x: this.state.monthLabels }}
                                />
                            </VictoryChart>

                            <h3 style= {{paddingLeft:15}}>Deleted requests in {this.state.year}</h3>

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
                                    data={this.state.deletedCountYear}
                                    categories={{ x: this.state.monthLabels }}
                                />
                            </VictoryChart>
                        </div>
                    </div>
                </div>
            );
        }

        if (this.state.visibleMonthRateComps){
            return (
                <div>
                    <Admindashleftnav />
                    
                    <div>
                        <ProfileNavbar />

                        <div className="content-wrapper"> 
                            <h2>CareMe Review, Rating and Complaints Statistics for the month of {this.state.monthLabels[this.state.month-1]} - {this.state.year}</h2>
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

        else if (this.state.visibleYearRateComps){
            return (
                <div>
                    <Admindashleftnav />

                    <div>
                        <ProfileNavbar />

                        <div className="content-wrapper">
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
                                    <select class="form-control" onChange={(event)=>this.onChangeReportType(event)} placeholder="Select Required Report">
                                        <option value={-1} selected>Select Type</option>
                                        <option value={0}>Total Users</option>
                                        <option value={1}>Activations and Deactivations</option>
                                        <option value={2}>Ratings, Reviews, Complaints</option>
                                        <option value={3}>Requests </option>
                                    </select>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Button type="submit" variant="primary" onClick={this.onSubmitRequest.bind(this)}>Generate Report</Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>

                        <Dialog ref={(component) => { this.dialog = component }} />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserReport;