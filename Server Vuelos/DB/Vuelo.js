const mongoose = require('mongoose');

const vuelo = new mongoose.Schema({
    server_id: {
        type: String
    },
    origen: {
        type: String
    },
    destino: {
        type: String
    },
    precio: {
        type: Number
    },
    hora: {
        type: String
    },
    fecha: {
        type: String
    },
    disponible: {
        type: Boolean
    },
    stock: {
        type: Number
    }
});

module.exports = Vuelo = mongoose.model('vuelo', vuelo);