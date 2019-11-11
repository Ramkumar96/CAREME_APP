const express = require('express');
var Validator = require ('validator');
const isEmpty = require ('lodash/isEmpty');

const UserRegRoutes = express.Router();

let UserReg = require('./user.model');

//validator function
function validateInput(data){
  let errors = {};

  if (Validator.isEmpty(data.nurseFirstName)){
    errors.nurseFirstName = 'This field is required';
  }

  return {
    errors,
    isValid:isEmpty(errors)
  }
}

UserRegRoutes.post('/add',(req, res) => {
  const { errors, isValid } = validateInput(req.body);

  if (!isValid){
    res.status(400).json(errors);
  }
});



// // Defined store route
// UserRegRoutes.route('/add').post(function (req, res) {
//   let userReg = new UserReg(req.body);
//   userReg.save()
//     .then(userReg => {
//       res.status(200).json({'UserReg': 'User added successfully'});
//     })
//     .catch(err => {
//     res.status(400).send("unable to save to database");
//     });
// });


// UserRegRoutes.route('/').get(function(req, res) {
//  UserReg.find(function(err, CAREME_APP) {
//       if (err) {
//           console.log(err);
//       } else {
//           res.json(CAREME_APP);
//       }
//   });
// });
// /////


module.exports = UserRegRoutes;