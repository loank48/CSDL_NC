const express = require('express');
const router = express.Router();
const HoaDonBan = require('./../db/model/hoadonban');

// Home page: loading all sales invoices
router.get('/', async (req, res) => {
    try {
        const salesInvoices = await HoaDonBan.getAllHoaDonBan({});
        res.render('hoadonban', { salesInvoices: salesInvoices });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Sales Invoice page
router.get('/add-sales-invoice', (req, res) => {
    res.render('add-sales-invoice');
});

// Add new Sales Invoice
router.post('/', async (req, res) => {
    try {
        let newSalesInvoice = {
            MaHDB: req.body.MaHDB,
            SoLuongBan: req.body.SoLuongBan,
            NgayBan: req.body.NgayBan,
            TongTienThu: req.body.TongTienThu,
            // MaKH: req.body.MaKH,
            MaCH: req.body.MaCH

        };

        await HoaDonBan.save(newSalesInvoice);
        res.redirect('/hoadonban');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Sales Invoice page
router.get('/update/:salesInvoiceId', async (req, res) => {
    try {
        // console.log("----------->Run here");
        
        const salesInvoice = await HoaDonBan.getHoaDonBanByID(req.params.salesInvoiceId);
        if (!salesInvoice) {
            return res.status(404).send('Sales Invoice not found');
        }
        res.render('update-sales-invoice', { salesInvoice: salesInvoice });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update Sales Invoice
router.post('/update/:salesInvoiceId', async (req, res) => {
    try {
        await HoaDonBan.save(
            {
                    MaHDB: req.body.MaHDB,
                    SoLuongBan: req.body.SoLuongBan,
                    NgayBan: req.body.NgayBan,
                    TongTienThu: req.body.TongTienThu,
                    // MaKH: req.body.MaKH,
                    MaCH: req.body.MaCH
            },
            { useFindAndModify: false }
        );
        res.redirect('/hoadonban');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete HDB
router.post('/:salesInvoiceId', async (req, res) => {
    try {
        const salesInvoiceId = req.params.salesInvoiceId; // Lấy storeId từ URL
        const result = await HoaDonBan.delete(salesInvoiceId); // Gọi hàm xóa trong model
        
        if (result.rowsAffected.length > 0) {
            res.redirect('/hoadonban');
            // res.status(200).send({ success: true, message: `HDB với mã ${salesInvoiceId} đã bị xóa.` });
        } else {
            res.status(404).send({ success: false, message: `Không tìm thấy HDB với mã ${salesInvoiceId}.` });
        }
        
    } catch (err) {
        res.status(500).send({ success: false, message: 'Đã xảy ra lỗi khi xóa HDB.' });
    }
});


module.exports = router;