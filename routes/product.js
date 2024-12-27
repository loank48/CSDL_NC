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
        const data = req.body;
        const result = await Product.saveProduct(data);
        res.redirect('/product');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * Go to Update Product page
 */
router.get('/update/:productID', async (req, res) => {
    try {
        const product = await Product.getSanPhamByMaSP(req.params.productID);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('update-product', { product: product });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});
//Update product
router.post('/update/:productID', async (req, res) => {
    try {
        let newProduct = {
                MaSP: req.body.MaSP,
                TenSP: req.body.TenSP,
                MoTaSP: req.body.MoTaSP,
                GiaBan: req.body.GiaBan,
                TonKho: req.body.TonKho,
                MaLoai: req.body.MaLoai,
                ChatLieu: req.body.ChatLieu,
                Mau: req.body.Mau,
                Size: req.body.Size,
                UrlImage: req.body.UrlImage
        }; 
        await Product.saveProduct(newProduct);
        res.redirect('/product');
    } catch (err) {
        console.log('Error: ', err);
            res.status(500).send('Internal Server Error');
                        }
                    });
                
router.delete('/:MaSP', async (req, res) => {
    try {
        const { MaSP } = req.params; // Lấy mã sản phẩm từ URL
        const result = await Product.deleteProduct(MaSP); // Gọi hàm deleteProduct
        res.status(200).json({ success: true, message: 'Product deleted successfully' }); // Trả về phản hồi JSON

    } catch (err) {
        res.status(500).json({ success: false, message: err.message }); // Trả về lỗi nếu xảy ra
    }
});

 
module.exports = router;
