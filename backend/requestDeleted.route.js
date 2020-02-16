const express = require('express');
const UserRequestDeletedRoute = express.Router();

let UserRequestingDeleted = require('./requestDeleted.model');



// //Adding  request
UserRequestDeletedRoute.route('/add').post(function (req, res) {
    console.log(req.body)
    userRequestingDeleted = new UserRequestingDeleted(req.body);
    userRequestingDeleted.save()
    .then(userRequestingDeleted=> {
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

//count number of requests accepted in a month
UserRequestDeletedRoute.route('/countRequestsMonth').post(function (req,res){
  const yearToFind = req.body.year;
  const monthToFind = req.body.month;
  deletedCount=0;

  UserRequestingDeleted.find()
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if(response[i].DeletedRequestedDate.getFullYear()==yearToFind && response[i].DeletedRequestedDate.getMonth()==monthToFind-1){
          deletedCount++;
        }
      }

      console.log(deletedCount);

      res.status(200).send({
        deletedCount : deletedCount
      })
    })

    .catch(err=>{
      res.status(400).send({
        deletedCount: 0
      })
    })
})

//count number of user requests deleted throughout a year
UserRequestDeletedRoute.route('/countRequestsYear').post(function (req,res){
  const yearToFind = req.body.year;
  const deletedCount = [0,0,0,0,0,0,0,0,0,0,0,0];

  UserRequestingDeleted.find()
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if (response[i].DeletedRequestedDate.getFullYear() == yearToFind){
          switch(response[i].DeletedRequestedDate.getMonth()){
            case(0):
              deletedCount[0]++;
              break;

            case(1):
              deletedCount[1]++;
              break;

            case(2):
              deletedCount[2]++;
              break;

            case(3):
              deletedCount[3]++;
              break;

            case(4):
              deletedCount[4]++;
              break;

            case(5):
              deletedCount[5]++;
              break;

            case(6):
              deletedCount[6]++;
              break;

            case(7):
              deletedCount[7]++;
              break;

            case(8):
              deletedCount[8]++;
              break;

            case(9):
              deletedCount[9]++;
              break;

            case(10):
              deletedCount[10]++;
              break;

            case(11):
              deletedCount[11]++;
              break;
          }
        }
    }

    console.log("The total number of requests deleted this year "+deletedCount);

    res.status(200).send({
      deletedCount: deletedCount
    })
  })
})

module.exports = UserRequestDeletedRoute;