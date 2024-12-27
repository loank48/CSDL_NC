const express = require('express');
const router = express.Router();
const NhaCungCap = require('./../db/model/nhacungcap');

// Home page: loading all suppliers
router.get('/', async (req, res) => {
    try {
        const suppliers = await NhaCungCap.getAllNhaCungCap({});
        res.render('nhacungcap', { suppliers: suppliers });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Supplier page
router.get('/add-supplier', (req, res) => {
    res.render('add-supplier');
});

// Add new supplier
router.post('/', async (req, res) => {
    try {
        let newSupplier = {
            MaNCC: req.body.MaNCC,
            TenNCC: req.body.TenNCC,
            SDT: req.body.SDT,
            // DiaChi: req.body.DiaChi,
            Email: req.body.Email
        };

        await NhaCungCap.save(newSupplier);
        res.redirect('/nhacungcap');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Supplier page
router.get('/update/:supplierId', async (req, res) => {
    try {
        const supplier = await NhaCungCap.getNhaCungCapByID(req.params.supplierId);
        if (!supplier) {
            return res.status(404).send('Supplier not found');
        }
        res.render('update-supplier', { supplier: supplier });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});


// Update supplier
router.post('/update/:supplierId', async (req, res) => {
    try {
        await NhaCungCap.save(
            {
                    MaNCC: req.body.MaNCC,
                    TenNCC: req.body.TenNCC,
                    SDT: req.body.SDT,
                    // DiaChi: req.body.DiaChi,
                    Email: req.body.Email
            },
            { useFindAndModify: false }
        );
        res.redirect('/nhacungcap');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete supplier
router.post('/:supplierId', async (req, res) => {
    try {
        const supplierId = req.params.supplierId; // Lấy storeId từ URL
        const result = await NhaCungCap.delete(supplierId); // Gọi hàm xóa trong model
        
        if (result.rowsAffected.length > 0) {
            res.redirect('/nhacungcap');
            // res.status(200).send({ success: true, message: `HDB với mã ${salesInvoiceId} đã bị xóa.` });
        } else {
            res.status(404).send({ success: false, message: `Không tìm thấy nhà cung cấp với mã ${supplierId}.` });
        }
        
    } catch (err) {
        res.status(500).send({ success: false, message: 'Đã xảy ra lỗi khi xóa nhà cung cấp.' });
    }
});
module.exports = router;
