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

  module.exports = MessagingRoutes;