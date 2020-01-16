const express = require('express');
const UserRatingRoutes = express.Router();

let UserRating = require('./rating.model');

// check whether already rated
UserRatingRoutes.route('/checkPresence').post(function (req, res) {
    UserRating.findOne({RatedBy: req.body.clientEmail, RatedUser: req.body.nurseEmail })
      .then(response => {
        if (response) {
          console.log("already rated")
          res.status(200).send({
            success: true,
            response_body: response,
            message: "Already rated",
          })
        } 
        else {
            console.log("Not rated yet");
            res.status(200).send({
                success: false
          })
        }
      })
  });

// //Adding rating
UserRatingRoutes.route('/add').post(function (req, res) {
    console.log(req.body)
    let userRating = new UserRating(req.body);
  
    userRating.save()
    .then(userRating=> {
      res.status(200).json({ 'UserRating': 'Rating added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  });

// //userUpdate
// UserRatingRoutes.route('/update').put(function(req,res){
//     //console.log(req.body)
//     UserRating.findOneAndUpdate({"RatedUser": req.body.RatedUser, "RatedBy": req.body.RatedBy})
//     .then(response=>{
//       res.status(200).send({
//         success:true,
//         message:"Rating Updated success",
//       })
//     })
//   })

UserRatingRoutes.route('/delete').post(function (req, res) {
    console.log(req.body);
    UserRating.deleteOne({RatedBy: req.body.RatedBy, RatedUser: req.body.RatedUser })
      .then(response=>{
        res.status(200).send({
          success:true,
          message:"Previous rating removed"
        })
      })
  })

module.exports = UserRatingRoutes;