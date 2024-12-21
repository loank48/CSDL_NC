const express = require('express');
const router = express.Router();
const CuaHang = require('./../db/model/cuahang');

// Home page: loading all stores
router.get('/', async (req, res) => {
    try {
        const stores = await CuaHang.find({});
        res.render('cuahang', { stores: stores });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Store page
router.get('/add-store', (req, res) => {
    res.render('add-store');
});

// Add new Store
router.post('/', async (req, res) => {
    try {
        let newStore = new CuaHang({
            // MaCH: req.body.MaCH,
            // TenCH: req.body.TenCH,
            // TongNV: req.body.TongNV,
            // DiaChi: req.body.DiaChi

            MaCH: req.body.MaCH,
            TenCH: req.body.TenCH,
            TongNV: req.body.TongNV,
            DiaChi: {
                SoNha: req.body.SoNha,
                Duong: req.body.Duong,
                Quan: req.body.Quan,
                ThanhPho: req.body.ThanhPho
                } 
        });

        await newStore.save();
        res.redirect('/cuahang');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Store page
router.get('/update-store/:storeId', async (req, res) => {
    try {
        const store = await CuaHang.findById(req.params.storeId);
        if (!store) {
            return res.status(404).send('Store not found');
        }
        res.render('update-store', { store: store });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete store
router.delete('/:storeId', async (req, res) => {
    try {
        const doc = await CuaHang.findByIdAndDelete(req.params.storeId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update store
router.post('/:storeId', async (req, res) => {
    try {
        await CuaHang.findByIdAndUpdate(
            req.params.storeId,
            {
                $set: {
                    MaCH: req.body.MaCH,
                    TenCH: req.body.TenCH,
                    TongNV: req.body.TongNV,
                    DiaChi: {
                        SoNha: req.body.SoNha,
                        Duong: req.body.Duong,
                        Quan: req.body.Quan,
                        ThanhPho: req.body.ThanhPho
                    } 
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/cuahang');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
