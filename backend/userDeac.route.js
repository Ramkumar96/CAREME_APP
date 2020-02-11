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


//count number of nurses deactivated throughout a year
UserDeacRoutes.route('/countNursesYear').post(function (req,res){
  const yearToFind = req.body.year;
  const nurseCount = [0,0,0,0,0,0,0,0,0,0,0,0];

  UserDeac.find({"userID" : 0})
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if (response[i].RegDate.getFullYear() == yearToFind){
          switch(response[i].RegDate.getMonth()){
            case(0):
              nurseCount[0]++;
              break;

            case(1):
              nurseCount[1]++;
              break;

            case(2):
              nurseCount[2]++;
              break;

            case(3):
              nurseCount[3]++;
              break;

            case(4):
              nurseCount[4]++;
              break;

            case(5):
              nurseCount[5]++;
              break;

            case(6):
              nurseCount[6]++;
              break;

            case(7):
              nurseCount[7]++;
              break;

            case(8):
              nurseCount[8]++;
              break;

            case(9):
              nurseCount[9]++;
              break;

            case(10):
              nurseCount[10]++;
              break;

            case(11):
              nurseCount[11]++;
              break;
          }
        }
    }

    console.log(nurseCount);

    res.status(200).send({
      nurseCount: nurseCount
    })
  })
})

//count number of clients deactivated throughout a year
UserDeacRoutes.route('/countClientsYear').post(function (req,res){
  const yearToFind = req.body.year;
  const clientCount = [0,0,0,0,0,0,0,0,0,0,0,0];

  UserDeac.find({"userID" : 1})
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if (response[i].RegDate.getFullYear() == yearToFind){
          switch(response[i].RegDate.getMonth()){
            case(0):
              clientCount[0]++;
              break;

            case(1):
              clientCount[1]++;
              break;

            case(2):
              clientCount[2]++;
              break;

            case(3):
              clientCount[3]++;
              break;

            case(4):
              clientCount[4]++;
              break;

            case(5):
              clientCount[5]++;
              break;

            case(6):
              clientCount[6]++;
              break;

            case(7):
              clientCount[7]++;
              break;

            case(8):
              clientCount[8]++;
              break;

            case(9):
              clientCount[9]++;
              break;

            case(10):
              clientCount[10]++;
              break;

            case(11):
              clientCount[11]++;
              break;
          }
        }
    }

    console.log(clientCount);

    res.status(200).send({
      clientCount: clientCount
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