const express = require('express');
const router = express.Router();
const HoaDonNhap = require('./../db/model/hoadonnhap');

// Home page: loading all purchase invoices
router.get('/', async (req, res) => {
    try {
        const purchaseInvoices = await HoaDonNhap.find({});
        res.render('hoadonnhap', { purchaseInvoices: purchaseInvoices });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Purchase Invoice page
router.get('/add-purchase-invoice', (req, res) => {
    res.render('add-purchase-invoice');
});

// Add new Purchase Invoice
router.post('/', async (req, res) => {
    try {
        let newPurchaseInvoice = new HoaDonNhap({
            MaHDN: req.body.MaHDN,
            SoLuongNhap: req.body.SoLuongNhap,
            NgayNhap: req.body.NgayNhap,
            TongTienTra: req.body.TongTienTra,
            // MaNV: req.body.MaNV,
            MaCH: req.body.MaCH
        });

        await newPurchaseInvoice.save();
        res.redirect('/hoadonnhap');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Purchase Invoice page
router.get('/update-purchase-invoice/:purchaseInvoiceId', async (req, res) => {
    try {
        const purchaseInvoice = await HoaDonNhap.findById(req.params.purchaseInvoiceId);
        if (!purchaseInvoice) {
            return res.status(404).send('Purchase Invoice not found');
        }
        res.render('update-purchase-invoice', { purchaseInvoice: purchaseInvoice });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete Purchase Invoice
router.delete('/:purchaseInvoiceId', async (req, res) => {
    try {
        const doc = await HoaDonNhap.findByIdAndDelete(req.params.purchaseInvoiceId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update Purchase Invoice
router.post('/:purchaseInvoiceId', async (req, res) => {
    try {
        await HoaDonNhap.findByIdAndUpdate(
            req.params.purchaseInvoiceId,
            {
                $set: {
                    MaHDN: req.body.MaHDN,
                    SoLuongNhap: req.body.SoLuongNhap,
                    NgayNhap: req.body.NgayNhap,
                    TongTienTra: req.body.TongTienTra,
                    // MaNV: req.body.MaNV,
                    MaCH: req.body.MaCH
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/hoadonnhap');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
