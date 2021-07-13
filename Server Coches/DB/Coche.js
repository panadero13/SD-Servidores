const mongoose = require('mongoose');

const coche = new mongoose.Schema({
    server_id: {
        type: String
    },
    marca: {
        type: String
    },
    modelo: {
        type: String
    },
    plazas: {
        type: Number
    },
    precio: {
        type: Number
    },
    disponible: {
        type: Boolean
    },
    stock: {
        type: Number
    },
});

module.exports = Coche = mongoose.model('coche', coche);