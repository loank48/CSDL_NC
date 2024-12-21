// const express = require('express');
// const router = express.Router();
// const ChiTietHoaDonNhap = require('./../db/model/chitiethoadonnhap');

// // Home page: loading all purchase invoice details
// router.get('/', async (req, res) => {
//     try {
//         const purchaseInvoiceDetails = await ChiTietHoaDonNhap.find({});
//         res.render('chitiethoadonnhap', { purchaseInvoiceDetails: purchaseInvoiceDetails });
//     } catch (err) {
//         console.log('Error: ', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Go to Add Purchase Invoice Detail page
// router.get('/add-purchase-invoice-detail', (req, res) => {
//     res.render('add-purchase-invoice-detail');
// });

// // Add new Purchase Invoice Detail
// router.post('/', async (req, res) => {
//     try {
//         let newPurchaseInvoiceDetail = new ChiTietHoaDonNhap({
//             MaHDN: req.body.MaHDN,
//             MaSP: req.body.MaSP,
//             SoLuongNhap: req.body.SoLuongNhap,
//             DonGiaNhap: req.body.DonGiaNhap
//         });

//         await newPurchaseInvoiceDetail.save();
//         res.redirect('/chitiethoadonnhap');
//     } catch (err) {
//         console.log('Error: ', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Go to Update Purchase Invoice Detail page
// router.get('/update-purchase-invoice-detail/:purchaseInvoiceDetailId', async (req, res) => {
//     try {
//         const purchaseInvoiceDetail = await ChiTietHoaDonNhap.findById(req.params.purchaseInvoiceDetailId);
//         if (!purchaseInvoiceDetail) {
//             return res.status(404).send('Purchase Invoice Detail not found');
//         }
//         res.render('update-purchase-invoice-detail', { purchaseInvoiceDetail: purchaseInvoiceDetail });
//     } catch (err) {
//         console.log('Error: ', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Delete Purchase Invoice Detail
// router.delete('/:purchaseInvoiceDetailId', async (req, res) => {
//     try {
//         const doc = await ChiTietHoaDonNhap.findByIdAndDelete(req.params.purchaseInvoiceDetailId);
//         res.send(doc);
//     } catch (err) {
//         console.log('Error: ', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Update Purchase Invoice Detail
// router.post('/:purchaseInvoiceDetailId', async (req, res) => {
//     try {
//         await ChiTietHoaDonNhap.findByIdAndUpdate(
//             req.params.purchaseInvoiceDetailId,
//             {
//                 $set: {
//                     MaHDN: req.body.MaHDN,
//                     MaSP: req.body.MaSP,
//                     SoLuongNhap: req.body.SoLuongNhap,
//                     DonGiaNhap: req.body.DonGiaNhap
//                 }
//             },
//             { useFindAndModify: false }
//         );
//         res.redirect('/chitiethoadonnhap');
//     } catch (err) {
//         console.log('Error: ', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// module.exports = router;