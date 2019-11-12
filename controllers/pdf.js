module.exports.generatePdf = async function(req) {
    const Item = require('../models/Item');
    const Customer = require('../models/Customer');
    const Invoice = require('../models/Invoice');
    const pdfkit = require('pdfkit');
    const numberToWords = require('number-to-words');
    const fs = require('fs');
    var item = req.body.item;

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var rate = 0;
    let data;

    try {
        item = await Item.find({ "name": item });
        customer = await Customer.find({ "name": req.body.customer });
    } catch (error) {
        console.log(error);
        return error;
    }

    newdate = day + "/" + month + "/" + year;
    var pdf = new pdfkit();
    pdf.pipe(fs.createWriteStream('./routes/INVOICE.pdf'));

    pdf.image('./public/images/main.png', 50, 50, { width: 100 })

    pdf.font('./public/fonts/arial.ttf')
        .fontSize(10)
        .text('Sangam Educational Services', 160, 80)
        .text(': ' + year + '/', 160, 195)
        .text(': ' + newdate, 160, 208)
        .text(': Due on Receipt', 160, 223)
        .text(': ' + newdate, 160, 238)
        .text('Bill To', 40, 263)
        .text('#', 60, 353)
        .text('Item & Description', 140, 353)
        .text('Qty', 320, 353)
        .text('Rate', 420, 353)
        .text('Amount', 501, 353);

    pdf.font('Times-Roman')
        .text('Kirloskar Layout, Hesaraghatta Main Road', 160, 100)
        .text('Near Sapthagiri College', 160, 112)
        .text('Bangalore Karnataka 560073', 160, 124)
        .text('India', 160, 136)
        .text('#', 40, 195)
        .text('Invoice Date', 40, 208)
        .text('Terms', 40, 223)
        .text('Due Date', 40, 238)
        .text(customer[0].name, 40, 290)
        .text(customer[0].add1, 40, 305)
        .text(customer[0].add2, 40, 320)
        .text(customer[0].add3, 40, 335);

    var x = 353;
    var i = 0;
    let totalAmount = 0;


    item.forEach((items) => {
        if (items.length <= 1) {
            pdf.fontSize(12)
                .text(i + 1, 60, 195 + 22)
                .text(item, 140, 375)
                .text(req.body.quantity, 320, 375)
                .text(items.rate, 420, 375)
                .text('₹' + req.body.quantity * items.rate + '/-', 501, 375);
        } else {
            x += 22;
            let count = x;
            pdf.fontSize(12)
                .text(i + 1, 60, count)
                .text(items.name, 140, count)
                .text(req.body.quantity[i], 320, count)
                .text(items.rate, 420, count)
                .text(req.body.quantity[i] * items.rate + '/-', 501, count);
            var quantity = req.body.quantity[i];
            var rate = items.rate;
            totalAmount += (quantity * rate);


            i++;
        }

    });
    var x = item.length
    switch (x) {
        case 1:
            pdf.fontSize(12)
                .polygon([100, 350], [100, 368 + 22]).stroke()
                .polygon([280, 350], [280, 368 + 22]).stroke()
                .polygon([380, 350], [380, 370 + 22]).stroke()
                .polygon([480, 350], [480, 368 + 44]).stroke()
                //Authorized Signature
                .polygon([380, 508], [580, 508]).stroke()
                .polygon([380, 390], [380, 508]).stroke()
                .text('Authorized Signature', 420, 490)
                //Total amount
                .text('Total In Words', 50, 375 + 22)
                //Thnkyou NOte
                .text('Thanks for Your Business,', 50, 375 + 66)
                .text('Terms & Conditions', 50, 375 + 112)
                .text('Cheque Should be Issued in the Name of Kalyan Kumar D M', 50, 375 + 123)
                .polygon([380, 390 + 22], [580, 390 + 22]).stroke()
                .text(totalAmount + '/-', 501, 375 + 22)
                .text('Total Amount', 400, 375 + 22);

            var y = numberToWords.toWords(totalAmount).toUpperCase();

            pdf.font('./public/fonts/arial.ttf')
                .fontSize(10)
                .text(y + ' Only', 50, 375 + 33);
            break;
        case 2:
            pdf.fontSize(12)
                .polygon([100, 350], [100, 368 + 44]).stroke()
                .polygon([280, 350], [280, 368 + 44]).stroke()
                .polygon([380, 350], [380, 370 + 44]).stroke()
                .polygon([480, 350], [480, 370 + 66]).stroke()
                .polygon([30, 390], [580, 390]).stroke()
                //Authorized Signature
                .polygon([380, 528], [580, 528]).stroke()
                .polygon([380, 390 + 22], [380, 528])
                .text('Authorized Signature', 420, 508)
                //Total amount
                .text('Total In Words', 50, 375 + 44)
                //Thnkyou NOte
                .text('Thanks for Your Business,', 50, 375 + 88)
                .text('Terms & Conditions', 50, 375 + 134)
                .text('Cheque Should be Issued in the Name of Kalyan Kumar D M', 50, 375 + 145)
                .polygon([30, 390 + 22], [580, 390 + 22]).stroke()
                .polygon([380, 390 + 22], [380, 392 + 44]).stroke()
                .polygon([380, 370 + 66], [580, 370 + 66]).stroke()
                .polygon([30, 390], [580, 390]).stroke()
                .text(totalAmount + '/-', 501, 375 + 44)
                .text('Total Amount', 400, 375 + 44);

            var y = numberToWords.toWords(totalAmount).toUpperCase();

            pdf.font('./public/fonts/arial.ttf')
                .fontSize(10)
                .text(y + ' Only', 50, 375 + 55);
            break;
        case 3:
            pdf.fontSize(12)
                .polygon([100, 350], [100, 368 + 66]).stroke()
                .polygon([280, 350], [280, 368 + 66]).stroke()
                .polygon([380, 350], [380, 368 + 88]).stroke()
                .polygon([480, 350], [480, 370 + 88]).stroke()
                //Authorized Signature
                .polygon([380, 550], [580, 550]).stroke()
                .polygon([380, 390 + 44], [380, 550]).stroke()
                .text('Authorized Signature', 420, 530)
                //Total amount
                .text('Total In Words', 50, 375 + 66)
                //Thnkyou NOte
                .text('Thanks for Your Business,', 50, 375 + 112)
                .text('Terms & Conditions', 50, 375 + 156)
                .text('Cheque Should be Issued in the Name of Kalyan Kumar D M', 50, 375 + 167)
                .polygon([30, 390 + 22], [580, 390 + 22]).stroke()
                .polygon([30, 390 + 44], [580, 390 + 44]).stroke()
                .polygon([380, 370 + 88], [580, 370 + 88]).stroke()
                .text(totalAmount + '/-', 501, 375 + 66)
                .text('Total Amount', 400, 375 + 66);

            //Number to words
            var y = numberToWords.toWords(totalAmount).toUpperCase();

            pdf.font('./public/fonts/arial.ttf')
                .fontSize(10)
                .text(y + ' Only', 50, 375 + 77);
            break;
    }


    //Line before Invoice Number
    pdf.polygon([30, 190], [580, 190]).stroke();

    //Line after Invoice Date
    pdf.polygon([30, 260], [580, 260]).stroke();

    //line After bill to Heading
    pdf.polygon([30, 280], [580, 280]).stroke();

    //Line after Bill to address
    pdf.polygon([30, 350], [580, 350]).stroke();

    //line after heading of table
    pdf.polygon([30, 370], [580, 370]).stroke();

    //line between items
    pdf.polygon([30, 390], [580, 390]).stroke();

    // Vertical line next to Invoice detials
    pdf.polygon([305, 190], [305, 260]).stroke();

    //Firt vertical Line of table
    pdf.polygon([100, 350], [100, 370]).stroke();

    //Second Vertical Line of Table
    pdf.polygon([280, 350], [280, 370]).stroke();

    //Third Vertical Line of Table
    pdf.polygon([380, 350], [380, 370]).stroke();

    //Fourth Vertical Line of Table
    pdf.polygon([480, 350], [480, 370]).stroke();

    //Big Container 
    pdf.rect(30, 30, 550, 730).stroke();
    pdf.end();

    var invoice = new Invoice({
        name: req.body.customer,
        item: req.body.item,
        date: new Date(),
        amount: totalAmount
    })



    invoice.save(async function(err, data) {
        if (err) throw err;
    })

}