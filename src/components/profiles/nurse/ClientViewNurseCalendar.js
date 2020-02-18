import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
// import listPlugin from 'fullcalendar/ListView'
import interactionPlugin from "@fullcalendar/interaction";
// import bootstrapPlugin from '@fullcalendar/bootstrap'
import { Button } from 'react-bootstrap';
////import emailjs from 'emailjs-com';
import Modal from 'react-awesome-modal';
import ProfileNavbar from '../ProfileNavbar'
import axios from '../../../../backend/node_modules/axios';
import Dialog from "react-bootstrap-dialog";
import Footer from '../../homepage/footer/Footer';


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



    getClientData = () => {
        var token = localStorage.getItem('id');
        axios.get('http://localhost:4000/user/userdata/' + token)
            .then(response => {
                console.log(response.data.profile_data)
                this.setState({
                    Client_profile_data: response.data.profile_data,
                    client_name: response.data.profile_data.FirstName,
                    client_Location: response.data.profile_data.Location,
                    client_id: response.data.profile_data._id

                })
            })
    }


    getUnavailableDates = () => {
        //console.log("----------------dedde")
        //console.log(this.props.match.params.id)

        //Get Data of Nurse
        axios.get('http://localhost:4000/user/userdata/unavailableDates/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data.profile_data.UnavailableDates)
                this.setState({
                    profile_data:response.data.profile_data,
                    nurse_name:response.data.profile_data.FirstName,
                    nurse_lname:response.data.profile_data.LastName,
                    nurse_id:response.data.profile_data._id,
                    nurse_email:response.data.profile_data.Email,
                    response_dates: response.data.profile_data.UnavailableDates
                })
                //console.log(this.state.profile_data)
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

    onShowDialog() {
        this.dialog.showAlert("Booking request sent successfully");
    }

    dateClick = (date) => {
        //console.log(new Date(date.dateStr).getTime(), '-----------------------')
        //console.log(this.state.response_dates.includes(date.dateStr))
        //console.log(this.state.unavailableDates.includes(date)) 
        //console.log(Date.now())
        console.log(date.dateStr)


        if ((this.state.response_dates.includes(date.dateStr) === false) && (new Date(date.dateStr).getTime() >= Date.now())) {

            this.setState({
                requesteddate: date.dateStr

            })

            this.openDateModal();
            this.getClientData()
            console.log(this.state.profile_data)
            console.log(this.state.nurse_name)
            console.log(this.state.nurse_id)


        }
        console.log(this.state.requesteddate)
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

    requestNurse = () => {

        const RequestObj = {
            RequestedClient: this.state.client_name,
            RequestedByClientID: this.state.client_id,
            RequestedClientLocation: this.state.client_Location,
            RequestedNurse: this.state.nurse_name,
            RequestedNurseID: this.state.nurse_id,
            RequestedDate: this.state.requesteddate
        }
        console.log(this.state.requesteddate)
        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post('http://localhost:4000/request/add', RequestObj, {headers:headers})
          .then (res => {
              if (res.data.success){
               console.log(res.data);
               //sending the notification to nurse
               this.sendFeedback("gmail3", "acknowledgement", {
                 to_email: this.state.nurse_email,
                 from_name: "CareMe Requests Management",
                 from_email: "requests.careme@gmail.com",
                 subject: "New Request",
                 to_name: this.state.nurse_name + " " + this.state.nurse_lname,
                 body:
                   "You've received a new appointment request. Please login to your CareMe account to accept/decline it."
               }); 

               this.onShowDialog();
                
              }
          })
          
          this.closeDateModal();
        console.log("requested Nurse")
        console.log(this.state.profile_data)
        
    }

    sendFeedback (serviceID,templateId, variables) {
        window.emailjs.send(
            serviceID,  templateId, variables
          ).then(res => {
            console.log('Notified Nurse!');
          })        
          // Handling errors
      .catch(err => console.error("Email sending failed:",err ));
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
                            {/* Deactivate Modal */}
                            <Modal visible={this.state.visible} width="25%" height="25%" effect="fadeInUp" onClickAway={() => this.closeDateModal()}>
                                <div class="modal-content">
                                    <div className="modal-header"><h4 align="center"><i className="fa fa-user-md mr-2"></i>Request Nurse {this.state.requesteddate}</h4></div>
                                    <div className="modal-body"><i class="fa fa-question-circle"></i> Are you sure you want to Request?</div>
                                    <div className="modal-footer"> <Button className="btn btn-info btn-block" type="submit"onClick={() => this.requestNurse()} >Request the Nurse</Button></div>
                                </div>
                            </Modal>

                        </div>
                        <div className="col-1 calendarback"  >

                        </div>
                    </div>
                    <Dialog ref={(component) => { this.dialog = component }} />

                </div>
                <Footer/>
            </div>
        )
    }
}

export default ClientViewNurseCalendar;