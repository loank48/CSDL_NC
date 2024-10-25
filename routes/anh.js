const express = require('express');
const router = express.Router();
const Anh = require('./../db/model/anh');

// Home page: loading all images
router.get('/', async (req, res) => {
    try {
        const images = await Anh.find({});
        res.render('anh', { images: images });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Image page
router.get('/add-image', (req, res) => {
    res.render('add-image');
});

// Add new Image
router.post('/', async (req, res) => {
    try {
        let newImage = new Anh({
            Url: req.body.Url,
            MoTa: req.body.MoTa
        });

        await newImage.save();
        res.redirect('/anh');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Image page
router.get('/update-image/:imageId', async (req, res) => {
    try {
        const image = await Anh.findById(req.params.imageId);
        if (!image) {
            return res.status(404).send('Image not found');
        }
        res.render('update-image', { image: image });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete image
router.delete('/:imageId', async (req, res) => {
    try {
        const doc = await Anh.findByIdAndDelete(req.params.imageId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update image
router.post('/:imageId', async (req, res) => {
    try {
        await Anh.findByIdAndUpdate(
            req.params.imageId,
            {
                $set: {
                    Url: req.body.Url,
                    MoTa: req.body.MoTa
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/anh');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
