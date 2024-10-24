const express = require('express');
const router = express.Router();
const Size = require('./../db/model/size');

// Home page: loading all sizes
router.get('/', async (req, res) => {
    try {
        const sizes = await Size.find({});
        res.render('size', { sizes : sizes });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Size page
router.get('/add-size', (req, res) => {
    res.render('add-size');
});

// Add new size
router.post('/', async (req, res) => {
    try {
        let newSize = new Size({
            MaSize: req.body.MaSize,
            TenSize: req.body.TenSize
        });

        await newSize.save();
        res.redirect('/size');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Size page
router.get('/update-size/:sizeId', async (req, res) => {
    try {
        const size = await Size.findById(req.params.sizeId);
        if (!size) {
            return res.status(404).send('Size not found');
        }
        res.render('update-size', { size: size });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete size
router.delete('/:sizeId', async (req, res) => {
    try {
        const doc = await Size.findByIdAndDelete(req.params.sizeId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update size
router.post('/:sizeId', async (req, res) => {
    try {
        await Size.findByIdAndUpdate(
            req.params.sizeId,
            {
                $set: {
                    MaSize: req.body.MaSize,
                    TenSize: req.body.TenSize
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/size');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;