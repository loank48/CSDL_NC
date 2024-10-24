const express = require('express');
const router = express.Router();
const ChatLieu = require('./../db/model/chatlieu');

// Home page: loading all materials
router.get('/', async (req, res) => {
    try {
        const materials = await ChatLieu.find({});
        res.render('chatlieu', { materials: materials });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Material page
router.get('/add-material', (req, res) => {
    res.render('add-material');
});

// Add new Material
router.post('/', async (req, res) => {
    try {
        let newMaterial = new ChatLieu({
            MaChatLieu: req.body.MaChatLieu,
            TenChatLieu: req.body.TenChatLieu,
            MoTa: req.body.MoTa
        });

        await newMaterial.save();
        res.redirect('/chatlieu');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Material page
router.get('/update-material/:materialId', async (req, res) => {
    try {
        const material = await ChatLieu.findById(req.params.materialId);
        if (!material) {
            return res.status(404).send('Material not found');
        }
        res.render('update-material', { material: material });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete material
router.delete('/:materialId', async (req, res) => {
    try {
        const doc = await ChatLieu.findByIdAndDelete(req.params.materialId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update material
router.post('/:materialId', async (req, res) => {
    try {
        await ChatLieu.findByIdAndUpdate(
            req.params.materialId,
            {
                $set: {
                    MaChatLieu: req.body.MaChatLieu,
                    TenChatLieu: req.body.TenChatLieu,
                    MoTa: req.body.MoTa
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/chatlieu');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
