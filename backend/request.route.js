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
  
// // check whether already rated
// UserRequestRoutes.route('/checkPresence').post(function (req, res) {
//     UserRating.findOne({RatedBy: req.body.clientEmail, RatedUser: req.body.nurseEmail })
//       .then(response => {
//         if (response) {
//           console.log("already rated")
//           res.status(200).send({
//             success: true,
//             response_body: response,
//             message: "Already rated",
//           })
//         } 
//         else {
//             console.log("Not rated yet");
//             res.status(200).send({
//                 success: false
//           })
//         }
//       })
//   });




// UserRatingRoutes.route('/delete').post(function (req, res) {
//     console.log(req.body);
//     UserRating.deleteOne({RatedBy: req.body.RatedBy, RatedUser: req.body.RatedUser })
//       .then(response=>{
//         res.status(200).send({
//           success:true,
//           message:"Previous rating removed"
//         })
//       })
//   })

module.exports = UserRequestRoute;