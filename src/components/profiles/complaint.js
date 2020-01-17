import React, { Component } from "react";

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
    	<h1>Generate a complaint</h1>
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
    	<input type="button" value="Send" className="btn btn-success" onClick={this.handleSubmit} />
		{/* <input type="button" value="Home" className="btn btn-primary" onClick={event =>  window.location.href='/nursemainlist'} /> */}
  	</form>
	)
  }

  handleChange(event) {
    this.setState({feedback: event.target.value})
  }

  handleSubmit (event) {
	const templateId = 'template_id';

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