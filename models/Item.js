const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
});

const Item = mongoose.model('Item', ItemSchema, 'items');

module.exports = Item;