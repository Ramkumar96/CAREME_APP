
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserReg = new Schema({
  FirstName: {
    type: String
  },
  
  LastName: {
    type: String
  },

  nurseID: {
    type: Number
  },
  
  Email: {
    type: String
  },
  
  PW: {
    type: String
  },
  
  CPW: {
    type: String
  },
  
  Home: {
    type: String
  },
  
  Tel: {
    type: Number
  },
  userID: {
    type: Number
  },

  Location: {
    type: String
  },

  Age: {
    type: Number
  },

  nurseExp: {
    type: String
  },

  nurseExpT:{
    type: String
  }
},{
    collection: 'Users'
});

module.exports = mongoose.model('UserReg', UserReg);