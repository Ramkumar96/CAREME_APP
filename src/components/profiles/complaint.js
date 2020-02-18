/**
 * @desc:complaint component
 * @requires: React, axios, emailjs, Dialog 
 */

import React, { Component } from "react";
import axios from "./../../../backend/node_modules/axios";
//import emailjs from "emailjs-com";
import Dialog from "react-bootstrap-dialog";

class Complaint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: " ",
      name: localStorage.getItem("user_name"),
      email: localStorage.getItem("user_Email")
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onShowComplaintSuccess() {
    this.dialog.showAlert(
      "Your complaint has been recorded. Team CareMe will get back to you with a quick solution."
    );
  }

  render() {
    return (
      <form className="test-mailing">
        <div>
          <textarea
            id="test-mailing"
            name="test-mailing"
            onChange={this.handleChange}
            placeholder="Enter your complaint here"
            required
            value={this.state.feedback}
            style={{ width: "100%", height: "150px" }}
          />
        </div>
        <hr />
        <input
          type="button"
          value="Send"
          className="btn btn-secondary btn-block"
          onClick={this.handleSubmit}
        />

        <Dialog
          ref={component => {
            this.dialog = component;
          }}
        />
      </form>
    );
  }

  handleChange(event) {
    this.setState({ feedback: event.target.value });
  }

  handleSubmit(event) {
    //const templateId = "template_id";

    const data = {
      accusedBy: localStorage.getItem("user_Email"),
      accusedByID: localStorage.getItem("accusedByID"),
      accusedUserID: localStorage.getItem("accusedUserID"),
      accusedUser: localStorage.getItem("accusedEmail"),
      accusedByFName: localStorage.getItem("user_name"),
      accusedByLName: localStorage.getItem("user_lname"),
      accusedUserFName: localStorage.getItem("accusedUserFName"),
      accusedUserLName: localStorage.getItem("accusedUserLName"),
      complainedDate: new Date(),
      complaint: this.state.feedback
    };

    axios.post("http://localhost:4000/complaint/add", data).then(res => {
      //console.log(res.data)
      this.onShowComplaintSuccess();
    });

    //sending the complaint to system complaint managers
    this.sendFeedback("gmail1", "template_G2HWQa7Y", {
      from_email: localStorage.getItem("user_Email"),
      from_name:
        localStorage.getItem("user_name") +
        " " +
        localStorage.getItem("user_lname"),
      message_html: this.state.feedback
    });

    //sending acknowledgement to complaint maker
    this.sendFeedback("gmail2", "acknowledgement", {
      to_email: localStorage.getItem("user_Email"),
      from_name: "CareMe Complaint Management",
      from_email: "complaints.careme@gmail.com",
      subject: "Complaint Acknowledged",
      to_name:
        localStorage.getItem("user_name") +
        " " +
        localStorage.getItem("user_lname"),
      body:
        "We have received your complaint and we are taking prompt action to resolve your issue. Please be patient with us while we take the best course of action to provide our users the best of services."
    });
    console.log(this.state);
  }

  sendFeedback(serviceID, templateId, variables) {
    window.emailjs
      .send(serviceID, templateId, variables)
      .then(res => {
        console.log("Email successfully sent!");
      })

      // Handling errors
      .catch(err => console.error("Email sending failed:", err));
  }
}

export default Complaint;
