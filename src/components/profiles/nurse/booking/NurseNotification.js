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
                    <h3 className="timeline-header"><a href={'/nurseviewclientprofile/'+props.clientID}>{props.clientName}</a> sent you a booking request</h3>
                    <div className="timeline-body">
                        <div >
                            <h6> <strong>Client Name : </strong>{props.clientName}</h6>
                        </div>
                        <div >
                            <h6> <strong>Client Location : </strong>{props.clientLocation}</h6>
                        </div>
                        <div >
                            <h6> <strong>Requested Date : </strong>{props.date} </h6>
                        </div>
                    </div>

                    <div className="timeline-footer">
                        <span className="mr-2"><a href="#" className="btn btn-primary btn-sm" onClick={() => NurseNotification.confirmRequest(props.clientName, props.clientID, props.date, props.NoficationID, props.nurseName, props.nurseID)}>Confirm</a></span>
                        <a href="#" className="btn btn-danger btn-sm" onClick={() => NurseNotification.deleteNotification(props.clientName, props.clientID, props.date, props.NoficationID, props.nurseName, props.nurseID)}>Delete</a>
                    </div>
                </div>
            </div>
            {/* END timeline item */}
        </div>
    </div>
)

class NurseNotification extends Component {

    constructor(props) {
        super(props);
        this.state = { NotificationData: [] };
        this.NotificationID = null;
    }

    onShowDeleteRequest(){
        this.dialog.showAlert("Request deleted successfully");
    }

    componentDidMount = () => {
        //this.getNotificationData();
        var token = localStorage.getItem('id');
        axios.get('http://localhost:4000/request/notification/' + token)
            .then(response => {
                this.setState({
                    NotificationData: response.data
                });
                console.log(this.state.NotificationData);
            })
            .catch(function (error) {
                console.log(error);
            });

        //  console.log(props.NoficationID)
    }

    //Confirm Button Accepting the request
    static confirmRequest = (accepted_Client_name, accepted_Client_id, accepted_date, notification_ID, nurse_name, nurse_ID) => {

        const obj = {
            AcceptedClient: accepted_Client_name,
            AcceptedClientID: accepted_Client_id,
            AcceptedDate: accepted_date,
            //NotificationID : notification_ID,
            AcceptedByNurse: nurse_name,
            AcceptedByNurseID: nurse_ID
        };

        console.log(obj)

        axios.post('http://localhost:4000/accept/add', obj)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    alert("Request successfully accepted.");
                }
            });
    };

    //Delete Button Deleting Notification

    static deleteNotification = (deleted_Client_name,deleted_Client_id, deleted_date,deleted_notification_ID, deleted_nurse_name,deleted_nurse_ID) => {
        
        const deleteobj = {
            DeletedRequestedClient: deleted_Client_name,
            DeletedRequestedByClientID: deleted_Client_id,
            DeletedRequestedDate:deleted_date,
            DeletedRequestedNurse:deleted_nurse_name,
            DeletedRequestedNurseID:deleted_nurse_ID
        };

        axios.post('http://localhost:4000/requestDeleted/add', deleteobj)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    alert("Request successfully deleted");
                }
            });  
    }

    //Mapping the Notification Data
    notificationData() {
        return this.state.NotificationData.map(function (currentNotify, i) {
            return <NotifyBox clientName={currentNotify.RequestedClient}
                clientLocation={currentNotify.RequestedClientLocation}
                clientID={currentNotify.RequestedByClientID}
                NoficationID={currentNotify._id}
                date={new Date(currentNotify.RequestedDate).toDateString()}
                nurseName={currentNotify.RequestedNurse}
                nurseID={currentNotify.RequestedNurseID} key={i}
            />;
        })
    }

    render() {

        return (
            <div>
                {this.notificationData()}
            </div>
        )
    }

}

export default NurseNotification;