
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserReg = new Schema({
  nurseFirstName: {
    type: String
  },
  nurseLastName: {
    type: String
  },
  nurseID: {
    type: Number
  },
  nurseEmail: {
    type: String
  },
  nursePW: {
    type: String
  },
  nurseCPW: {
    type: String
  },
  nurseHome: {
    type: String
  },
  nurseTel: {
    type: Number
  },
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
  },
  userID: {
    type: Number
  }
},{
    collection: 'Users'
});

module.exports = mongoose.model('UserReg', UserReg);