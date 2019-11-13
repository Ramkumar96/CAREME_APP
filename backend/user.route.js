const express = require('express');
const UserRegRoutes = express.Router();

let UserReg = require('./user.model');

// Defined store route
UserRegRoutes.route('/add').post(function (req, res) {
  let userReg = new UserReg(req.body);
  userReg.save()
    .then(userReg => {
      res.status(200).json({'UserReg': 'User added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


UserRegRoutes.route('/').get(function(req, res) {
 UserReg.find({userID:0 },function(err, CAREME_APP) {
      if (err) {
          console.log(err);
      } else {
          res.json(CAREME_APP);
      }
  });
});

module.exports = UserRegRoutes;