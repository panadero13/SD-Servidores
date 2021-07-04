var connectDB = require('./DB/Connection');

var express = require('express');

var helmet = require('helmet');

var app = express();

var cors = require('cors');

connectDB();
app.use(cors());
app.use(express.static('public'));
app.use(helmet());
app.use(express.json({ extended: false }));
app.use('/api/hoteles', require('./Api/Hotel'));
app.use('/api/hoteles/orders', require('./Api/HotelOrder'));

var PORT = 3002;
var HOST = '0.0.0.0';

var server = app.listen(PORT, HOST, listenting);

function listenting() {
    console.log("Server is running on Port:" + PORT);
}