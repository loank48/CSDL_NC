const express = require('express');
const router = express.Router();
const KhachHang = require('./../db/model/khachhang');

// Home page: loading all customers
router.get('/', async (req, res) => {
    try {
        const customers = await KhachHang.find({});
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
        let newCustomer = new KhachHang({
            MaKH: req.body.MaKH,
            TenKH: req.body.TenKH,
            GioiTinh: req.body.GioiTinh,
            NgaySinh: req.body.NgaySinh,
            DiaChi: req.body.DiaChi,
            Email: req.body.Email,
            SDT: req.body.SDT
        });

        await newCustomer.save();
        res.redirect('/khachhang');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Customer page
router.get('/update-customer/:customerId', async (req, res) => {
    try {
        const customer = await KhachHang.findById(req.params.customerId);
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
router.post('/:customerId', async (req, res) => {
    try {
        await KhachHang.findByIdAndUpdate(
            req.params.customerId,
            {
                $set: {
                    MaKH: req.body.MaKH,
                    TenKH: req.body.TenKH,
                    GioiTinh: req.body.GioiTinh,
                    NgaySinh: req.body.NgaySinh,
                    DiaChi: req.body.DiaChi,
                    Email: req.body.Email,
                    SDT: req.body.SDT
                }
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
