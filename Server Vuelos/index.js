var connectDB = require('./DB/Connection');

var helmet = require('helmet');
var express = require("express");

var app = express();

var cors = require('cors');

connectDB();
app.use(cors());
app.use(express.static('public'));
app.use(express.json({ extended: false }));
app.use(helmet());
app.use('/api/vuelos/orders', require('./Api/VueloOrder'));
app.use('/api/vuelos', require('./Api/Vuelo'));

var PORT = 3000;
var HOST = '0.0.0.0';

var server = app.listen(PORT, HOST, listenting);

function listenting() {
    console.log("Server is running on Port:" + PORT);
}