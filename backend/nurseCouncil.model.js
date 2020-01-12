const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NurseCouncil = new Schema({
  nurseID: {
    type: Number
  },
  
  NIC: {
    type: String
  },

  LastName: {
    type: String
  },
  
  FirstName: {
    type: String
  }
},{
    collection: 'NurseCouncil'
});

module.exports = mongoose.model('NurseCouncil', NurseCouncil);