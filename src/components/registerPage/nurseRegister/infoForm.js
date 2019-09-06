import React, { Component } from "react";
import Modal from 'react-awesome-modal';

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
          <Modal visible={this.state.visible} width="30%" height="50%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
            <div class="content">
            <h1>Register Here</h1>

            <form action="/" method="post">
              
                <div class="field">
                  <label>
                    First Name
                  </label>
                  <input type="text" />
                </div>

                <div class="field">
                  <label>
                    Last Name
                  </label>
                  <input type="text"/>
                </div>
              

              <div field="field">
                  <label>
                    Address
                  </label>
                  <input type="text"/>
              </div>

              <div field="field">
                  <label>
                    Email
                  </label>
                  <input type="email"/>
              </div>

              <div field="field">
              <label>
                    Telephone No
                  </label>
                  <input type="text"/>
              </div>

              <button type="submit" class="button button-block">
                Submit
              </button>
            </form>

          </div>
          </Modal>
      </section>
    );
  }
}

export default InfoForm;