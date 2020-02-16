import React, { Component } from 'react'


import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
// import listPlugin from 'fullcalendar/ListView'
import interactionPlugin from "@fullcalendar/interaction";
// import bootstrapPlugin from '@fullcalendar/bootstrap'

import emailjs from 'emailjs-com';
import Modal from 'react-awesome-modal';
import ProfileNavbar from '../ProfileNavbar'
import axios from '../../../../backend/node_modules/axios';
import Dialog from "react-bootstrap-dialog";


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
                    client_name:response.data.profile_data.FirstName,
                    client_Location:response.data.profile_data.Location,
                    client_id:response.data.profile_data._id
                    
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

    onShowDialog(){
        this.dialog.showAlert("Booking request sent successfully");
    }

    dateClick = (date) => {
        //console.log(new Date(date.dateStr).getTime(), '-----------------------')
        //console.log(this.state.response_dates.includes(date.dateStr))
        //console.log(this.state.unavailableDates.includes(date)) 
        //console.log(Date.now())
        console.log(date.dateStr)


        if ((this.state.response_dates.includes(date.dateStr)===false) && (new Date(date.dateStr).getTime() >= Date.now())) {
            
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
    
    requestNurse =() => {

        const RequestObj = {
            RequestedClient : this.state.client_name,
            RequestedByClientID : this.state.client_id,
            RequestedClientLocation: this.state.client_Location,
            RequestedNurse : this.state.nurse_name,
            RequestedNurseID:this.state.nurse_id,
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

               alert("Details successfully updated");
               window.emailjs.send("gmail3","template_G2HWQa7Y", {"nurseEmail":this.state.nurse_email,"to_name":this.state.nurse_name}) 

               this.onShowDialog();
                
              }
          })
          
          this.closeDateModal();
        console.log("request Nurse")
        console.log(this.state.profile_data)
        // this.sendFeedback('template_G2HWQa7Y', {"nurseEmail":this.state.nurse_email,"to_name":this.state.nurse_name+" "+this.state.nurse_lname})
        
    }

    // sendFeedback (templateId, variables) {
    //     window.emailjs.send(
    //       'gmail3',  templateId, variables
    //       ).then(res => {
    //         console.log('Notified Nurse!');
    //       })        
    //       // Handle errors here however you like, or use a React error boundary
    //       .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    //   }

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
                            <input type="button" class="btn btn-danger" value="Request the Nurse" onClick={() => this.requestNurse()} />
                            <input type="button" class="btn btn-info" value="Cancel" onClick={() => this.closeDateModal()} />
                        </center>
                    </Modal>
                    
                    <Dialog ref={(component) => { this.dialog = component }} />
                </div>
            </div>
        )
    }
}

export default ClientViewNurseCalendar;