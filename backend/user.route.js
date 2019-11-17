const express = require('express');
const UserRegRoutes = express.Router();
const multer = require('multer');
let UserReg = require('./user.model');

// Defined store route
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
  var req_password = req.body.password;
  UserReg.findOne({Email: req.body.email })
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
        //erorrr res
      }
    })
});

//userdata
UserRegRoutes.route('/userdata/:id').get(function (req, res) {
  //console.log(req.params.id)
  UserReg.findById(req.params.id)
  .then(response=>{
    console.log(response)
    res.status(200).send({
      success:true,
      message:"User Data success",
      profile_data:response
    })
  })
});


//userUpdate
UserRegRoutes.route('/userdata/update/:id').put(function(req,res){
  //console.log(req.body)
  UserReg.findOneAndUpdate({_id:req.params.id},req.body)
  .then(response=>{
    res.status(200).send({
      success:true,
      message:"User Data Update success",
    })
  })
})






UserRegRoutes.route('/').get(function (req, res) {
 UserReg.find({userID:0},function (err, CAREME_APP) {
    if (err) {
       console.log(err);
     } else {
       res.json(CAREME_APP);
     }
   });
 });

 
 
 //profile pic update
 const storage = multer.diskStorage({
   destinationn:function(req,file,cb){
     cb(null,'./uploads');
   },
   filename: function (req, file,cb){
     cb(null,Date.now() + file.originalname);
   }
 });

 const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
  } else {
      // rejects storing a file
      cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
      fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

//stores image in uploads folder using multer and creates a reference to the file

UserRegRoutes.route("/uploadmulter")
  .post(upload.single('profilePic'), (req, res, next) => {
      console.log(req.body);
      const newImage = new Image({
          // imageName: req.body.imageName,
          profilePic: req.file.path
      });

      newImage.save()
          .then((result) => {
              console.log(result);
              res.status(200).json({
                  success: true,
                  document: result
              });
          })
          .catch((err) => next(err));
  });


 // upload image ,store in mongodb database
 UserRegRoutes.route("/uploadbase")
  .post((req, res, next) => {
      const newImage = new Image({
          // imageName: req.body.imageName,
          profilePic: req.body.profilePic
      });

      newImage.save()
          .then((result) => {
              res.status(200).json({
                  success: true,
                  document: result
              });
          })
          .catch((err) => next(err));
  });

module.exports = UserRegRoutes;