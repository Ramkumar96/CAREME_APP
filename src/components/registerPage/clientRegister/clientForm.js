import React, { Component } from "react";
import classes from "./clientForm.css";
import Navigationbar from '../../homepage/navigationbar/Navigationbar';

class ClientForm extends Component {
    render (){
      return (
        <div>
          <Navigationbar/>
      
          <div class="form">
            <div class="content">
            <h1>Register Here</h1>

            <form action="/" method="post">
              
                <div class="field">
                  <label>
                    First Name<span class="show">*</span>
                  </label>
                  <input type="text" />
                </div>

                <div class="field">
                  <label>
                    Last Name<span class="show">*</span>
                  </label>
                  <input type="text"/>
                </div>
              

              <div field="field">
              <label>
                    Address<span class="show">*</span>
                  </label>
                  <input type="text"/>
              </div>

              <div field="field">
              <label>
                    Email<span class="show">*</span>
                  </label>
                  <input type="email"/>
              </div>

              <div field="field">
              <label>
                    Telephone No<span class="show">*</span>
                  </label>
                  <input type="text"/>
              </div>

              <button type="submit" class="button button-block">
                Submit
              </button>
            </form>
            </div>
          </div>
        </div>
      );
    }
}

export default ClientForm;