const express = require('express');
const UserReviewRoutes = express.Router();

let UserReview = require('./review.model');

// //Adding rating
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

  module.exports = UserReviewRoutes;