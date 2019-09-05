import React, { Component } from "react";

class InfoForm extends Component {
    render (){
      return (
        <div>
          <p>This is the information form for nurse</p>
          <button onClick={this.props.closeInfoForm}>Register</button>
        </div>
      );
    }
}

export default InfoForm;
