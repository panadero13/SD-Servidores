const mongoose = require('mongoose');

const vueloOrder = new mongoose.Schema({
    _id: {
        type: String
    },
    vuelo_id: {
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
    plazas_compradas: {
        type: Number
    }
});

module.exports = VueloOrder = mongoose.model('vueloOrder', vueloOrder);