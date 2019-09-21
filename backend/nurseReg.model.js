
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NurseReg = new Schema({
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
  }
},{
    collection: 'NurseReg'
});

module.exports = mongoose.model('NurseReg', NurseReg);