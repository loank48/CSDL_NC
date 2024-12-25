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
        console.log("----------->Run here");

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

// Delete customer
router.delete('/:customerId', async (req, res) => {
    try {
        const doc = await KhachHang.findByIdAndDelete(req.params.customerId);
        res.send(doc);
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

module.exports = router;
