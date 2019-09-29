const express = require('express');
const NurseRegRoutes = express.Router();

let NurseReg = require('./nurseReg.model');

// Defined store route
NurseRegRoutes.route('/add').post(function (req, res) {
  let nurseReg = new NurseReg(req.body);
  nurseReg.save()
    .then(nurseReg => {
      res.status(200).json({'NurseReg': 'nurseReg in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


NurseRegRoutes.route('/').get(function(req, res) {
 NurseReg.find(function(err, CAREME_APP) {
      if (err) {
          console.log(err);
      } else {
          res.json(CAREME_APP);
      }
  });
});

module.exports = NurseRegRoutes;