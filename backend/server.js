// creating an Express server,
//  attaching the cors and body-parser middleware and 
//  making the server listening on port 4000

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./Database.js');
const NurseRegRoutes = require('./nurseReg.route');
const ClientRegRoutes = require('./clientReg.route');

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

app.use('/NurseReg', NurseRegRoutes);
app.use('/ClientReg', ClientRegRoutes);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});