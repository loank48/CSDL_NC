const express = require('express');
const router = express.Router();
const DonHang = require('./../db/model/donhang');

// Home page: loading all orders
router.get('/', async (req, res) => {
    try {
        const orders = await DonHang.find({});
        res.render('donhang', { orders: orders });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Order page
router.get('/add-order', (req, res) => {
    res.render('add-order');
});

// Add new Order
router.post('/', async (req, res) => {
    try {
        let newOrder = new DonHang({
            // MaDonHang: req.body.MaDonHang,
            MaKH: req.body.MaKH,
            MaSP: req.body.MaSP,
            NgayLap: req.body.NgayLap,
            ThanhTien: req.body.ThanhTien
            // TrangThai: req.body.TrangThai
        });

        await newOrder.save();
        res.redirect('/donhang');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Order page
router.get('/update-order/:orderId', async (req, res) => {
    try {
        const order = await DonHang.findById(req.params.orderId);
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.render('update-order', { order: order });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete order
router.delete('/:orderId', async (req, res) => {
    try {
        const doc = await DonHang.findByIdAndDelete(req.params.orderId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update order
router.post('/:orderId', async (req, res) => {
    try {
        await DonHang.findByIdAndUpdate(
            req.params.orderId,
            {
                $set: {
                    // MaDonHang: req.body.MaDonHang,
                    // MaKH: req.body.MaKH,
                    // NgayLap: req.body.NgayLap,
                    // TongTien: req.body.TongTien,
                    // TrangThai: req.body.TrangThai

                    MaKH: req.body.MaKH,
                    MaSP: req.body.MaSP,
                    NgayLap: req.body.NgayLap,
                    ThanhTien: req.body.ThanhTien
                }
            },
            { useFindAndModify: false }
        );
        res.redirect('/donhang');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
