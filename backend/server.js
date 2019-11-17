const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./Database.js');
const userRoute = require('./user.route');

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
app.use('/uploads', express.static('uploads'));
app.use('/user',userRoute);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});