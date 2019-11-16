
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
  
  //home address
  Home: {
    type: String
  },
  
  Tel: {
    type: Number
  },

  //nurse is 0 client is 1
  userID: {
    type: Number
  },

  //categorized according to districts
  Location: {
    type: String
  },

  Age: {
    type: Number
  },

  //number of years
  nurseExp: {
    type: String
  },

  //Education institute (eg: Pera, Col)
  nurseUni:{
    type: String
  },

  //degree or diploma and stuff like that
  nurseEdu:{
    type: String
  },

  //category such as emergency and peadiatric
  nurseType: {
    type: String
  },

  //nurse experience years in text for easier filtering
  nurseExpT: {
    type: String
  }
},{
    collection: 'Users'
});

module.exports = mongoose.model('UserReg', UserReg);