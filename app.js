const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const binhLuanRoutes = require('./routes/binhluan');
const chatLieuRoutes = require('./routes/chatlieu');
const cuaHangRoutes = require('./routes/cuahang');
const donHangRoutes = require('./routes/donhang');
const hoaDonBanRoutes = require('./routes/hoadonban');
const hoaDonNhapRoutes = require('./routes/hoadonnhap');
const khachHangRoutes = require('./routes/khachhang');
const khuyenMaiRoutes = require('./routes/khuyenmai');
const loaiSanPhamRoutes = require('./routes/loaisanpham');
const loaiTheThanhVienRoutes = require('./routes/loaithethanhvien');
const mauSacRoutes = require('./routes/mausac');
const nhaCungCapRoutes = require('./routes/nhacungcap');
const nhanVienRoutes = require('./routes/nhanvien');
const productRoutes = require('./routes/product'); // Đổi tên biến từ proDuctRoutes thành productRoutes
const sizeRoutes = require('./routes/size');
const thamGiaKMRoutes = require('./routes/thamgiakm');
const theThanhVienRoutes = require('./routes/thethanhvien');
const chiTietHoaDonNhapRoutes = require('./routes/chitiethoadonnhap');
const chiTietHoaDonBanRoutes = require('./routes/chitiethoadonban');

const app = express();

mongoose.connect('mongodb://localhost:27017/CSDL_SHOPQA')
    .then(() => console.log('Database connected successfully!'))
    .catch(err => console.log('Database connection error:', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

// Định tuyến cho trang chủ
app.get('/', (req, res) => {
    res.render('home');
});

// Định tuyến cho các collection
app.use('/binhluan', binhLuanRoutes);
app.use('/chatlieu', chatLieuRoutes);
app.use('/cuahang', cuaHangRoutes);
app.use('/donhang', donHangRoutes);
app.use('/hoadonban', hoaDonBanRoutes);
app.use('/hoadonnhap', hoaDonNhapRoutes);
app.use('/khachhang', khachHangRoutes);
app.use('/khuyenmai', khuyenMaiRoutes);
app.use('/loaisanpham', loaiSanPhamRoutes);
app.use('/loaithethanhvien', loaiTheThanhVienRoutes);
app.use('/mausac', mauSacRoutes);
app.use('/nhacungcap', nhaCungCapRoutes);
app.use('/nhanvien', nhanVienRoutes);
app.use('/product', productRoutes); // Đổi tên biến từ proDuctRoutes thành productRoutes
app.use('/size', sizeRoutes);
app.use('/thamgiakm', thamGiaKMRoutes);
app.use('/thethanhvien', theThanhVienRoutes);
app.use('/chitiethoadonnhap', chiTietHoaDonNhapRoutes);
app.use('/chitiethoadonban', chiTietHoaDonBanRoutes);

app.listen(3000, function () {
    console.log("Starting at port 3000...");
});
