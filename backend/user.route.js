const express = require('express');
const UserRegRoutes = express.Router();

let UserReg = require('./user.model');

let multer = require('multer'),
  mongoose = require('mongoose'),
  uuidv4 = require('uuid/v4');

// User Registration
UserRegRoutes.route('/add').post(function (req, res) {
  console.log(req.body)
  let userReg = new UserReg(req.body);

  userReg.save()
    .then(userReg => {
      res.status(200).json({ 'UserReg': 'User added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

//Login
UserRegRoutes.route('/login').post(function (req, res) {
  console.log(req.body)
  var req_password = req.body.Password;
  UserReg.findOne({ Email: req.body.Email })
    .then(response => {
      var res_password = response.PW;
      console.log(req_password, res_password)
      console.log(req_password == res_password)
      if (req_password == res_password) {
        console.log("login sucess")
        res.status(200).send({
          success: true,
          message: "Login success",
          user_data: response
        })
      } else {
        res.status(200).send({
          success: false
        })
      }
    })
});

//userdata
UserRegRoutes.route('/userdata/:id').get(function (req, res) {
  //console.log(req.params.id)
  UserReg.findById(req.params.id)
    .then(response => {
      console.log(response)
      res.status(200).send({
        success: true,
        message: "User Data success",
        profile_data: response
      })
    })
});

//userUpdate
UserRegRoutes.route('/userdata/update/:id').put(function (req, res) {
  //console.log(req.body)
  UserReg.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(response => {
      res.status(200).send({
        success: true,
        message: "User Data Update success",
      })
    })
})

//update Rating
UserRegRoutes.route('/userdata/updateRating').put(function(req,res){
  console.log(req.body)
  UserReg.updateOne({Email: req.body.nurseEmail}, {$inc: {starRating: req.body.Rating, ratingCount: 1}})
  .then(response=>{
    res.status(200).send({
      success:true,
      message:"User Data Update success",
    })
  })
})

// Removing user upon deactivation
UserRegRoutes.route('/delete').post(function (req, res) {
  console.log(req.body);
  UserReg.deleteOne({Email: req.body.Email })
    .then(response=>{
      console.log(res.body);
      res.status(200).send({
        success: true,
        message: "User removed"
      })
    })
})

//count number of nurses in the system
UserRegRoutes.route('/countNurses').get(function (req,res){
  UserReg.find({"userID" : "0"}).countDocuments()
    .then(response=>{
      res.status(200).send({
        nurseCount: response
      })
    })
})

//count number of clients in the system
UserRegRoutes.route('/countClients').get(function (req,res){
  UserReg.find({"userID" : "1"}).countDocuments()
    .then(response=>{
      res.status(200).send({
        clientCount: response
      })
    })
})

//NurseprofileRetrieve
UserRegRoutes.route('/').get(function (req, res) {
  UserReg.find({ userID: 0 }, function (err, CAREME_APP) {
    if (err) {
      console.log(err);
    } else {
      res.json(CAREME_APP);
    }
  });
});

//clientListRetrieve
UserRegRoutes.route('/clientlist').get(function (req, res) {
  UserReg.find({ userID: 1 }, function (err, CAREME_APP) {
    if (err) {
      console.log(err);
    } else {
      res.json(CAREME_APP);
    }
  });
});

//validate email
UserRegRoutes.route('/validEmail').post(function (req, res) {
  UserReg.findOne({ Email: req.body.Email })
    .then(response => {
      if (response) {
        console.log("existsss");
        res.status(200).send({
          success: true,
          message: "Email already exists",
        });
      } else {
        console.log('not there');
        res.status(200).send({
          success: false,
        });
      }
    })
});


//validate nurseID
UserRegRoutes.route('/validNurseID').post(function (req, res) {
  UserReg.findOne({ nurseID: req.body.nurseID })
    .then(response => {
      if (response) {
        console.log("existsss");
        res.status(200).send({
          success: true,
          message: "Registered nurse ID. try another.",
        });
      } else {
        console.log('not there');
        res.status(200).send({
          success: false,
        });
      }
    })
});

//Profile picture upload and retrieve
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

// User model for prfile pic upload
UserRegRoutes.post('/user-profile/', upload.single('profilePic'), async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  await UserReg.findOneAndUpdate({ "_id": req.body.id }, { profilePic: url + '/public/' + req.file.filename }, (err, doc) => {
    if (err) {
      res.send(err)
    }
    res.send(doc)
  })
})

UserRegRoutes.get("/", (req, res, next) => {
  UserReg.find().then(data => {
    res.status(200).json({
      message: "Profile Pic retrieved successfully!",
      users: data
    });
  });
});




//unavailable dates
UserRegRoutes.route('/userdata/unavailableDates/:id').post(function (req, res) {
  console.log(req.body.date);
  UserReg.findByIdAndUpdate(req.params.id, { $push: { "UnavailableDates": req.body.date } }, (err, doc) => {

    if (err) {
      console.log(err)
      res.send(err)
    }

    console.log(doc)

    res.status(200).send({
      success: true,
      message: "User Data Update success",
      profile_data: doc
    });
  })
  // UserReg.update({_id:req.params.id},
  //   // {$push:{date:req.body.UnavailableDates}})


  //   )
  // .then(response=>{
  //   console.log(response)
  //   res.status(200).send({    
  //     success:true,
  //     message:"User Data Update success",
  //   });
  // });
});


//get unavailable dates
UserRegRoutes.route('/userdata/unavailableDates/:id').get(function (req, res) {
  //console.log(req.params.id)
  UserReg.findById(req.params.id)
    .then(response => {
      console.log(response)
      res.status(200).send({
        success: true,
        message: "User Data success",
        profile_data: response
      })
    })
});



module.exports = UserRegRoutes;