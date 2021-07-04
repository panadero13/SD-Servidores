var connectDB = require('./DB/Connection');

var express = require("express");

var https = require('https');
var path = require('path');
var fs = require('fs');

var app = express();

var cors = require('cors');

connectDB();
app.use(cors());
app.use(express.static('public'));
app.use(express.json({ extended: false }));
app.use('/api/vuelos/orders', require('./Api/VueloOrder'));
app.use('/api/vuelos', require('./Api/Vuelo'));

var PORT = 3000;
var HOST = '0.0.0.0';

sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'Cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'Cert', 'cert.pem'))
}, app)

//var server = sslServer.listen(PORT, HOST, listenting);
var server = app.listen(PORT, HOST, listenting);

function listenting() {
    console.log("Server is running on Port:" + PORT);
}