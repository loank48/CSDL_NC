const express = require('express');
const router = express.Router();
const CuaHang = require('./../db/model/cuahang');

// Home page: loading all stores
router.get('/', async (req, res) => {
    try {
        const stores = await CuaHang.getAllCuaHang({});
        res.render('cuahang', { stores: stores });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Store page
router.get('/add-store', (req, res) => {
    res.render('add-store');
});

// Add new Store
router.post('/', async (req, res) => {
    try {
        let newStore = {
            MaCH: req.body.MaCH,
            TenCH: req.body.TenCH,
            TongNV: req.body.TongNV,
            // DiaChi: {
                SoNha: req.body.SoNha,
                Duong: req.body.Duong,
                Quan: req.body.Quan,
                ThanhPho: req.body.ThanhPho,
            // },
            MaNCC: req.body.MaNCC
        };

        await CuaHang.save(newStore);
        res.redirect('/cuahang');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Store page
router.get('/update/:storeId', async (req, res) => {
    try {
        // console.log("----------->Run here");

        const store = await CuaHang.getCuaHangByMaCH(req.params.storeId);
        if (!store) {
            return res.status(404).send('Store not found');
        }
        res.render('update-store', { store: store });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});


// Update store
router.post('/update/:storeId', async (req, res) => {
    try {
        await CuaHang.save(
            {
                MaCH: req.body.MaCH,
                TenCH: req.body.TenCH,
                TongNV: req.body.TongNV,
                MaNCC: req.body.MaNCC,
                // DiaChi: {
                    SoNha: req.body.SoNha,
                    Duong: req.body.Duong,
                    Quan: req.body.Quan,
                    ThanhPho: req.body.ThanhPho
                    // }
                },
                { useFindAndModify: false }
            );
            res.redirect('/cuahang');
        } catch (err) {
            console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});


// Delete store
router.post('/:storeId', async (req, res) => {
    try {
        const storeId = req.params.storeId; // Lấy storeId từ URL
        const result = await CuaHang.delete(storeId); // Gọi hàm xóa trong model
        
        if (result.rowsAffected.length > 0) {
            res.redirect('/cuahang');
            // res.status(200).send({ success: true, message: `Cửa hàng với mã ${storeId} đã bị xóa.` });
        } else {
            res.status(404).send({ success: false, message: `Không tìm thấy cửa hàng với mã ${storeId}.` });
        }
        
    } catch (err) {
        res.status(500).send({ success: false, message: 'Đã xảy ra lỗi khi xóa cửa hàng.' });
    }
});

module.exports = router;
