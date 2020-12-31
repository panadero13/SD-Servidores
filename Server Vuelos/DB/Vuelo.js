const mongoose = require('mongoose');

const vuelo = new mongoose.Schema({
    origen:{
        type:String
    },
    destino:{
        type:String
    },
    precio:{
        type:Number
    },
    hora:{
        type:String
    },
    fecha:{
        type:String
    }
});

module.exports= Vuelo = mongoose.model('vuelo',vuelo);