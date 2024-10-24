const express = require('express');
const router = express.Router();
const LoaiTheThanhVien = require('./../db/model/loaithethanhvien');

// Home page: loading all membership tiers
router.get('/', async (req, res) => {
    try {
        const membershipTiers = await LoaiTheThanhVien.find({});
        res.render('loaithethanhvien', { membershipTiers: membershipTiers });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Membership Tier page
router.get('/add-membership-tier', (req, res) => {
    res.render('add-membership-tier');
});

// Add new membership tier
router.post('/', async (req, res) => {
    try {
        let newMembershipTier = new LoaiTheThanhVien({
            MaLoaiThe: req.body.MaLoaiThe,
            TenLoaiThe: req.body.TenLoaiThe,
            UuDai: req.body.UuDai
        });

        await newMembershipTier.save();
        res.redirect('/loaithethanhvien');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Membership Tier page
router.get('/update-membership-tier/:membershipTierId', async (req, res) => {
    try {
        const membershipTier = await LoaiTheThanhVien.findById(req.params.membershipTierId);
        if (!membershipTier) {
            return res.status(404).send('Membership tier not found');
        }
        res.render('update-membership-tier', { membershipTier: membershipTier });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete membership tier
router.delete('/:membershipTierId', async (req, res) => {
    try {
        const doc = await LoaiTheThanhVien.findByIdAndDelete(req.params.membershipTierId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update membership tier
router.post('/:membershipTierId', async (req, res) => {
    try {
        await LoaiTheThanhVien.findByIdAndUpdate(
            req.params.membershipTierId,
            {
                $set: {
                    MaLoaiThe: req.body.MaLoaiThe,
                    TenLoaiThe: req.body.TenLoaiThe,
                    UuDai: req.body.UuDai
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/loaithethanhvien');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;