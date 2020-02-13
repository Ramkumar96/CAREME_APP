const express = require('express');
const MessagingRoutes = express.Router();

let Messaging = require('./messaging.model');

MessagingRoutes.route('/add').post(function (req, res) {
    console.log(req.body)
    let messaging = new Messaging(req.body);
  
    messaging.save()
    .then(messaging=> {
      res.status(200).json({ 'Messaging':'Message sent successfully' });
    })
    .catch(err => {
      res.status(400).send("Unable to send message");
    });
});

MessagingRoutes.route('/msgdata').get(function (req, res) {
  //console.log(req.params.user)
  Messaging.find({'receiverEmail' : req.body.user})
    .then(response => {
      console.log(response)
      res.status(200).send({
        success: true,
        message: "Message retrieve success",
        msg_data: response
      }) 
    })
    .catch(err => {
        res.status(400).send("Unable to retrieve data");
      });
});

  module.exports = MessagingRoutes;