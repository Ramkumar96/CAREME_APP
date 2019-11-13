const express = require('express');
const UserRegRoutes = express.Router();

let UserReg = require('./nurseEdit.model');


nurseeditRoutes.route('/update/:id').post(function (req, res) {
    Nurseedit.findById(req.params.id, function(err, nurseedit) {
    if (!nurseedit)
      res.status(404).send("data is not found");
    else {
        nurseedit.NurseLocation = req.body.NurseLocation;
        nurseedit.NurseUni = req.body.NurseUni;
        nurseedit.NurseExp = req.body.NurseExp;
        nurseedit.NurseSkill = req.body.NurseSkill;


        nurseedit.save().then(nurseedit => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});
/*

// Defined store route
NurseeditRoutes.route('/add').post(function (req, res) {
  let nurseedit = new Nurseedit(req.body);
  userReg.save()
    .then(nurseedit => {
      res.status(200).json({'Nurseedit': 'User added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


NurseeditRoutes.route('/').get(function(req, res) {
 Nurseedit.find(function(err, CAREME_APP) {
      if (err) {
          console.log(err);
      } else {
          res.json(CAREME_APP);
      }
  });
});
*/




module.exports = nurseeditRoutes;