const express = require('express');
const UserRequestRoute = express.Router();

let UserRequesting = require('./request.model');



// //Adding  request
UserRequestRoute.route('/add').post(function (req, res) {
    console.log(req.body)
    userRequesting = new UserRequesting(req.body);
    userRequesting.save()
    .then(userRequesting=> {
      res.status(200).send({
        success:true,
        message:"User Data Update success",
      })
      //res.status(200).json({ 'userRequesting': 'Rating added successfully' });
    })
    // .catch(err => {
    //   res.status(400).send("unable to save to database");
    // });
  });


  // Deleting Notification Data
  UserRequestRoute.route('/delete').post(function (req, res) {
  console.log(req.body);
  UserRequesting.deleteOne({_id: req.body.NotificationID })
    .then(response=>{
      console.log(res.body);
      res.status(200).send({
        success: true,
        message: "Notification Data Removed"
      })
    })
})


//Retrive Notification Data
UserRequestRoute.route('/notification/:id').get(function(req, res){
    UserRequesting.find({RequestedNurseID: req.params.id} , function (err, Notification) {
        if (err) {
          console.log(err);
        } else {
          res.json(Notification);
          console.log(Notification)
        }
});
});
  
//count number of requests in a month
UserRequestRoute.route('/countRequestsMonth').post(function (req,res){
  const yearToFind = req.body.year;
  const monthToFind = req.body.month;
  requestCount=0;

  UserRequesting.find()
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if(response[i].RequestedDate.getFullYear()==yearToFind && response[i].RequestedDate.getMonth()==monthToFind-1){
          requestCount++;
        }
      }

      console.log(requestCount);

      res.status(200).send({
        requestCount: requestCount
      })
    })

    .catch(err=>{
      res.status(400).send({
        requestCount: 0
      })
    })
})

//count number of user requests sent throughout a year
UserRequestRoute.route('/countRequestsYear').post(function (req,res){
  const yearToFind = req.body.year;
  const requestCount = [0,0,0,0,0,0,0,0,0,0,0,0];

  UserRequesting.find()
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if (response[i].RequestedDate.getFullYear() == yearToFind){
          switch(response[i].RequestedDate.getMonth()){
            case(0):
              requestCount[0]++;
              break;

            case(1):
              requestCount[1]++;
              break;

            case(2):
              requestCount[2]++;
              break;

            case(3):
              requestCount[3]++;
              break;

            case(4):
              requestCount[4]++;
              break;

            case(5):
              requestCount[5]++;
              break;

            case(6):
              requestCount[6]++;
              break;

            case(7):
              requestCount[7]++;
              break;

            case(8):
              requestCount[8]++;
              break;

            case(9):
              requestCount[9]++;
              break;

            case(10):
              requestCount[10]++;
              break;

            case(11):
              requestCount[11]++;
              break;
          }
        }
    }

    console.log("The total number of requests accepted this year "+requestCount);

    res.status(200).send({
      requestCount: requestCount
    })
  })
})

//count total requests
UserRequestRoute.route('/countRequests').get(function (req,res){
  UserRequesting.find().countDocuments()
    .then(response=>{
      res.status(200).send({
        requestCount: response
      })
    })
})


module.exports = UserRequestRoute;