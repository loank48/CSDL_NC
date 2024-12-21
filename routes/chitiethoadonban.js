// const express = require('express');
// const router = express.Router();
// const ChiTietHoaDonBan = require('./../db/model/chitiethoadonban');

// // Home page: loading all sales invoice details
// router.get('/', async (req, res) => {
//     try {
//         const salesInvoiceDetails = await ChiTietHoaDonBan.find({});
//         res.render('chitiethoadonban', { salesInvoiceDetails: salesInvoiceDetails });
//     } catch (err) {
//         console.log('Error: ', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Go to Add Sales Invoice Detail page
// router.get('/add-sales-invoice-detail', (req, res) => {
//     res.render('add-sales-invoice-detail');
// });

// // Add new Sales Invoice Detail
// router.post('/', async (req, res) => {
//     try {
//         let newSalesInvoiceDetail = new ChiTietHoaDonBan({
//             MaHDB: req.body.MaHDB,
//             MaSP: req.body.MaSP,
//             SoLuongBan: req.body.SoLuongBan,
//             DonGiaBan: req.body.DonGiaBan,
//             GiamGia: req.body.GiamGia
//         });

//         await newSalesInvoiceDetail.save();
//         res.redirect('/chitiethoadonban');
//     } catch (err) {
//         console.log('Error: ', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Go to Update Sales Invoice Detail page
// router.get('/update-sales-invoice-detail/:salesInvoiceDetailId', async (req, res) => {
//     try {
//         const salesInvoiceDetail = await ChiTietHoaDonBan.findById(req.params.salesInvoiceDetailId);
//         if (!salesInvoiceDetail) {
//             return res.status(404).send('Sales Invoice Detail not found');
//         }
//         res.render('update-sales-invoice-detail', { salesInvoiceDetail: salesInvoiceDetail });
//     } catch (err) {
//         console.log('Error: ', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Delete Sales Invoice Detail
// router.delete('/:salesInvoiceDetailId', async (req, res) => {
//     try {
//         const doc = await ChiTietHoaDonBan.findByIdAndDelete(req.params.salesInvoiceDetailId);
//         res.send(doc);
//     } catch (err) {
//         console.log('Error: ', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Update Sales Invoice Detail
// router.post('/:salesInvoiceDetailId', async (req, res) => {
//     try {
//         await ChiTietHoaDonBan.findByIdAndUpdate(
//             req.params.salesInvoiceDetailId,
//             {
//                 $set: {
//                     MaHDB: req.body.MaHDB,
//                     MaSP: req.body.MaSP,
//                     SoLuongBan: req.body.SoLuongBan,
//                     DonGiaBan: req.body.DonGiaBan,
//                     GiamGia: req.body.GiamGia
//                 }
//             },
//             { useFindAndModify: false }
//         );
//         res.redirect('/chitiethoadonban');
//     } catch (err) {
//         console.log('Error: ', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// module.exports = router;