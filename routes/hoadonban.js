const express = require('express');
const router = express.Router();
const HoaDonBan = require('./../db/model/hoadonban');

// Home page: loading all sales invoices
router.get('/', async (req, res) => {
    try {
        const salesInvoices = await HoaDonBan.find({});
        res.render('hoadonban', { salesInvoices: salesInvoices });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Sales Invoice page
router.get('/add-sales-invoice', (req, res) => {
    res.render('add-sales-invoice');
});

// Add new Sales Invoice
router.post('/', async (req, res) => {
    try {
        let newSalesInvoice = new HoaDonBan({
            MaHDB: req.body.MaHDB,
            SoLuongBan: req.body.SoLuongBan,
            NgayBan: req.body.NgayBan,
            TongTienThu: req.body.TongTienThu,
            MaKH: req.body.MaKH,
            MaCH: req.body.MaCH
        });

        await newSalesInvoice.save();
        res.redirect('/hoadonban');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Sales Invoice page
router.get('/update-sales-invoice/:salesInvoiceId', async (req, res) => {
    try {
        const salesInvoice = await HoaDonBan.findById(req.params.salesInvoiceId);
        if (!salesInvoice) {
            return res.status(404).send('Sales Invoice not found');
        }
        res.render('update-sales-invoice', { salesInvoice: salesInvoice });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete Sales Invoice
router.delete('/:salesInvoiceId', async (req, res) => {
    try {
        const doc = await HoaDonBan.findByIdAndDelete(req.params.salesInvoiceId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update Sales Invoice
router.post('/:salesInvoiceId', async (req, res) => {
    try {
        await HoaDonBan.findByIdAndUpdate(
            req.params.salesInvoiceId,
            {
                $set: {
                    MaHDB: req.body.MaHDB,
                    SoLuongBan: req.body.SoLuongBan,
                    NgayBan: req.body.NgayBan,
                    TongTienThu: req.body.TongTienThu,
                    MaKH: req.body.MaKH,
                    MaCH: req.body.MaCH
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/hoadonban');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;