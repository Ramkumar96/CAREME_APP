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


// //count number of user ratings throughout a year
// UserRatingRoutes.route('/countRatingsYear').post(function (req,res){
//   const yearToFind = req.body.year;
//   const ratingCount = [0,0,0,0,0,0,0,0,0,0,0,0];

//   UserRating.find()
//     .then(response=>{
//       for (let i=0; i<response.length; i++){
//         if (response[i].RatedDate.getFullYear() == yearToFind){
//           switch(response[i].RatedDate.getMonth()){
//             case(0):
//               ratingCount[0]++;
//               break;

//             case(1):
//               ratingCount[1]++;
//               break;

//             case(2):
//               ratingCount[2]++;
//               break;

//             case(3):
//               ratingCount[3]++;
//               break;

//             case(4):
//               ratingCount[4]++;
//               break;

//             case(5):
//               ratingCount[5]++;
//               break;

//             case(6):
//               ratingCount[6]++;
//               break;

//             case(7):
//               ratingCount[7]++;
//               break;

//             case(8):
//               ratingCount[8]++;
//               break;

//             case(9):
//               ratingCount[9]++;
//               break;

//             case(10):
//               ratingCount[10]++;
//               break;

//             case(11):
//               ratingCount[11]++;
//               break;
//           }
//         }
//     }

//     console.log("The total number of ratings this year "+ratingCount);

//     res.status(200).send({
//       ratingCount: ratingCount
//     })
//   })
// })

module.exports = ComplaintRoutes;