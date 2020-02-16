const express = require('express');
const UserAcceptRoute = express.Router();

let UserAccepting = require('./accept.model');



// //Adding  request
UserAcceptRoute.route('/add').post(function (req, res) {
    console.log(req.body)
    userAccepting = new UserAccepting(req.body);
    userAccepting.save()
    .then(userAccepting=> {
      res.status(200).send({
        success:true,
        message:"User Data Update success",
      })
    })
    // .catch(err => {
    //   res.status(400).send("unable to save to database");
    // });
  });

//Retrive Notification Data
UserAcceptRoute.route('/getnotification/:id').get(function(req, res){
  UserAccepting.find({AcceptedClientID: req.params.id} , function (err, Notification) {
        if (err) {
          console.log(err);
        } else {
          res.json(Notification);
          console.log(Notification)
        }
});
});

//count number of requests accepted in a month
UserAcceptRoute.route('/countRequestsMonth').post(function (req,res){
  const yearToFind = req.body.year;
  const monthToFind = req.body.month;
  acceptedCount=0;

  UserAccepting.find()
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if(response[i].AcceptedDate.getFullYear()==yearToFind && response[i].AcceptedDate.getMonth()==monthToFind-1){
          acceptedCount++;
        }
      }

      console.log(acceptedCount);

      res.status(200).send({
        acceptedCount: acceptedCount
      })
    })

    .catch(err=>{
      res.status(400).send({
        acceptedCount: 0
      })
    })
})


//count number of user requests accepted throughout a year
UserAcceptRoute.route('/countRequestsYear').post(function (req,res){
  const yearToFind = req.body.year;
  const requestCount = [0,0,0,0,0,0,0,0,0,0,0,0];

  UserAccepting.find()
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if (response[i].AcceptedDate.getFullYear() == yearToFind){
          switch(response[i].AcceptedDate.getMonth()){
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
      acceptedCount: requestCount
    })
  })
})
  
module.exports = UserAcceptRoute;