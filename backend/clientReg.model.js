const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClientReg = new Schema({
  clientFirstName: {
    type: String
  },
  clientLastName: {
    type: String
  },
  clientEmail: {
    type: String
  },
  clientPW: {
    type: String
  },
  clientCPW: {
    type: String
  },
  clientHome: {
    type: String
  },
  clientTel: {
    type: Number
  }
},{
    collection: 'ClientReg'
});

module.exports = mongoose.model('ClientReg', ClientReg);