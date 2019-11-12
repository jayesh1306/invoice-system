const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const db = require('../config/keys').mongoURI;
const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const Invoices = require('../models/Invoice');
const http = require('http');
const numWords = require('num-words');

var counter = 1;

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async function (req, res) {
    customers = await Customer.find();
    res.render('dashboard', {
        customers: customers,
        message: ''
    });
});

//Invoice generation
router.post('/dashboard/invoice', ensureAuthenticated, async function (req, res, next) {
    req.body.date = getDateInFormat();
    items = req.body.item;
    total = TotalPrice(req)
    totalInWords = numWords(total);
    var quantity1 = [];
    quantity = req.body.quantity;
    var len;
    if (quantity[1] == '') {
        quantity1.push(req.body.quantity[0]);
        len = quantity1.length;
    } else {
        len = quantity.length
    }
    res.render('invoice', {
        data: req.body,
        items: items,
        total: total,
        Inwords: totalInWords,
        date: req.body.date,
        length: len,
        title: Date()
    })
});



//AddCustomer form page
router.get('/dashboard/addCustomer', ensureAuthenticated, async function (req, res, next) {
    res.render('addCustomer', {
        message: '',
        present: ''
    })
})

//add customer into databse
router.post('/dashboard/addCustomer', ensureAuthenticated, async function (req, res, next) {
    var customer = await Customer.find({ 'name': req.body.name });
    console.log(customer);
    if (customer.length > 0) {
        res.render('addCustomer', {
            message: 'Customer already present',
        })
    } else {
        var customer = new Customer({
            name: req.body.name,
            add1: req.body.add1,
            add2: req.body.add2,
            add3: req.body.add3
        });

        customer.save(async function (err, data) {
            if (err) throw err;
            else {
                customers = await Customer.find({});
                res.render('dashboard', {
                    customers: customers,
                    message: 'Customer Added Successfully'
                });
            }
        })
    }

})


function TotalPrice(req) {
    rate = req.body.rate;
    quantity = req.body.quantity;
    var sum = 0;
    for (var i = 0; i < rate.length; i++) {
        sum += rate[i] * quantity[i];
    }
    return sum;
}

function getDateInFormat() {
    var date = new Date();
    date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    return date;
}

module.exports = router;