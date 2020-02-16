import React, { Component } from "react";
import axios from './../../../backend/node_modules/axios';

class Complaint extends Component {
  constructor(props) {
	super(props);
	this.state = { feedback: '', name: 'Name', email: 'email@example.com' };
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
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
		});

	this.sendFeedback(templateId, {message_html: this.state.feedback, from_name: this.state.Name, reply_to: this.state.Email})
  }

  sendFeedback (templateId, variables) {
	window.emailjs.send(
  	'gmail',  'template_RlSsXIuh',
  	variables
  	).then(res => {
    	console.log('Email successfully sent!')
  	})
  	// Handle errors here however you like, or use a React error boundary
  	.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }
}

export default Complaint;