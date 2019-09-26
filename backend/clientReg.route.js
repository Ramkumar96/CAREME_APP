const express = require('express');
const ClientRegRoutes = express.Router();

let ClientReg = require('./clientReg.model');

// Defined store route
ClientRegRoutes.route('/add').post(function (req, res) {
  let clientReg = new ClientReg(req.body);
  clientReg.save()
    .then(clientReg => {
      res.status(200).json({'ClientReg': 'clientReg in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

module.exports = ClientRegRoutes;