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

//Login
UserRegRoutes.route('/login').post(function (req, res) {
  console.log(req.body)
  var req_password = req.body.password;
  UserReg.findOne({Email: req.body.email })
    .then(response => {
      var res_password = response.PW;
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
        //erorrr res
      }
    })
});

//userdata
UserRegRoutes.route('/userdata/:id').get(function (req, res) {
  //console.log(req.params.id)
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


//userUpdate
UserRegRoutes.route('/userdata/update/:id').put(function(req,res){
  //console.log(req.body)
  UserReg.findOneAndUpdate({_id:req.params.id},req.body)
  .then(response=>{
    res.status(200).send({
      success:true,
      message:"User Data Update success",
    })
  })
})

UserRegRoutes.route('/').get(function (req, res) {
 UserReg.find({userID:0},function (err, CAREME_APP) {
    if (err) {
       console.log(err);
     } else {
       res.json(CAREME_APP);
     }
   });
 });

//validate email
UserRegRoutes.route('/validEmail').post(function (req, res) {
  UserReg.findOne({Email: req.body.Email })
     .then(response => {
      if (response) {
        console.log("existsss");
        res.status(401).send({
          success:true,
          message:"Email already exists",
        })
      } else {
        console.log('not there');
      } 
    })
});

module.exports = UserRegRoutes;