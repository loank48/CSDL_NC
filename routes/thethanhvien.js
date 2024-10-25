const express = require('express');
const router = express.Router();
const TheThanhVien = require('./../db/model/thethanhvien');

// Home page: loading all membership cards
router.get('/', async (req, res) => {
    try {
        const membershipCards = await TheThanhVien.find({});
        res.render('thethanhvien', { membershipCards: membershipCards });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Membership Cards page
router.get('/add-membership-card', (req, res) => {
    res.render('add-membership-card');
});

// Add new membership card
router.post('/', async (req, res) => {
    try {
        let newMembershipCard = new TheThanhVien({
            MaSoThe: req.body.MaSoThe,
            DiemTichLuy: req.body.DiemTichLuy,
            NgayCap: req.body.NgayCap,
            NgayHetHan: req.body.NgayHetHan,
            MaKH: req.body.MaKH,
            MaLoaithe: req.body.MaLoaithe
        });

        await newMembershipCard.save();
        res.redirect('/thethanhvien');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Membership Card page
router.get('/update-membership-card/:membershipCardId', async (req, res) => {
    try {
        const membershipCard = await TheThanhVien.findById(req.params.membershipCardId);
        if (!membershipCard) {
            return res.status(404).send('Membership card not found');
        }
        res.render('update-membership-card', { membershipCard: membershipCard });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete membership card
router.delete('/:membershipCardId', async (req, res) => {
    try {
        const doc = await TheThanhVien.findByIdAndDelete(req.params.membershipCardId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update membership card
router.post('/:membershipCardId', async (req, res) => {
    try {
        await TheThanhVien.findByIdAndUpdate(
            req.params.membershipCardId,
            {
                $set: {
                    MaSoThe: req.body.MaSoThe,
                    DiemTichLuy: req.body.DiemTichLuy,
                    NgayCap: req.body.NgayCap,
                    NgayHetHan: req.body.NgayHetHan,
                    MaKH: req.body.MaKH,
                    MaLoaithe: req.body.MaLoaithe
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/thethanhvien');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
