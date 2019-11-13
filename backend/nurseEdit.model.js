const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let nurseedit = new Schema({
    nurseLocation: {
      type: String
    },
    nurseUni: {
      type: String
    },
    nurseExp: {
      type: Number
    },
    nurseSkill: {
      type: String
    }
  },{
      collection: 'nurse_edit'
  });
  
  module.exports = mongoose.model('nurseedit', nurseedit);