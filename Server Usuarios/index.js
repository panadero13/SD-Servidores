var connectDB = require('./DB/Connection');

var express = require("express");

var app = express();

var cors = require('cors');

connectDB();
app.use(cors());
app.use(express.static('public'));
app.use(express.json({extended: false}));
app.use('/api', require('./Api/Usuario'));

var PORT = 3001;
var HOST = '0.0.0.0';

var server = app.listen(PORT, HOST, listenting);

function listenting() {
  console.log("Server is running on Port:"+ PORT);
}