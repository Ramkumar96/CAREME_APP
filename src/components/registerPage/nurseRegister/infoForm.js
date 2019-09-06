import React, { Component } from "react";
import Modal from 'react-awesome-modal';
import { Button, Form, Col } from 'react-bootstrap';

class InfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visible : false
    }
  }

  openModal() {
      this.setState({
          visible : true
      });
  }

  closeModal() {
      this.setState({
          visible : false
      });
  }

  render() {
    return (
      <section>
          <h1>React-Modal Examples</h1>
          <input type="button" value="Open" onClick={() => this.openModal()} />
          <Modal visible={this.state.visible} width="50%" height="68%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="FirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter First Name" /> 
                </Form.Group>

                <Form.Group as={Col} controlId="LastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Last Name" /> 
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="emailAd">
                <Form.Label>E-mail Address</Form.Label>
                <Form.Control type="email" placeholder="janedoe@example.com" />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="Password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" /> 
                </Form.Group>

                <Form.Group as={Col} controlId="ConfirmPW">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" /> 
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="homeAd">
                <Form.Label>Address</Form.Label>
                <Form.Control type="textarea" />
              </Form.Group>

              <Form.Group controlId="telNo">
                <Form.Label>Telephone Number</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </Modal>
      </section>
    );
  }
}

export default InfoForm;