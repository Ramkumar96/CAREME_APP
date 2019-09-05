import React, { Component } from "react";

class InfoForm extends Component {
    render (){
      return (
        <div class="popup">
          <div class="popupInner">
            <h1>{this.props.text}</h1>
            <p>This is the information form for nurse</p>
            <button onClick={this.props.closeInfoForm}>Register</button>
          </div>
        </div>
      );
    }
}

export default InfoForm;
