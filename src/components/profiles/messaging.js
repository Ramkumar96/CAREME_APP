// import React, { Component } from 'react';
// import axios from "axios";
// import { Button, Form, Col } from 'react-bootstrap';

// export default class Messaging extends Component {
//     constructor (props){
//         super(props);
//         this.onChangeMessage = this.onChangeMessage.bind(this);
//         this.onSubmitMessage = this.onSubmitMessage.bind(this);

//         this.state = {
//             profile_data: null,
//             clientEmail: localStorage.getItem("user_Email"),
//             nurseEmail: null,
//             message: '',
//             visible3: false
//         }
//     }
//     componentDidMount() {
//         this.getData();
//         // this.getRating();
//         //console.log(this.props.match.params)
//     }

//     getData = () => {
//         var token = localStorage.getItem('id');
//         axios.get('http://localhost:4000/user/userdata/' + this.props.match.params.id)
//             .then(response => {
//                 console.log(response.data.profile_data)
//                 this.setState({
//                     profile_data: response.data.profile_data,
//                 })
//             })
//     }

    

//     onChangeMessage(e) {
//         this.setState({
//             message: e.target.value
//         });
//     }

//     openMessageModal(){
//         this.setState({
//             visible3: true
//         })
//     }

//     closeMessageModal(){
//         this.setState({
//             visible3: false
//         })
//     }
//     onSubmitMessage(e){
//         e.preventDefault();

//         const dataObjectMessaging = {
//             messageClient: this.state.clientEmail,
//             messageNurse: this.state.profile_data.Email,
//             message: this.state.message,
//             messageDate: new Date()
//         }

//         console.log(dataObjectMessaging);

//         axios.post('http://localhost:4000/message/add', dataObjectMessaging)
//             .then(res => { 
//                 alert("Message Sent.");
//             });     
            
//         this.setState({
//             message: '',
//             visible3: false
//         })
//     }

//     render(){
//         return(
//             <div>
//             <h1>hello</h1>
            
//                 <Form>
//                     <Form.Group>
//                             <Form.Control
//                                 required
//                                 type="textarea"
//                                 value={this.state.message}
//                                 onChangeMessage={this.onChangeMessage}
//                                 placeholder="Leave a msg"
//                             />
                    
//                     </Form.Group>
//                     <Button type="submit" variant="primary" onClick={this.onSubmitMessage.bind(this)}>Submit</Button>
//                 </Form> 
//                 </div>           
//         );
//     }

// }