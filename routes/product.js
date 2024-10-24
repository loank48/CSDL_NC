const express = require('express');
const router = express.Router();
const Product = require('./../db/model/product');

/**
 * Home page: loading all products
 */
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('product', { products: products });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * Go to Add Product page
 */
router.get('/add-product', (req, res) => {
    res.render('add-product');
});

/**
 * Add new Product
 */
router.post('/', async (req, res) => {
    try {
        let newProduct = new Product({
            MASP: req.body.MASP,
            TenSP: req.body.TenSP,
            MoTaSP: req.body.MoTaSP,
            GiaBan: req.body.GiaBan,
            GiaGoc: req.body.GiaGoc,
            TonKho: req.body.TonKho,
            MaLoai: req.body.MaLoai,
            MaChatLieu: req.body.MaChatLieu,
            MaMau: req.body.MaMau,
            MaSize: req.body.MaSize
        });

        await newProduct.save();
        res.redirect('/product');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * Go to Update Product page
 */
router.get('/update-product/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('update-product', { product: product });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * Delete product
 */
router.delete('/:productId', async (req, res) => {
    try {
        const doc = await Product.findByIdAndDelete(req.params.productId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * Update product
 */
router.post('/:productId', async (req, res) => {
    try {
        await Product.findByIdAndUpdate(
            req.params.productId,
            {
                $set: {
                    MASP: req.body.MASP,
                    TenSP: req.body.TenSP,
                    MoTaSP: req.body.MoTaSP,
                    GiaBan: req.body.GiaBan,
                    GiaGoc: req.body.GiaGoc,
                    TonKho: req.body.TonKho,
                    MaLoai: req.body.MaLoai,
                    MaChatLieu: req.body.MaChatLieu,
                    MaMau: req.body.MaMau,
                    MaSize: req.body.MaSize
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/product');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
