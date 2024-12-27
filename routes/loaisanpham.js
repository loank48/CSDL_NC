const express = require('express');
const router = express.Router();
const LoaiSanPham = require('./../db/model/loaisanpham');

// Home page: loading all categories
router.get('/', async (req, res) => {
    try {
        const categories = await LoaiSanPham.getAllLoaiSanPham({});
        res.render('loaisanpham', { categories: categories });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Categories page
router.get('/add-category', (req, res) => {
    res.render('add-category');
});

// Add new category
router.post('/', async (req, res) => {
    try {
        let newCategory = {
            MaLoai: req.body.MaLoai,
            TenLoai: req.body.TenLoai,
        };

        await LoaiSanPham.save(newCategory);
        res.redirect('/loaisanpham');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});


// Go to Update Category page
router.get('/update/:categoryId', async (req, res) => {
    try {
        // console.log("----------->Run here");
        
        const category = await LoaiSanPham.getLoaiSanPhamByID(req.params.categoryId);
        if (!category) {
            return res.status(404).send('Category not found');
        }
        res.render('update-category', { category: category });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete category
router.delete('/:categoryId', async (req, res) => {
    try {
        const doc = await LoaiSanPham.findByIdAndDelete(req.params.categoryId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update category
router.post('/update/:categoryId', async (req, res) => {
    try {
        await LoaiSanPham.save(
            {
                    MaLoai: req.body.MaLoai,
                    TenLoai: req.body.TenLoai,
                    // MoTaLSP: req.body.MoTaLSP
                },
            { useFindAndModify: false }
        );
        res.redirect('/loaisanpham');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
