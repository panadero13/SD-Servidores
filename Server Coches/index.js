var connectDB = require('./DB/Connection');

var helmet = require('helmet');
var express = require("express");

var app = express();

var cors = require('cors');

connectDB();
app.use(cors());
app.use(express.static('public'));
app.use(helmet());
app.use(express.json({ extended: false }));
app.use('/api/coches', require('./Api/Coche'));
app.use('/api/coches/orders', require('./Api/CocheOrder'));

var PORT = 3001;
var HOST = '0.0.0.0';

var server = app.listen(PORT, HOST, listenting);

function listenting() {
    console.log("Server is running on Port:" + PORT);
}