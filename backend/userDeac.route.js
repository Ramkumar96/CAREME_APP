const express = require('express');
const UserDeacRoutes = express.Router();

let UserDeac = require('./userDeac.model');

// Defined store route
UserDeacRoutes.route('/add').post(function (req, res) {
    let userDeac = new UserDeac(req.body);
  
    userDeac.save()
    .then(userDeac => {
      res.status(200).json({ 'UserDeac': 'User deactivateed successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to deac database");
    });
  });

module.exports = UserDeacRoutes;