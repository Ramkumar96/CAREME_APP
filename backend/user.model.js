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
  
  NIC: {
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

  RegDate: {
    type: Date
  },

  ReacDate : {
    type : Date
  },

  DeacDate : {
    type : Date
  },

  starRating: {
    type: Number
  },

  ratingCount: {
    type: Number
  },
  
  nurseGender: {
    type: String
  },

  UpdateDate: {
    type: Date
  },

  profilePic: {
    type: String
  },

  updatedBy: {
    type: String
  },

  UnavailableDates:{
    type: [String],
    default: []
  }
  
},{
    collection: 'Users'
});

module.exports = mongoose.model('UserReg', UserReg);