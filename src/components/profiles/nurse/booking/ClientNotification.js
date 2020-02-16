import React, { Component } from 'react'
import axios from '../../../../../backend/node_modules/axios';


const NotifyBox = props => (
    <div>
        {/* The timeline */}
        <div className="timeline timeline-inverse">
            {/* * timeline time label */}
            {/* <div className="time-label"> */}
            {/* /.timeline-label */}
            {/* timeline item */}
            <div>
                <i className="fas fa-bell bg-primary" />
                <div className="timeline-item">
                {/* {'/nurseviewclientprofile/'+props.clientID} */}
                    <span className="time"><i className="far fa-clock" /> 12:05</span>
                    <h3 className="timeline-header"><a href={'/viewnurseprofile/'+props.AcceptednurseID}>{props.AcceptednurseName}</a> Accepted your booking Request</h3>
                    <div className="timeline-body">
                        <div >
                            <h6> <strong>Nurse Name:</strong>{props.AcceptednurseName}</h6>
                        </div>
                        <div >
                            <h6> <strong>Booked Date:</strong>{props.Accepteddate}</h6>
                        </div>
                        {/* <div >
                            <h6> <strong>Booking ID:</strong>{props.NoficationID} </h6>
                        </div> */}
                    </div>
                    {/* <div className="timeline-footer">
                        <a href="#" className="btn btn btn-secondary btn-sm">Message to Nurse</a>
                        {/* <a href="#" className="btn btn-danger btn-sm" onClick={() => NurseNotification.deleteNotification(props.NoficationID)}>Delete</a> */}
                    {/* </div> */} 
                </div>
            </div>
            {/* END timeline item */}
        </div>
    </div>
)

class ClientNotification extends Component {

    constructor(props) {
        super(props);
        this.state = { NotificationData: [] };
        this.NotificationID = null;
    }


    componentDidMount = () => {
        var token = localStorage.getItem('id');
        axios.get('http://localhost:4000/accept/getnotification/' + token)
            .then(response => {
                this.setState({
                    NotificationData: response.data
                });
                console.log("@@@",this.state.NotificationData);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

       //Mapping the Notification Data from backend 
       clientnotificationData() {
        return this.state.NotificationData.map(function (currentNotify, i) {
            return <NotifyBox 
                AcceptedclientName={currentNotify.AcceptedClient}
                // AcceptedclientLocation={currentNotify.RequestedClientLocation}
                AcceptedclientID={currentNotify.AcceptedClientID}
                AcceptednurseName={currentNotify.AcceptedByNurse }
                AcceptednurseID={currentNotify.AcceptedByNurseID}
                Accepteddate={new Date(currentNotify.AcceptedDate).toDateString()}
                // AcceptedNoficationID={currentNotify._id}   
                 key={i}
            />;
        })
    }

    render() {
        return (
            <div>
               {this.clientnotificationData()}
            </div>
        )
    }
}

export default ClientNotification;