const express = require('express');
const UserRegRoutes = express.Router();

let UserReg = require('./user.model');

// Defined store route
UserRegRoutes.route('/add').post(function (req, res) {
  console.log(req.body)
  let userReg = new UserReg(req.body);
  userReg.save()
    .then(userReg => {
      res.status(200).json({ 'UserReg': 'User added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


UserRegRoutes.route('/').get(function(req, res) {
 UserReg.find({userID:0 },function(err, CAREME_APP) {
      if (err) {
          console.log(err);

//Login
UserRegRoutes.route('/login').post(function (req, res) {
  console.log(req.body)
  var req_password = req.body.password;
  UserReg.findOne({ clientEmail: req.body.email })
    .then(response => {
      var res_password = response.clientPW;
      console.log(req_password, res_password)
      console.log(req_password == res_password)
      if (req_password == res_password) {
        console.log("login sucess")
        res.status(200).send({
          success: true,
          message: "Login success",
          user_data: response
        })
      } else {
      }
    })
});


//userdata
UserRegRoutes.route('/userdata/:id').get(function (req, res) {
  console.log(req.params.id)
  UserReg.findById(req.params.id)
  .then(response=>{
    console.log(response)
    res.status(200).send({
      success:true,
      message:"User Data success",
      profile_data:response
    })
  })
});


UserRegRoutes.route('/').get(function (req, res) {
  UserReg.find(function (err, CAREME_APP) {
    if (err) {
      console.log(err);
    } else {
      res.json(CAREME_APP);
    }
  });
});

module.exports = UserRegRoutes;