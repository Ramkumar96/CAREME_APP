import React, { Component } from 'react'


import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
// import listPlugin from 'fullcalendar/ListView'
import interactionPlugin from "@fullcalendar/interaction";
// import bootstrapPlugin from '@fullcalendar/bootstrap'


import Modal from 'react-awesome-modal';
import ProfileNavbar from '../ProfileNavbar'
import axios from '../../../../backend/node_modules/axios';


class ClientViewNurseCalendar extends Component {

    constructor() {
        super();
        this.state = {
            visible: false,
            date: null,
            unavailableDates: [],
            loading: true,
            response_dates: [],
        }
    }

    componentDidMount() {
        this.getUnavailableDates();

    }

    getUnavailableDates = () => {
        console.log("----------------dedde")
        console.log(this.props.match.params.id)
        //var token = localStorage.getItem('id');
        axios.get('http://localhost:4000/user/userdata/unavailableDates/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data.profile_data.UnavailableDates)
                this.setState({
                    response_dates: response.data.profile_data.UnavailableDates
                })

                this.setUnavailableDates(response.data.profile_data.UnavailableDates)
            })
    }

    setUnavailableDates = (dates) => {
        dates.map(date => {

            this.state.unavailableDates.push({
                id: dates.indexOf(date),
                title: 'Unavailable', // a property!
                start: date, // a property!
                allDay: true,
                color: 'red',// a property! ** see important note below about 'end' **
                rendering: 'background',
                unselectAuto: true,
                editable: false
            })
            console.log(this.state.unavailableDates)
        })

        this.setState({
            loading: false
        })

        console.log(this.state.unavailableDates)

    }


    dateClick = (date) => {
        console.log(date, '-----------------------')
        console.log(this.state.response_dates.includes(date.dateStr))

        //console.log(this.state.unavailableDates.includes(date)) 
        //console.log(Date.now())
        //console.log(date.dateStr)


        if (this.state.response_dates.includes(date.dateStr)===false) {
            //console.log(date)
            this.openDateModal();
        }

        // this.setState({
        //     date: date.dateStr

        // })

        //  alert('Clicked on: ' + this.state.date)        
    }

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

    eventClick = (event) => {
        console.log('event--------------')
        console.log(event.data)
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

                <div className="container">
                    <FullCalendar
                        defaultView="dayGridMonth"
                        plugins={[dayGridPlugin, interactionPlugin]}
                        // themeSystem={{bootstrap}}
                        header={{
                            left: "prev,next today",
                            center: "title",
                        }}
                        events={this.state.unavailableDates}
                        dateClick={this.dateClick}
                        eventClick={this.eventClick}
                        defaultAllDayEventDuration={{ 'days': 1 }}
                    />



                    <Modal visible={this.state.visible} width="25%" height="20%" effect="fadeInUp" onClickAway={() => this.closeDateModal()}>
                        <h5 align="center">Book Nurse {this.state.date}</h5>
                        <center>
                            {/* <Button variant="btn btn-danger" type="submit" onClick={() => this.logout()}>LogOut</Button> */} 
                            <input type="button" class="btn btn-danger" value="Request the Nurse" onClick={() => this.addUnavailableDates()} />
                            <input type="button" class="btn btn-info" value="Cancel" onClick={() => this.closeDateModal()} />
                        </center>
                    </Modal>
                    
                </div>
            </div>
        )
    }
}

export default ClientViewNurseCalendar;