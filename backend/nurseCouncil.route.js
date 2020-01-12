const express = require('express');
const NurseCouncilRoutes = express.Router();

let NurseCouncil = require('./nurseCouncil.model');

//Verifying nurseID and NIC
NurseCouncilRoutes.route('/verify').post(function (req, res) {
    console.log(req.body)
    var req_NIC = req.body.NIC;
    NurseCouncil.findOne({nurseID: req.body.nurseID })
      .then(response => {
        var res_NIC = response.NIC;
        //console.log(req_password, res_password)
        console.log(req_NIC == res_NIC)
        if (req_NIC == res_NIC) {
          console.log("Nurse ID verified")
          res.status(200).send({
            success: true,
            message: "Login success",
          })
        } else {
          res.status(200).send({
            success: false
          })
        }
      })

      .catch(err => {
        res.status(200).send({
            success:false
        });
      });
  });

module.exports = NurseCouncilRoutes;