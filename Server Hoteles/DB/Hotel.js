const mongoose = require('mongoose');

const hotel = new mongoose.Schema({
    nombre: {
        type: String
    },
    ciudad: {
        type: String
    },
    precio_dia: {
        type: Number
    },
    tipo_habitacion: {
        type: String
    },
    disponible: {
        type: Boolean
    },
    capacidad_personas: {
        type: Number
    },
    camas: {
        type: Number
    },
    stock: {
        type: Number
    },
});

module.exports = Hotel = mongoose.model('hotel', hotel);