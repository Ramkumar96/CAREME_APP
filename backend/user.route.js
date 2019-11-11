const {Validator,isEmpty} = require('express-validator');
//const {isEmpty} = require('loadash/isEmpty');
const express = require('express');
const UserRegRoutes = express.Router();

let UserReg = require('./user.model');

function validateInput(data){
  let errors = {};

  if (Validator.isNull(data.nurseFirstName)){
    errors.nurseFirstName = 'This field is required';
  }
  if (Validator.isNull(data.nurseLastName)){
    errors.nurseLastName = 'This field is required';
  }
  if (Validator.isNull(data.nurseID)){
    errors.nurseID = 'This field is required';
  }
  if (Validator.isNull(data.nurseEmail)){
    errors.nurseEmail = 'This field is required';
  }
  if (!Validator.isEmail(data.nurseEmail)){
    errors.nurseEmail = 'Email is invalid';
  }
  if (Validator.isNull(data.nursePW)){
    errors.nursePW = 'This field is required';
  }
  if (Validator.isNull(data.nurseCPW)){
    errors.nurseCPW = 'This field is required';
  }
  if (!Validator.equals(data.nursePW, data.nurseCPW)){
    errors.nurseCPW = 'Passwords must match';
  }
  if (Validator.isNull(data.nurseHome)){
    errors.nurseHome = 'This field is required';
  }
  if (Validator.isNull(data.nurseTel)){
    errors.nurseTel = 'This field is required';
  }
  if (Validator.isNull(data.clientFirstName)){
    errors.clientFirstName = 'This field is required';
  }
  if (Validator.isNull(data.clientLastName)){
    errors.clientLastName = 'This field is required';
  }
  if (Validator.isNull(data.clientEmail)){
    errors.clientEmail = 'This field is required';
  }
  if (!Validator.isEmail(data.clientEmail)){
    errors.clientEmail = 'Email is invalid';
  }
  if (Validator.isNull(data.clientPW)){
    errors.clientPW = 'This field is required';
  }
  if (Validator.isNull(data.clientCPW)){
    errors.clientCPW = 'This field is required';
  }
  if (!Validator.equals(data.clientPW, data.clientCPW)){
    errors.clientCPW = 'Passwords must match';
  }
  if (Validator.isNull(data.clientHome)){
    errors.clientHome = 'This field is required';
  }
  if (Validator.isNull(data.clientTel)){
    errors.clientTel = 'This field is required';
  }
  if (Validator.isNull(data.userID)){
    errors.userID = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

// Defined store route
UserRegRoutes.post('/',(req, res) => {
  const { errors, isValid } = validateInput(req.body);

  if (!isValid) {
      res.status(400).json(errors);
  }
});


UserRegRoutes.route('/').get(function(req, res) {
 UserReg.find(function(err, CAREME_APP) {
      if (err) {
          console.log(err);
      } else {
          res.json(CAREME_APP);
      }
  });
});

module.exports = UserRegRoutes;