const express = require('express');
const UserRegRoutes = express.Router();
let UserReg = require('./user.model');

let multer = require('multer'),
  mongoose = require('mongoose'),
  uuidv4 = require('uuid/v4');

const StreamChat = require('stream-chat').StreamChat;

// User Registration
UserRegRoutes.route('/add').post(function (req, res) {
  console.log(req.body)
  let userReg = new UserReg(req.body);

  userReg.save()
    .then(userReg => {
      res.status(200).json({ 'UserReg': 'User added successfully' });
      var n = req.body.Email.indexOf("@");
        var name = req.body.Email.slice(0, n);
        console.log(name);
        const client = new StreamChat('', 'yet5qpqxuh9p98r94vcvndd5rr82t2x2cb9m3dgaq4yx46ua8r4ckpuu7fvpyews');
        const chatToken = client.createToken(name);
        console.log(chatToken);
        client.setUser(
          {
              id: name,
              name: name,
              //image: 'http://bit.ly/2O35mws',
          },
          userToken,
        );


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
        
        var n = req.body.Email.indexOf("@");
        var name = req.body.Email.slice(0, n);
        console.log(name);
        const client = new StreamChat('', 'yet5qpqxuh9p98r94vcvndd5rr82t2x2cb9m3dgaq4yx46ua8r4ckpuu7fvpyews');
        const chatToken = client.createToken(name);
        console.log(chatToken);

        console.log("login sucess")
        res.status(200).send({
          success: true,
          message: "Login success",
          user_data: response,
          chat_token: chatToken
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
  UserReg.updateOne({Email: req.body.RatedUser}, {$inc: {starRating: req.body.Rating, ratingCount: 1}})
  .then(response=>{
    res.status(200).send({
      success:true,
      message:"User Data Update success",
    })
  })
})


//Deduct Rating
UserRegRoutes.route('/deductRating').put(function(req,res){
  console.log(req.body)
  UserReg.updateOne({Email: req.body.RatedUser}, {$inc: {starRating: -req.body.Rating, ratingCount: -1}})
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


//count number of nurses registered in a month
UserRegRoutes.route('/countNursesMonth').post(function (req,res){
  const yearToFind = req.body.year;
  const monthToFind = req.body.month;

  console.log("testingg");
  UserReg.find({"userID" : "0"})
    .then(response=>{
      nurseCount=0;
      for (let i=0; i<response.length; i++){
        if(response[i].RegDate.getFullYear()==yearToFind && response[i].RegDate.getMonth() == monthToFind-1){
          nurseCount++;
        }
      }

      res.status(200).send({
        nurseCount: nurseCount
      })
    })

    .catch(err=>{
      res.status(400).send({
        nurseCount: 0
      })
    })
})


//count number of clients registered in a month
UserRegRoutes.route('/countClientsMonth').post(function (req,res){
  const yearToFind = req.body.year;
  const monthToFind = req.body.month;
  clientCount=0;

  UserReg.find({"userID" : 1})
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if(response[i].RegDate.getFullYear()==yearToFind && response[i].RegDate.getMonth()==monthToFind-1){
          clientCount++;
        }
      }

      res.status(200).send({
        clientCount : clientCount
      })
    })

    .catch(err=>{
      res.status(400).send({
        clientCount: 0
      })
    })
})


//count number of clients registered throughout a year
UserRegRoutes.route('/countClientsYear').post(function (req,res){
  const yearToFind = req.body.year;
  const clientCount = [0,0,0,0,0,0,0,0,0,0,0,0];

  UserReg.find({"userID" : 1})
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if (response[i].RegDate.getFullYear() == yearToFind){
          switch(response[i].RegDate.getMonth()){
            case(0):
              clientCount[0]++;
              break;

            case(1):
              clientCount[1]++;
              break;

            case(2):
              clientCount[2]++;
              break;

            case(3):
              clientCount[3]++;
              break;

            case(4):
              clientCount[4]++;
              break;

            case(5):
              clientCount[5]++;
              break;

            case(6):
              clientCount[6]++;
              break;

            case(7):
              clientCount[7]++;
              break;

            case(8):
              clientCount[8]++;
              break;

            case(9):
              clientCount[9]++;
              break;

            case(10):
              clientCount[10]++;
              break;

            case(11):
              clientCount[11]++;
              break;
          }
        }
    }

    console.log(clientCount);

    res.status(200).send({
      clientCount: clientCount
    })
  })
})


//count number of new users district wise per year
UserRegRoutes.route('/countUsersDistrict').post(function (req,res){
  const yearToFind = req.body.year;
  const userCountDistrict = [0,0,0,0];

  UserReg.find({$or: [{"userID" : 0}, {"userID" : 1}]})
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if (response[i].RegDate.getFullYear() == yearToFind){
          switch(response[i].Location){
            case("Colombo"):
              userCountDistrict[0]++;
              break;

            case("Galle"):
              userCountDistrict[1]++;
              break;

            case("Gampaha"):
              userCountDistrict[2]++;
              break;

            case("Kurunegala"):
              userCountDistrict[3]++;
              break;
          }
        }
    }

    console.log(userCountDistrict);

    res.status(200).send({
      userCountDistrict: userCountDistrict
    })
  })
})

//count total active users according to that month
UserRegRoutes.route('/countTotalUsersDistrict').post(function (req,res){
  const userCountDistrict = [0,0,0,0];

  UserReg.find({$or: [{"userID" : 0}, {"userID" : 1}]})
    .then(response=>{
      for (let i=0; i<response.length; i++){
          switch(response[i].Location){
            case("Colombo"):
              userCountDistrict[0]++;
              break;

            case("Galle"):
              userCountDistrict[1]++;
              break;

            case("Gampaha"):
              userCountDistrict[2]++;
              break;

            case("Kurunegala"):
              userCountDistrict[3]++;
              break;
          }
    }

    console.log("Total users according to the district",userCountDistrict);

    res.status(200).send({
      userCountDistrict: userCountDistrict
    })
  })
})

//count number of registered users district wise per month
UserRegRoutes.route('/countUsersDistrictMonth').post(function (req,res){
  const yearToFind = req.body.year;
  const monthToFind = req.body.month;
  const userCountDistrict = [0,0,0,0];

  UserReg.find({$or: [{"userID" : 0}, {"userID" : 1}]})
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if (response[i].RegDate.getFullYear() == yearToFind && response[i].RegDate.getMonth() == monthToFind-1){
          switch(response[i].Location){
            case("Colombo"):
              userCountDistrict[0]++;
              break;

            case("Galle"):
              userCountDistrict[1]++;
              break;

            case("Gampaha"):
              userCountDistrict[2]++;
              break;

            case("Kurunegala"):
              userCountDistrict[3]++;
              break;
          }
        }
    }

    console.log(userCountDistrict);

    res.status(200).send({
      userCountDistrict: userCountDistrict
    })
  })
})

//count number of registered nurses based on type for a whole year
UserRegRoutes.route('/countNursesType').post(function (req,res){
  const yearToFind = req.body.year;
  const nurseTypeCount = [0,0,0,0,0,0];

  UserReg.find({"userID" : 0})
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if (response[i].RegDate.getFullYear() == yearToFind){
          switch(response[i].nurseType){
            case("Emergency"):
              nurseTypeCount[0]++;
              break;

            case("Surgical"):
              nurseTypeCount[1]++;
              break;

            case("Geriatric"):
              nurseTypeCount[2]++;
              break;

            case("Midwife"):
              nurseTypeCount[3]++;
              break;

            case("Pediatric"):
              nurseTypeCount[4]++;
              break;

            case("Psychiatric"):
              nurseTypeCount[5]++;
              break;
          }
        }
    }

    console.log(nurseTypeCount);

    res.status(200).send({
     nurseTypeCount: nurseTypeCount
    })
  })
})


//count number of registered nurses type wise per month
UserRegRoutes.route('/countNursesTypeMonth').post(function (req,res){
  const yearToFind = req.body.year;
  const monthToFind = req.body.month;
  const nurseTypeCount = [0,0,0,0,0,0];

  UserReg.find({"userID" : 0})
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if (response[i].RegDate.getFullYear() == yearToFind && response[i].RegDate.getMonth() == monthToFind-1){
          switch(response[i].nurseType){
            case("Emergency"):
              nurseTypeCount[0]++;
              break;

            case("Surgical"):
              nurseTypeCount[1]++;
              break;

            case("Geriatric"):
              nurseTypeCount[2]++;
              break;

            case("Midwife"):
              nurseTypeCount[3]++;
              break;

            case("Pediatric"):
              nurseTypeCount[4]++;
              break;

            case("Psychiatric"):
              nurseTypeCount[5]++;
              break;
          }
        }
    }

    console.log(nurseTypeCount);

    res.status(200).send({
     nurseTypeCount: nurseTypeCount
    })
  })
})


//count all nurses types in the system 
UserRegRoutes.route('/countTotalNursesType').post(function (req,res){
  const nurseTypeCount = [0,0,0,0,0,0];

  UserReg.find({"userID" : 0})
    .then(response=>{
      for (let i=0; i<response.length; i++){
          switch(response[i].nurseType){
            case("Emergency"):
              nurseTypeCount[0]++;
              break;

            case("Surgical"):
              nurseTypeCount[1]++;
              break;

            case("Geriatric"):
              nurseTypeCount[2]++;
              break;

            case("Midwife"):
              nurseTypeCount[3]++;
              break;

            case("Pediatric"):
              nurseTypeCount[4]++;
              break;

            case("Psychiatric"):
              nurseTypeCount[5]++;
              break;
          }
    }

    console.log("nurse type",nurseTypeCount);

    res.status(200).send({
     nurseTypeCount: nurseTypeCount
    })
  })
})

//count number of nurses registered throughout a year
UserRegRoutes.route('/countNursesYear').post(function (req,res){
  const yearToFind = req.body.year;
  const nurseCount = [0,0,0,0,0,0,0,0,0,0,0,0];

  UserReg.find({"userID" : 0})
    .then(response=>{
      for (let i=0; i<response.length; i++){
        if (response[i].RegDate.getFullYear() == yearToFind){
          switch(response[i].RegDate.getMonth()){
            case(0):
              nurseCount[0]++;
              break;

            case(1):
              nurseCount[1]++;
              break;

            case(2):
              nurseCount[2]++;
              break;

            case(3):
              nurseCount[3]++;
              break;

            case(4):
              nurseCount[4]++;
              break;

            case(5):
              nurseCount[5]++;
              break;

            case(6):
              nurseCount[6]++;
              break;

            case(7):
              nurseCount[7]++;
              break;

            case(8):
              nurseCount[8]++;
              break;

            case(9):
              nurseCount[9]++;
              break;

            case(10):
              nurseCount[10]++;
              break;

            case(11):
              nurseCount[11]++;
              break;
          }
        }
    }

    console.log(nurseCount);

    res.status(200).send({
      nurseCount: nurseCount
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
  console.log(req.body);
  UserReg.findOne({ Email: req.body.Email })
    .then(response => {
      if (response) {
        console.log("existsss");
        res.status(200).send({
          success: true,
          message: "Email already exists in user collection",
        });
      } else {
        console.log('Email not there in user collection');
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
        console.log("Email exists in user collection");
        res.status(200).send({
          success: true,
          message: "Registered nurse ID. try another.",
        });
      } else {
        console.log('Email not there in user collection');
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
  // pusher.trigger(req.params.id, 'my-event', {
  //   "message": "hello world"
  // });
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


//retrieve user data for admin purposes
UserRegRoutes.route('/userDetails').get(function (req, res) {
  UserReg.find(function(err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

module.exports = UserRegRoutes;