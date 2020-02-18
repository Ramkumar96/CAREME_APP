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
            complaintCountYear: [],
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

    /**
        * @desc : This function calls the dialog box in case all the fields are not completed for report generation
        * @req : react-bootstrap-dialog package
        * @output : an alert dialog asking the user to complete all the fields
    */
    onShowErrorDialog(){
        this.dialog.showAlert("Please complete request for report generation");
    }

    onSubmitRequest(e){
        e.preventDefault();

        /**
            * @desc : Checks whether all the fields are completed for report generation. 
            *         If not calls the alert box
        */
        if (this.state.month===-1 || this.state.year===-1 || this.state.reportType===-1){
            this.onShowErrorDialog();
        }

        /**
            * @desc : If all the fields are completed, checks for the report requested 
            *         and passes data to the backend to extract information
        */
        else {
            const data = {
                month: this.state.month,
                year: this.state.year
            }

            const headers = {
                'Content-Type': 'application/json'
            }

            console.log(data);

            /**
                * @desc : If the report type requested is activations and deactivations, this loop works.
                *         Based on the period for which the report is requested, passes and receives data 
                *         from the backend to be displayed
            */
            if (this.state.reportType == 0){
                /**
                    * @desc : If the activation and deactivation report is requested for a particular month
                    *         this loop executes
                */
                if (this.state.month!=0){
                    /**
                        * @desc : Passes the data object inclusive of the year and particular month to the backend
                        *         to extract data on the clients registered this month
                        * @output : Captures the total count of clients registered this month sent from the backend
                    */
                    axios.post('http://localhost:4000/user/countClientsMonth', data, {headers: headers})
                        .then(response=> {
                            this.setState({
                                activeClients: response.data.clientCount
                            })

                            console.log("Number of clients registered this month : ", this.state.activeClients);
                        })

                    /**
                        * @desc : Passes the data object inclusive of the year and particular month to the backend
                        *         to extract data on the nurses registered this month
                        * @output : Captures the total count of nurses registered this month sent from the backend
                    */
                    axios.post('http://localhost:4000/user/countNursesMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            activeNurses: response.data.nurseCount
                        })

                        console.log("Number of nurses registered this month : ", this.state.activeNurses);
                    })

                    /**
                        * @desc : Passes the data object inclusive of the year and particular month to the backend
                        *         to extract data on the users(both clients and nurses) registered this month
                        *         according to their location
                        * @output : Captures the total count of users registered this month based on location as an array
                        *           sent from the backend
                    */
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

                    /**
                        * @desc : Passes the data object inclusive of the year and particular month to the backend
                        *         to extract data on the nurses registered this month based on their type
                        *         eg: Pediatric, Surgical Nurses
                        * @output : Captures the total count of nurses registered this month based on their type, 
                        *           as an array sent from the backend
                    */
                    axios.post('http://localhost:4000/user/countNursesTypeMonth', data, {headers: headers})
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

                    /**
                        * @desc : Passes the data object inclusive of the year and particular month to the backend
                        *         to extract data on the clients deactivated this month
                        * @output : Captures the total count of clients deactivated this month sent from the backend
                    */
                    axios.post('http://localhost:4000/userDeac/countClientsMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            deactivatedClients: response.data.clientCount
                        })

                        console.log("Number of clients deactivated this month : ", this.state.deactivatedClients);
                    })

                    /**
                        * @desc : Passes the data object inclusive of the year and particular month to the backend
                        *         to extract data on the nurses deactivated this month
                        * @output : Captures the total count of nurses deactivated this month sent from the backend
                    */
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

                /**
                    * @desc : If the report is requested for an entire year this loop is executed
                */
                else {
                    /**
                        * @desc : Passes the data object inclusive of the year to extract data 
                        *         on the clients who registered in that particular year
                        * @output : Captures the total count of clients registered this year
                        *           categorized to months sent from the backend
                    */
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
    
                        console.log("The client registrations this year : ", this.state.activeClientsYear)
    
                        this.setState({
                            activeClientsYear: this.state.activeClientsYear
                        })
                    })

                    /**
                        * @desc : Passes the data object inclusive of the year to extract data 
                        *         on the nurses who registered in that particular year
                        * @output : Captures the total count of nurses registered this year
                        *           categorized to months sent from the backend
                    */
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

                        console.log("The nurse registrations this year : ", this.state.activeNursesYear)

                        this.setState({
                            activeNursesYear: this.state.activeNursesYear
                        })
                    })

                    /**
                        * @desc : Passes the data object inclusive of the year to extract data 
                        *         on the total users who registered in that particular year based on the location
                        *         and categorized by month
                        * @output : Captures the total count of users registered this year based on location and
                        *           categorized to months sent from the backend
                    */
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

                    /**
                        * @desc : Passes the data object inclusive of the year to extract data 
                        *         on the total nurses who registered in that particular year based on their type
                        *         and categorized by month
                        * @output : Captures the total count of nurses registered this year based on type and
                        *           categorized to months sent from the backend
                    */
                    axios.post('http://localhost:4000/user/countNursesType', data, {headers: headers})
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

                    /**
                        * @desc : Passes the data object inclusive of the year to extract data 
                        *         on the total clients who deactivated accounts in that particular year
                        *         categorized by month
                        * @output : Captures the total count of clients who deactivated accounts this year,
                        *           categorized to months sent from the backend
                    */
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
    
                    /**
                        * @desc : Passes the data object inclusive of the year to extract data 
                        *         on the total nurses who deactivated accounts in that particular year
                        *         categorized by month
                        * @output : Captures the total count of nurses who deactivated accounts this year,
                        *           categorized to months sent from the backend
                    */
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

            /**
                * @desc : This loop executes if the requested report type is rating, reviews and complaints
            */
            else if (this.state.reportType==1){
                /**
                    * @desc : This loop is executed if the report is requested to a particular month
                */
                if (this.state.month!=0){
                    /**
                        * @desc : Passes the data object inclusive of the year and month to extract data 
                        *         on the total number of ratings done within this month
                    */
                    axios.post('http://localhost:4000/rating/countRatings', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            ratingCount: response.data.ratingCount
                        })

                        console.log("Number of ratings this month : ", this.state.ratingCount);
                    })
            
                    /**
                        * @desc : Passes the data object inclusive of the year and month to extract data 
                        *         on the total number of reviews done within this month
                    */
                    axios.post('http://localhost:4000/review/countReviews', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            reviewCount: response.data.reviewCount
                        })

                        console.log("Number of reviews this month : ", this.state.reviewCount);
                    })

                    /**
                        * @desc : Passes the data object inclusive of the year and month to extract data 
                        *         on the total number of complaints made against nurses this month
                    */
                    axios.post('http://localhost:4000/complaint/countNurseComplaints', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            nurseComCount: response.data.nurseComCount
                        })

                        console.log("Number of complaints against nurses this month : ", this.state.nurseComCount);
                    })

                    /**
                        * @desc : Passes the data object inclusive of the year and month to extract data 
                        *         on the total number of complaints made against clients this month
                    */
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

                /**
                    * @desc : This loop is executed if the requested report is for a whole year
                */
                else if (this.state.month==0){
                    /**
                        * @desc : Passes the data object inclusive of the year to extract data 
                        *         on the total number of ratings done throughout a year
                    */
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
    
                    /**
                        * @desc : Passes the data object inclusive of the year to extract data 
                        *         on the total number of reviews done throughout a year
                    */
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

                    /**
                        * @desc : Passes the data object inclusive of the year to extract data 
                        *         on the total number of complaints made throughout a year
                    */
                    axios.post('http://localhost:4000/complaint/countComplaintsYear', data, {headers: headers})
                    .then(response => {
                        this.setState({
                            resBody: response.data.complaintCount
                        })
    
                        this.state.complaintCountYear[0]=0;
                        let j=1;
                        for (let i=0; i<12; i++){
                            this.state.complaintCountYear[j] = this.state.resBody[i];
                            j++;
                        }
    
                        console.log("The total complaints this year : ", this.state.complaintCountYear)
    
                        this.setState({
                            complaintCountYear: this.state.complaintCountYear
                        })
                    })

                    this.setState({
                        visibleYearRateComps: true
                    })
                }
            }

            /**
                * @desc : This loop is executed if the requested report is based on the user requests
            */
            else if (this.state.reportType==2){
                /**
                    * @desc : This loop is executed if the requested report is for a particular month
                */
                if (this.state.month!=0){
                     /**
                        * @desc : Passes the data object inclusive of the year and month to extract data 
                        *         on the total number of requests made throughout this month
                    */
                    axios.post('http://localhost:4000/request/countRequestsMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            requestCount: response.data.requestCount
                        })

                        console.log("Number of requests this month : ", this.state.requestCount);
                    })
            
                    /**
                        * @desc : Passes the data object inclusive of the year and month to extract data 
                        *         on the total number of requests accepted by nurses this month
                    */
                    axios.post('http://localhost:4000/accept/countRequestsMonth', data, {headers: headers})
                    .then(response=> {
                        this.setState({
                            acceptedCount : response.data.acceptedCount
                        })

                        console.log("Number of requests accepted this month : ", this.state.acceptedCount);
                    })

                    /**
                        * @desc : Passes the data object inclusive of the year and month to extract data 
                        *         on the total number of requests deleted by nurses this month
                    */
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

                /**
                    * @desc : This report is generated if the report is requested for a whole year
                */
                else if (this.state.month==0){
                    /**
                        * @desc : Passes the data object inclusive of the year to extract data 
                        *         on the total number of requests made by clients throughout a year
                    */
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
    
                    /**
                        * @desc : Passes the data object inclusive of the year to extract data 
                        *         on the total number of requests accepted by nurses throughout a year
                    */
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

                    /**
                        * @desc : Passes the data object inclusive of the year to extract data 
                        *         on the total number of requests deleted by nurses throughout a year
                    */
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
        /**
            * @desc : These functions assign values to the charts based on the counts received. If
            *         zero counts are received a "No accepts/ activations etc." message is displayed
        */
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

        if(this.state.visibleMonthRequests){
            return (
                <div>
                    <Admindashleftnav />
                    
                    <div>
                        <ProfileNavbar />

                        <div className="content-wrapper"> 
                            <h2 style= {{paddingLeft:15}}> CareMe Requests Statistics for the month of {this.state.monthLabels[this.state.month-1]} - {this.state.year}</h2>
                            <br/>
                                <h3 style= {{paddingLeft:15}}> Total requests accepted and deleted this month </h3>
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
                            <h2 style= {{paddingLeft:15}}>CareMe user accounts activation and deactivation for the month of {this.state.monthLabels[this.state.month-1]} - {this.state.year}</h2>

                            <h3 style= {{paddingLeft:15}}> New User Registrations </h3>
                            {newUsers}
                            <br/>

                            <h3 style= {{paddingLeft:15}}>User Registrations based on Location</h3>
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

                            <h3 style= {{paddingLeft:15}}>Nurse Registrations based on type</h3>
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

                            <h3 style= {{paddingLeft:15}}> User Deactivations </h3>
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
                            <h2 style= {{paddingLeft:15}}>CareMe user accounts activation and deactivation</h2>
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
                            <h2 style= {{paddingLeft:15}}> User requests statistics for the year of {this.state.year}</h2>
                            <br/>
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
                            <h2 style= {{paddingLeft:15}}>CareMe Review, Rating and Complaints Statistics for the month of {this.state.monthLabels[this.state.month-1]} - {this.state.year}</h2>
                            <br/>
                            
                            <h3 style= {{paddingLeft:15}}> User ratings and reviews for the month </h3>
                            {userRatesRevs}
                            <br/>

                            <h3 style= {{paddingLeft:15}}> User complaints for the month </h3>
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
                            <h2 style= {{paddingLeft:15}}>CareMe user ratings, reviews and complaints for the year of {this.state.year}</h2>

                            <h3 style= {{paddingLeft:15}}>User Ratings</h3>

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

                            <h3 style= {{paddingLeft:15}}>User Reviews</h3>

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

                            <h3 style= {{paddingLeft:15}}>User Complaints</h3>

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
                                    data={this.state.complaintCountYear}
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
                        <h2 style= {{paddingLeft:15}}>User Reports</h2>

                        <Form style={{marginLeft: 20}}>
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
                                        <option value={0}>Activations and Deactivations</option>
                                        <option value={1}>Ratings, Reviews, Complaints</option>
                                        <option value={2}>Requests </option>
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