const express = require('express');
const router = express.Router();
const KhachHang = require('./../db/model/khachhang');

// Home page: loading all customers
router.get('/', async (req, res) => {
    try {
        const customers = await KhachHang.getAllKhachHang({});
        res.render('khachhang', { customers: customers });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Customer page
router.get('/add-customer', (req, res) => {
    res.render('add-customer');
});

// Add new Customer
router.post('/', async (req, res) => {
    try {
        let newCustomer = {
            MaKH: req.body.MaKH,
            TenKH: req.body.TenKH,
            GioiTinh: req.body.GioiTinh,
            NgaySinh: req.body.NgaySinh,
            DiaChi: req.body.DiaChi,
            Email: req.body.Email,
            SDT: req.body.SDT
        };

        await KhachHang.save(newCustomer);
        res.redirect('/khachhang');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Customer page
router.get('/update/:customerId', async (req, res) => {
    try {
        // console.log("----------->Run here");

        const customer = await KhachHang.getKhachHangByID(req.params.customerId);
        if (!customer) {
            return res.status(404).send('Customer not found');
        }
        res.render('update-customer', { customer: customer });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update customer
router.post('/update/:customerId', async (req, res) => {
    try {
        await KhachHang.save(
            {
                    MaKH: req.body.MaKH,
                    TenKH: req.body.TenKH,
                    GioiTinh: req.body.GioiTinh,
                    NgaySinh: req.body.NgaySinh,
                    DiaChi: req.body.DiaChi,
                    Email: req.body.Email,
                    SDT: req.body.SDT
            },
            { useFindAndModify: false }
        );
        res.redirect('/khachhang');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete customer
router.post('/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId; // Lấy customerId từ URL
        const result = await KhachHang.delete(customerId); // Gọi hàm xóa trong model
        
        if (result.rowsAffected.length > 0) {
            res.redirect('/khachhang');
            // res.status(200).send({ success: true, message: `KH với mã ${customerId} đã bị xóa.` });
        } else {
            res.status(404).send({ success: false, message: `Không tìm thấy khách hàng với mã ${customerId}.` });
        }
        
    } catch (err) {
        res.status(500).send({ success: false, message: 'Đã xảy ra lỗi khi xóa khách hàng.' });
    }
});

module.exports = router;
