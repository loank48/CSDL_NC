const express = require('express');
const router = express.Router();
const MauSac = require('./../db/model/mausac');

// Home page: loading all colors
router.get('/', async (req, res) => {
    try {
        const colors = await MauSac.find({});
        res.render('mausac', { colors : colors });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Color page
router.get('/add-color', (req, res) => {
    res.render('add-color');
});

// Add new color
router.post('/', async (req, res) => {
    try {
        let newColor = new MauSac({
            MaMau: req.body.MaMau,
            TenMau: req.body.TenMau
        });

        await newColor.save();
        res.redirect('/mausac');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Color page
router.get('/update-color/:colorId', async (req, res) => {
    try {
        const color = await MauSac.findById(req.params.colorId);
        if (!color) {
            return res.status(404).send('Color not found');
        }
        res.render('update-color', { color: color });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete color
router.delete('/:colorId', async (req, res) => {
    try {
        const doc = await MauSac.findByIdAndDelete(req.params.colorId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update color
router.post('/:colorId', async (req, res) => {
    try {
        await MauSac.findByIdAndUpdate(
            req.params.colorId,
            {
                $set: {
                    MaMau: req.body.MaMau,
                    TenMau: req.body.TenMau
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/mausac');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
