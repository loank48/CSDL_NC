const express = require('express');
const router = express.Router();
const ThamGiaKM = require('./../db/model/thamgiakm');

// Home page: loading all participations 
router.get('/', async (req, res) => {
    try {
        const participations = await ThamGiaKM.find({});
        res.render('thamgiakm', { participations : participations });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Participation page
router.get('/add-participation', (req, res) => {
    res.render('add-participation');
});

// Add new participation
router.post('/', async (req, res) => {
    try {
        let newParticipation = new ThamGiaKM({
            MaKH: req.body.MaKH,
            NgayTG: req.body.NgayTG
        });

        await newParticipation.save();
        res.redirect('/thamgiakm');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Participation page
router.get('/update-participation/:participationId', async (req, res) => {
    try {
        const participation = await ThamGiaKM.findById(req.params.participationId);
        if (!participation) {
            return res.status(404).send('Participation not found');
        }
        res.render('update-participation', { participation: participation });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete participation
router.delete('/:participationId', async (req, res) => {
    try {
        const doc = await ThamGiaKM.findByIdAndDelete(req.params.participationId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update participation
router.post('/:participationId', async (req, res) => {
    try {
        await ThamGiaKM.findByIdAndUpdate(
            req.params.participationId,
            {
                $set: {
                    MaKH: req.body.MaKH,
                    NgayTG: req.body.NgayTG
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/thamgiakm');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
