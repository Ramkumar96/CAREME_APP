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
const UserAcceptRoute = require('./accept.route')
const complaintRoute = require('./complaint.route');

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

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

app.get('/send-email', (req,res)=> {
  //get variables from query string in the search bar
  const {recipient, sender,topic, text} = req.query;

  //sendgrid data requirements
  const msg ={
    to: recipient,
    from:sender,
    subject: topic,
    text:text,
  }

  sgMail.send(msg)
  .then((msg)=> console.log(text));
})