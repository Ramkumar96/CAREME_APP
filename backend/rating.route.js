const express = require('express');
const UserRatingRoutes = express.Router();

let UserRating = require('./rating.model');

// check whether already rated
UserRatingRoutes.route('/checkPresence').post(function (req, res) {
    UserRating.findOne({RatedBy: req.body.RatedBy, RatedUser: req.body.RatedUser })
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

//count number of ratings in a month
UserRatingRoutes.route('/countRatings').post(function (req,res){
  const yearToFind = req.body.year;
  const monthToFind = req.body.month;
  ratingCount=0;

  UserRating.find()
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if(response[i].RatedDate.getFullYear()==yearToFind && response[i].RatedDate.getMonth()==monthToFind-1){
          ratingCount++;
        }
      }

      console.log(ratingCount);

      res.status(200).send({
        ratingCount : ratingCount
      })
    })

    .catch(err=>{
      res.status(400).send({
        ratingCount: 0
      })
    })
})


//count number of user ratings throughout a year
UserRatingRoutes.route('/countRatingsYear').post(function (req,res){
  const yearToFind = req.body.year;
  const ratingCount = [0,0,0,0,0,0,0,0,0,0,0,0];

  UserRating.find()
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if (response[i].RatedDate.getFullYear() == yearToFind){
          switch(response[i].RatedDate.getMonth()){
            case(0):
              ratingCount[0]++;
              break;

            case(1):
              ratingCount[1]++;
              break;

            case(2):
              ratingCount[2]++;
              break;

            case(3):
              ratingCount[3]++;
              break;

            case(4):
              ratingCount[4]++;
              break;

            case(5):
              ratingCount[5]++;
              break;

            case(6):
              ratingCount[6]++;
              break;

            case(7):
              ratingCount[7]++;
              break;

            case(8):
              ratingCount[8]++;
              break;

            case(9):
              ratingCount[9]++;
              break;

            case(10):
              ratingCount[10]++;
              break;

            case(11):
              ratingCount[11]++;
              break;
          }
        }
    }

    console.log("The total number of ratings this year "+ratingCount);

    res.status(200).send({
      ratingCount: ratingCount
    })
  })
})

module.exports = UserRatingRoutes;