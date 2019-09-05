import React, { Component } from "react";
import Popup from 'reactjs-popup';

export default () => (
  <Popup trigger={<button> Proceed</button>} position="bottom">
      <div>Further Information Form here!</div>
  </Popup>
);