const express = require('express');
const router = express.Router();
const NhaCungCap = require('./../db/model/nhacungcap');

// Home page: loading all suppliers
router.get('/', async (req, res) => {
    try {
        const suppliers = await NhaCungCap.find({});
        res.render('nhacungcap', { suppliers: suppliers });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Supplier page
router.get('/add-supplier', (req, res) => {
    res.render('add-supplier');
});

// Add new supplier
router.post('/', async (req, res) => {
    try {
        let newSupplier = new NhaCungCap({
            MaNCC: req.body.MaNCC,
            TenNCC: req.body.TenNCC,
            SDT: req.body.SDT,
            DiaChi: req.body.DiaChi,
            Email: req.body.Email
        });

        await newSupplier.save();
        res.redirect('/nhacungcap');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Supplier page
router.get('/update-supplier/:supplierId', async (req, res) => {
    try {
        const supplier = await NhaCungCap.findById(req.params.supplierId);
        if (!supplier) {
            return res.status(404).send('Supplier not found');
        }
        res.render('update-supplier', { supplier: supplier });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete supplier
router.delete('/:supplierId', async (req, res) => {
    try {
        const doc = await NhaCungCap.findByIdAndDelete(req.params.supplierId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update supplier
router.post('/:supplierId', async (req, res) => {
    try {
        await NhaCungCap.findByIdAndUpdate(
            req.params.supplierId,
            {
                $set: {
                    MaNCC: req.body.MaNCC,
                    TenNCC: req.body.TenNCC,
                    SDT: req.body.SDT,
                    DiaChi: req.body.DiaChi,
                    Email: req.body.Email
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/nhacungcap');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
