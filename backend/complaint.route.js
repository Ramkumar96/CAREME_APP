const express = require('express');
const ComplaintRoutes = express.Router();

let Complaint = require('./complaint.model');

//Adding Complaint
ComplaintRoutes.route('/add').post(function (req, res) {
    console.log(req.body)
    let complaint = new Complaint(req.body);
  
    complaint.save()
    .then(complaint=> {
      res.status(200).json({ 'Complaint': 'Complaint added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  });

//count number of complaints against nurses in a month
ComplaintRoutes.route('/countNurseComplaints').post(function (req,res){
  const yearToFind = req.body.year;
  const monthToFind = req.body.month;
  nurseComCount=0;

  Complaint.find({"accusedUserID" : 0})
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if(response[i].complainedDate.getFullYear()==yearToFind && response[i].complainedDate.getMonth()==monthToFind-1){
          nurseComCount++;
        }
      }

      console.log("Nurses complaints", nurseComCount);

      res.status(200).send({
        nurseComCount: nurseComCount
      })
    })

    .catch(err=>{
      res.status(400).send({
        nurseComCount: 0
      })
    })
})

//count number of complaints against clients in a month
ComplaintRoutes.route('/countClientComplaints').post(function (req,res){
  const yearToFind = req.body.year;
  const monthToFind = req.body.month;
  clientComCount=0;

  Complaint.find({'accusedUserID' : 1})
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if(response[i].complainedDate.getFullYear()==yearToFind && response[i].complainedDate.getMonth()==monthToFind-1){
          clientComCount++;
        }
      }

      console.log("client complaints this month is : ",clientComCount);

      res.status(200).send({
        clientComCount: clientComCount
      })
    })

    .catch(err=>{
      res.status(400).send({
        clientComCount: 0
      })
    })
})

//count total complaints
ComplaintRoutes.route('/countComplaints').get(function (req,res){
  Complaint.find().countDocuments()
    .then(response=>{
      res.status(200).send({
        complaintCount: response
      })
    })
})

//retrieve complaint data for admin purposes
ComplaintRoutes.route('/complaintDetails').get(function (req, res) {
  Complaint.find(function(err, complaints){
    if(err){
      console.log(err);
    }
    else {
      res.json(complaints);
    }
  });
});

module.exports = ComplaintRoutes;