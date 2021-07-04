const mongoose = require('mongoose');

const hotelOrder = new mongoose.Schema({
    _id: {
        type: String
    },
    hotel_id: {
        type: String
    },
    usuario_email: {
        type: String
    },
    precio: {
        type: Number
    },
    fecha_orden: {
        type: String
    },
    dias_contratados: {
        type: Number
    },
});

module.exports = HotelOrder = mongoose.model('hotelOrder', hotelOrder);