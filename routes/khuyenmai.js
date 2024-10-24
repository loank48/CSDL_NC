const express = require('express');
const router = express.Router();
const KhuyenMai = require('./../db/model/khuyenmai');

// Home page: loading all discounts
router.get('/', async (req, res) => {
    try {
        const discounts = await KhuyenMai.find({});
        res.render('khuyenmai', { discounts: discounts });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Discount page
router.get('/add-discount', (req, res) => {
    res.render('add-discount');
});

// Add new discount
router.post('/', async (req, res) => {
    try {
        let newDiscount = new KhuyenMai({
            MaKM: req.body.MaKM,
            TGBatDau: req.body.TGBatDau,
            TGKetThuc: req.body.TGKetThuc,
            NoiDung: req.body.NoiDung,
            MaSP: req.body.MaSP
        });

        await newDiscount.save();
        res.redirect('/khuyenmai');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Discount page
router.get('/update-discount/:discountId', async (req, res) => {
    try {
        const discount = await KhuyenMai.findById(req.params.discountId);
        if (!discount) {
            return res.status(404).send('Discount not found');
        }
        res.render('update-discount', { discount: discount });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete discount
router.delete('/:discountId', async (req, res) => {
    try {
        const doc = await KhuyenMai.findByIdAndDelete(req.params.discountId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update discount
router.post('/:discountId', async (req, res) => {
    try {
        await KhuyenMai.findByIdAndUpdate(
            req.params.discountId,
            {
                $set: {
                    MaKM: req.body.MaKM,
                    TGBatDau: req.body.TGBatDau,
                    TGKetThuc: req.body.TGKetThuc,
                    NoiDung: req.body.NoiDung,
                    MaSP: req.body.MaSP
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/khuyenmai');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;