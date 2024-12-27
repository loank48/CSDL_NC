const express = require('express');
const router = express.Router();
const NhanVien = require('./../db/model/nhanvien');

// Home page: loading all staffs
router.get('/', async (req, res) => {
    try {
        const staffs = await NhanVien.getAllNhanVien({});
        res.render('nhanvien', { staffs: staffs });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Add Staff page
router.get('/add-staff', (req, res) => {
    res.render('add-staff');
});

// Add new staff
router.post('/', async (req, res) => {
    try {
        let newStaff = {
            MaNV: req.body.MaNV,
            TenNV: req.body.TenNV,
            NgaySinh: req.body.NgaySinh,
            GioiTinh: req.body.GioiTinh,
            Email: req.body.Email,
            SDT: req.body.SDT,
            // DiaChi: {
                SoNha: req.body.SoNha,
                Duong: req.body.Duong,
                Quan: req.body.Quan,
                ThanhPho: req.body.ThanhPho,
            // },
            MaCH: req.body.MaCH
        };

        await NhanVien.save(newStaff);
        res.redirect('/nhanvien');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Go to Update Staff page
router.get('/update/:staffId', async (req, res) => {
    try {
        // console.log("----------->Run here");
        
        const staff = await NhanVien.getNhanVienByID(req.params.staffId);
        if (!staff) {
            return res.status(404).send('Staff not found');
        }
        res.render('update-staff', { staff: staff });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete staff
router.delete('/:staffId', async (req, res) => {
    try {
        const doc = await NhanVien.findByIdAndDelete(req.params.staffId);
        res.send(doc);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update staff
router.post('/update/:staffId', async (req, res) => {
    try {
        await NhanVien.save(
            {
                    MaNV: req.body.MaNV,
                    TenNV: req.body.TenNV,
                    NgaySinh: req.body.NgaySinh,
                    GioiTinh: req.body.GioiTinh,
                    Email: req.body.Email,
                    SDT: req.body.SDT,
                    // DiaChi: {
                        SoNha: req.body.SoNha,
                        Duong: req.body.Duong,
                        Quan: req.body.Quan,
                        ThanhPho: req.body.ThanhPho,
                    // },
                    MaCH: req.body.MaCH
                },
            { useFindAndModify: false }
        );
        res.redirect('/nhanvien');
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
