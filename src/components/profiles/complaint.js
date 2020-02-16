import React, { Component } from "react";
import axios from './../../../backend/node_modules/axios';
import emailjs from 'emailjs-com';
import Dialog from 'react-bootstrap-dialog';

class Complaint extends Component {
  constructor(props) {
	super(props);
	this.state = { 
		feedback: '', 
		name: localStorage.getItem('user_name'), 
		email: localStorage.getItem('user_Email') 
	};
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  onShowComplaintSuccess(){
	this.dialog.showAlert("Your complaint has been recorded. Team CareMe will get back to you with a quick solution.");
	}

  render() {
	return (
  	<form className="test-mailing">
    	{/* <h1>Generate a complaint</h1> */}
    	<div>
      	<textarea
        	id="test-mailing"
        	name="test-mailing"
        	onChange={this.handleChange}
        	placeholder="Enter your complaint here"
        	required
        	value={this.state.feedback}
        	style={{width: '100%', height: '150px'}}
      	/>
    	</div>
		<hr/>
    	<input type="button" value="Send" className="btn btn-secondary btn-block" onClick={this.handleSubmit} />
		{/* <input type="button" value="Home" className="btn btn-primary" onClick={event =>  window.location.href='/nursemainlist'} /> */}
		<Dialog ref={(component) => { this.dialog = component }} />
	</form>
	)
  }

  handleChange(event) {
    this.setState({feedback: event.target.value})
  }

  handleSubmit (event) {
	const templateId = 'template_id';

	const data = {
		accusedBy : localStorage.getItem('user_Email'),
		accusedByID : localStorage.getItem('accusedByID'),
		accusedUserID : localStorage.getItem('accusedUserID'),
		accusedUser : localStorage.getItem('accusedEmail'),
		accusedByFName : localStorage.getItem('user_name'),
		accusedByLName : localStorage.getItem('user_lname'),
		accusedUserFName : localStorage.getItem('accusedUserFName'),
		accusedUserLName : localStorage.getItem('accusedUserLName'),
		complainedDate : new Date(),
		complaint : this.state.feedback
	}

	axios.post('http://localhost:4000/complaint/add', data)
		.then(res => { 
			//console.log(res.data) 
			this.onShowComplaintSuccess();
		});

	 this.sendFeedback('template_RlSsXIuh', {message_html: this.state.feedback, from_name: localStorage.getItem('user_name')+" "+localStorage.getItem('user_lname'), reply_to: localStorage.getItem('user_Email'),to_name:"ComplaintTeam"})
	//this.sendFeedback(templateId, {reply_to:localStorage.getItem('user_Email'),to_name:"ComplaintTeam",from_name:localStorage.getItem('user_Name'),complaintSenderEmail:"",message_html:this.state.feedback})
		console.log(this.state);
}

  sendFeedback (templateId, variables) {
	window.emailjs.send(
  	'gmail1',  templateId,	variables
  	).then(res => {
		console.log('Email successfully sent!');
		
	  })
	window.emailjs.send("gmail2", "acknowledgement", {"complaintSender":localStorage.getItem('user_Email')})
	
  	// Handle errors here however you like, or use a React error boundary
  	.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }
}

export default Complaint;