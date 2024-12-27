const express = require('express');
const router = express.Router();
const DonHang = require('./../db/model/donhang');

// Home page: loading all orders
router.get('/', async (req, res) => {
    try {
        const orders = await DonHang.getDonHang({});
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
        let newOrder = {
            // MaDonHang: req.body.MaDonHang,
            MaKH: req.body.MaKH,
            MaSP: req.body.MaSP,
            NgayLap: req.body.NgayLap,
            ThanhTien: req.body.ThanhTien
            // TrangThai: req.body.TrangThai
        };

        await DonHang.save(newOrder);
        res.redirect('/donhang');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Order page
router.get('/update/:orderId', async (req, res) => {
    try {
        const order = await DonHang.getDonHangByID(req.params.orderId);
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.render('update-order', { order: order });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update order
router.post('/update/:orderId', async (req, res) => {
    try {
        await DonHang.save(
        {
                    MaKH: req.body.MaKH,
                    MaSP: req.body.MaSP,
                    NgayLap: req.body.NgayLap,
                    ThanhTien: req.body.ThanhTien
                },
            { useFindAndModify: false }
        );
        res.redirect('/donhang');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});


// Delete order
router.post('/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId; // Lấy orderId từ URL
        const result = await DonHang.delete(orderId); // Gọi hàm xóa trong model
        
        if (result.rowsAffected.length > 0) {
            res.redirect('/donhang');
            // res.status(200).send({ success: true, message: `Cửa hàng với mã ${orderID} đã bị xóa.` });
        } else {
            res.status(404).send({ success: false, message: `Không tìm thấy đơn hàng với mã ${orderID}.` });
        }
        
    } catch (err) {
        res.status(500).send({ success: false, message: 'Đã xảy ra lỗi khi xóa đơn hàng.' });
    }
});

module.exports = router;
