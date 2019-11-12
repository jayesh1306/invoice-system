const pdfkit = require('pdfkit');
var pdf = new pdfkit();
const fs = require('fs');
pdf.pipe(fs.createWriteStream('INVOICE.pdf'));

pdf.image('./public/images/main.png', 50, 50, { width: 100 })

pdf.font('./public/fonts/arial.ttf')
    .fontSize(10)
    .text('Sangam Educational Services', 160, 80)
    .text(': INV-000017', 160, 195)
    .text(': 22/11/2018', 160, 208)
    .text(': Due on Receipt', 160, 223)
    .text(': 22/11/2018', 160, 238)
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
    .text('Kirloskar Layout, Hesaraghatta Main Road', 40, 290)
    .text('Near Sapthagiri College', 40, 305)
    .text('Bangalore Karnataka 560073', 40, 320)
    .text('India', 40, 335)
    .text(req.body.item, 140, 353)
    .text(req.body.quantity, 320, 353)
    .text(req.body.rate, 420, 353)
    .text(req.body.quantity * req.body.rate, 501, 353);


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