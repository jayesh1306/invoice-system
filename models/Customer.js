const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    add1: {
        type: String,
        required: true
    },
    add2: {
        type: String,
        required: true
    },
    add3: {
        type: String,
        required: true
    }
});

const Customer = mongoose.model('Customer', CustomerSchema, 'customer');

module.exports = Customer;