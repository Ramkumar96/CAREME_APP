const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./Database.js');

const userRoute = require('./user.route');
const userDeacRoute = require('./userDeac.route');
const nurseCouncilRoute = require('./nurseCouncil.route');
const userRatingRoute = require('./rating.route');
const userReviewRoute = require('./review.route');
const UserRequestRoute = require('./request.route');
const UserAcceptRoute = require('./accept.route');
const complaintRoute = require('./complaint.route');
const UserRequestDeletedRoute = require('./requestDeleted.route');


//connecting database
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

//attaching the cors and body-parser middleware to express server
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/userDeac', userDeacRoute);
app.use('/user', userRoute);
app.use('/nurseCouncil', nurseCouncilRoute);
app.use('/rating', userRatingRoute);
app.use('/review', userReviewRoute);
app.use('/request', UserRequestRoute);
app.use('/accept', UserAcceptRoute);
app.use('/complaint', complaintRoute);
app.use('/requestDeleted', UserRequestDeletedRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

app.use('/public', express.static('public'));
app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
      next(new Error('Something went wrong'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});