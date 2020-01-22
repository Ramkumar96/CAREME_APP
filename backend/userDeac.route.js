const express = require('express');
const UserDeacRoutes = express.Router();

let UserDeac = require('./userDeac.model');

// Defined store route
UserDeacRoutes.route('/add').post(function (req, res) {
    let userDeac = new UserDeac(req.body);
  
    userDeac.save()
    .then(userDeac => {
      res.status(200).json({ 'UserDeac': 'User deactivateed successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to deac database");
    });
  });

// Removing user upon deactivation
UserDeacRoutes.route('/delete').post(function (req, res) {
  console.log(req.body);
  UserDeac.deleteOne({Email: req.body.Email})
    .then(response=>{
      console.log(res.body);
      res.status(200).send({
        success: true,
        message: "User removed"
      })
    })
    .catch(err=>{
      console.log("Couldnt delete");
    });
})

//Check whether deactivated
UserDeacRoutes.route('/validEmail').post(function (req, res) {
  console.log(req.body)
  var req_password = req.body.Password;
  UserDeac.findOne({ Email: req.body.Email })
    .then(response => {
      var res_password = response.PW;
      console.log(req_password, res_password)
      console.log(req_password == res_password)
      if (req_password == res_password) {
        console.log("User has deactivated")
        res.status(200).send({
          success: true,
          user_data: response
        })
      } 
      else {
        res.status(200).send({
          success: false
        })

        console.log("We have issues");
      }
    })

    .catch (err=>{
      res.status(200).send({
        success: false,
        message: "Check login or registration"
      })
    })
});

//count number of nurses deactivated in a month
UserDeacRoutes.route('/countNursesMonth').post(function (req,res){
  const yearToFind = req.body.year;
  const monthToFind = req.body.month;
  UserDeac.find({"userID" : "0"})
    .then(response=>{
      nurseCount=0;
      for (let i=0; i<response.length; i++){
        if(response[i].DeacDate.getFullYear()==yearToFind && response[i].DeacDate.getMonth() == monthToFind-1){
          nurseCount++;
        }
      }

      res.status(200).send({
        nurseCount: nurseCount
      })
    })

    .catch(err=>{
      res.status(400).send({
        nurseCount: 0
      })
    })
})


//count number of clients deactivated in a month
UserDeacRoutes.route('/countClientsMonth').post(function (req,res){
  const yearToFind = req.body.year;
  const monthToFind = req.body.month;
  clientCount=0;

  console.log(yearToFind);

  UserDeac.find({"userID" : 1})
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if(response[i].DeacDate.getFullYear()==yearToFind && response[i].DeacDate.getMonth()==monthToFind-1){
          clientCount++;
        }
      }

      console.log(clientCount);

      res.status(200).send({
        clientCount : clientCount
      })
    })

    .catch(err=>{
      res.status(400).send({
        clientCount: 0
      })
    })
})

module.exports = UserDeacRoutes;