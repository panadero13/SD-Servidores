const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    card_number: {
        type: Number
    },
    card_date: {
        type: String
    },
    card_cvc: {
        type: Number
    },
    credit: {
        type: Number
    }
});

module.exports = User = mongoose.model('user', user);