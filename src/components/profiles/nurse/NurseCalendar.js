import React, { Component } from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
// import listPlugin from 'fullcalendar/ListView'
import interactionPlugin from "@fullcalendar/interaction";
// import bootstrapPlugin from '@fullcalendar/bootstrap'
import { Button } from 'react-bootstrap';


import Modal from 'react-awesome-modal';
import ProfileNavbar from '../ProfileNavbar'
import axios from '../../../../backend/node_modules/axios'
import Footer from '../../homepage/footer/Footer';


class NurseCalendar extends Component {

    constructor() {
        super();
        this.state = {
            visible: false,
            date: null,
            unavailableDates: [],
            loading: true
        }
    }

    componentDidMount() {
        this.getUnavailableDates();

    }

    /** 
     * @desc: Functions to retrive unavailable dates from the backend
     */
    getUnavailableDates = () => {
        console.log("MOUNTING")
        var token = localStorage.getItem('id');
        axios.get('http://localhost:4000/user/userdata/unavailableDates/' + token)
            .then(response => {
                console.log(response.data.profile_data.UnavailableDates)
                this.setUnavailableDates(response.data.profile_data.UnavailableDates)
            })
    }

    /** 
     * @desc: Functions to retrive unavailable dates and map the array of dates
     * and change the property of the calendar for those unavailable dates
     */
    setUnavailableDates = (dates) => {
        dates.map(date => {

            this.state.unavailableDates.push({
                id: dates.indexOf(date),
                title: 'Unavailable',
                start: date,
                allDay: true,
                //rendering: 'background',
                color: 'red'// Adding Red Color Property
            })
            console.log(this.state.unavailableDates)
        })

        this.setState({
            loading: false
        })
        console.log(this.state.unavailableDates)
    }


    /** 
    * @desc: Functions to open and close modals by 
    * changing visible varibale
    */
    openDateModal = () => {
        this.setState({
            visible: true
        });
    }
    closeDateModal = () => {
        this.setState({
            visible: false,

        });
    }


    /** 
     * @desc: Function / Full calendar event to getbthe date in onclick events
     */
    dateClick = (date) => {
        // console.log(Date.now())
        console.log(date.dateStr)


        /** 
        * @desc: Comparing the clicked dates and todays date and allowing 
        * the model to open
        */
        if (new Date(date.dateStr).getTime() >= Date.now()) {
            //console.log(date)
            this.openDateModal();
        }
        this.setState({
            date: date.dateStr
        })
    }


    /** 
    * @desc: Function to add Nurse clicked unavailable dates to backend
    */
    addUnavailableDates = () => {

        const dateobj = {
            date: this.state.date,
        };
        const headers = {
            'Content-Type': 'application/json'
        }
        var token = localStorage.getItem('id');
        console.log(dateobj);

        axios.post('http://localhost:4000/user/userdata/unavailableDates/' + token, dateobj, { headers: headers })
            .then(response => {
                this.closeDateModal();
                window.location.reload();
            })

    }

    render() {

        if (this.state.loading) {
            return (
                <p>Loading</p>
            )
        }
        return (
            <div>
                <ProfileNavbar />

                <div class="container-fluid">
                    <div className="row">
                        {/* Left colunm and calendar background */}
                        <div className="col-4 calendarback calendarbacktext">
                            <div class="row">
                                <div class="mx-auto banner text-center">
                                    <h1 class="text-capitalize">
                                        <strong class="banner-title">Change</strong>
                                    </h1>
                                    <h1 class="text-capitalize">
                                        <strong class="banner-title">Your</strong>
                                    </h1>
                                    <h1 class="text-capitalize">
                                        <strong class="banner-title">Availability</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-7 ">
                            {/* Rendering the Full Calendar Component */}
                            <FullCalendar
                                defaultView="dayGridMonth"
                                plugins={[dayGridPlugin, interactionPlugin]}
                                header={{
                                    left: "prev,next today",
                                    center: "title",
                                }}
                                events={this.state.unavailableDates}
                                dateClick={this.dateClick}
                                defaultAllDayEventDuration={{ 'days': 1 }}
                            />

                            {/* Set unavailable Date Modal */}
                            <Modal visible={this.state.visible} width="25%" height="25%" effect="fadeInUp" onClickAway={() => this.closeDateModal()}>
                                <div class="modal-content">
                                    <div className="modal-header"><h4 align="center"><i className="fa fa-calendar-alt mr-2"></i>Change availabilty on {this.state.date}</h4></div>
                                    <div className="modal-footer"> <Button className="btn btn-danger btn-block" type="submit" onClick={() => this.addUnavailableDates()} >Make it Unavailable</Button></div>
                                </div>
                            </Modal>
                        </div>
                        <div className="col-1 calendarback"  >
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default NurseCalendar;