const express = require('express');
const UserReviewRoutes = express.Router();

let UserReview = require('./review.model');

// //Adding review
UserReviewRoutes.route('/add').post(function (req, res) {
    console.log(req.body)
    let userReview = new UserReview(req.body);
  
    userReview.save()
    .then(userReview=> {
      res.status(200).json({ 'UserReview': 'Review added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  });

//retrieve a review for the user profile
UserReviewRoutes.route('/retrieveReview').post(function (req,res){
  var emailToFind = req.body.Email;

  UserReview.findOne({ReviewedUser: emailToFind})
    .then(response=>{
        res.status(200).send({
          reviewBody: response
       })

       console.log("Successfully retrieved");
    })

    .catch(err=>{
        console.log("Error while retrieving review");
    })
})  


//count number of reviews in a month
UserReviewRoutes.route('/countReviews').post(function (req,res){
  const yearToFind = req.body.year;
  const monthToFind = req.body.month;
  reviewCount=0;

  UserReview.find()
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if(response[i].ReviewDate.getFullYear()==yearToFind && response[i].ReviewDate.getMonth()==monthToFind-1){
          reviewCount++;
        }
      }

      console.log(reviewCount);

      res.status(200).send({
        reviewCount : reviewCount
      })
    })

    .catch(err=>{
      res.status(400).send({
        reviewCount: 0
      })
    })
})

//count number of user ratings throughout a year
UserReviewRoutes.route('/countReviewsYear').post(function (req,res){
  const yearToFind = req.body.year;
  const reviewCount = [0,0,0,0,0,0,0,0,0,0,0,0];

  UserReview.find()
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if (response[i].ReviewDate.getFullYear() == yearToFind){
          switch(response[i].ReviewDate.getMonth()){
            case(0):
              reviewCount[0]++;
              break;

            case(1):
              reviewCount[1]++;
              break;

            case(2):
              reviewCount[2]++;
              break;

            case(3):
              reviewCount[3]++;
              break;

            case(4):
              reviewCount[4]++;
              break;

            case(5):
              reviewCount[5]++;
              break;

            case(6):
              reviewCount[6]++;
              break;

            case(7):
              reviewCount[7]++;
              break;

            case(8):
              reviewCount[8]++;
              break;

            case(9):
              reviewCount[9]++;
              break;

            case(10):
              reviewCount[10]++;
              break;

            case(11):
              reviewCount[11]++;
              break;
          }
        }
    }

    console.log("The total number of reviews this year "+reviewCount);

    res.status(200).send({
      reviewCount : reviewCount
    })
  })
})

  module.exports = UserReviewRoutes;