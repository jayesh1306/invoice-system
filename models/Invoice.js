const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    item: {
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const Invoice = mongoose.model('Invoice', InvoiceSchema, 'invoices');

module.exports = Invoice;