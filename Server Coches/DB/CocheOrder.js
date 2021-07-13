const mongoose = require('mongoose');

const cocheOrder = new mongoose.Schema({
    _id: {
        type: String
    },
    agencia_id: {
        type: String
    },
    coche_id: {
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

module.exports = CocheOrder = mongoose.model('cocheOrder', cocheOrder);