const express = require('express');
const router = express.Router();
const Product = require('./../db/model/sanpham');

/**
 * Home page: loading all products
 */
router.get('/', async (req, res) => {
    try {
        const products = await Product.getAllSanPham({});
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
            MaSP: req.body.MaSP,
            TenSP: req.body.TenSP,
            Mau: req.body.Mau,
            Size: req.body.Size,
            ChatLieu: req.body.ChatLieu,
            MoTaSP: req.body.MoTaSP,
            GiaBan: req.body.GiaBan,
            TonKho: req.body.TonKho,
            MaLoai: req.body.MaLoai,
            MaCH: req.body.MaCH,
            // GiaGoc: req.body.GiaGoc,
            UrlImage: req.body.UrlImage
        });

        await newProduct.save();
        res.redirect('/getdb');
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
                    MaSize: req.body.MaSize,
                    UrlImage: req.body.UrlImage
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
