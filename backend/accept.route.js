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


//   // Deleting Notification Data
//   UserRequestRoute.route('/delete').post(function (req, res) {
//   console.log(req.body);
//   UserRequesting.deleteOne({_id: req.body.NotificationID })
//     .then(response=>{
//       console.log(res.body);
//       res.status(200).send({
//         success: true,
//         message: "Notification Data Removed"
//       })
//     })
// })


// //Retrive Notification Data
// UserRequestRoute.route('/notification/:id').get(function(req, res){
//     UserRequesting.find({RequestedNurseID: req.params.id} , function (err, Notification) {
//         if (err) {
//           console.log(err);
//         } else {
//           res.json(Notification);
//           console.log(Notification)
//         }
// });
// });
  
module.exports = UserAcceptRoute;