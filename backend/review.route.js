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

  module.exports = UserReviewRoutes;