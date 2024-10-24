const express = require('express');
const router = express.Router();
const BinhLuan = require('./../db/model/binhluan');

// Home page: loading all comments
router.get('/', async (req, res) => {
    try {
        const comments = await BinhLuan.find({});
        res.render('binhluan', { comments: comments });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Comment page
router.get('/add-comment', (req, res) => {
    res.render('add-comment');
});

// Add new Comment
router.post('/', async (req, res) => {
    try {
        let newComment = new BinhLuan({
            MaBL: req.body.MaBL,
            NoiDung: req.body.NoiDung,
            NgayDang: req.body.NgayDang,
            MaSP: req.body.MaSP,
            MaKH: req.body.MaKH
        });

        await newComment.save();
        res.redirect('/binhluan');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Comment page
router.get('/update-comment/:commentId', async (req, res) => {
    try {
        const comment = await BinhLuan.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.render('update-comment', { comment: comment });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete comment
router.delete('/:commentId', async (req, res) => {
    try {
        const doc = await BinhLuan.findByIdAndDelete(req.params.commentId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update comment
router.post('/:commentId', async (req, res) => {
    try {
        await BinhLuan.findByIdAndUpdate(
            req.params.commentId,
            {
                $set: {
                    MaBL: req.body.MaBL,
                    NoiDung: req.body.NoiDung,
                    NgayDang: req.body.NgayDang,
                    MaSP: req.body.MaSP,
                    MaKH: req.body.MaKH
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/binhluan');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
