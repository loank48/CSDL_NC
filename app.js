const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import các route
const anhRoutes = require('./routes/anh');
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

// Class Server để quản lý việc khởi động ứng dụng và kết nối cơ sở dữ liệu
class Server {
    constructor() {
        this.app = express(); // Tạo instance của Express
        this.config();        // Cấu hình middleware và view engine
        this.routes();        // Cấu hình các route
        this.connectToDatabase(); // Kết nối cơ sở dữ liệu
    }

    // Cấu hình middleware và view engine
    config() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.set('view engine', 'ejs');
        this.app.set('views', './views');
    }

    // Kết nối đến MongoDB
    connectToDatabase() {
        mongoose.connect('mongodb://localhost:27017/CSDL_SHOPQA')
            .then(() => console.log('Database connected successfully!'))
            .catch(err => console.log('Database connection error:', err));
    }

    // Cấu hình các route
    routes() {
        this.app.get('/', (req, res) => {
            res.render('home');
        });

        // Sử dụng các route cho từng collection
        this.app.use('/anh', anhRoutes);
        this.app.use('/binhluan', binhLuanRoutes);
        this.app.use('/chatlieu', chatLieuRoutes);
        this.app.use('/cuahang', cuaHangRoutes);
        this.app.use('/donhang', donHangRoutes);
        this.app.use('/hoadonban', hoaDonBanRoutes);
        this.app.use('/hoadonnhap', hoaDonNhapRoutes);
        this.app.use('/khachhang', khachHangRoutes);
        this.app.use('/khuyenmai', khuyenMaiRoutes);
        this.app.use('/loaisanpham', loaiSanPhamRoutes);
        this.app.use('/loaithethanhvien', loaiTheThanhVienRoutes);
        this.app.use('/mausac', mauSacRoutes);
        this.app.use('/nhacungcap', nhaCungCapRoutes);
        this.app.use('/nhanvien', nhanVienRoutes);
        this.app.use('/product', productRoutes);
        this.app.use('/size', sizeRoutes);
        this.app.use('/thamgiakm', thamGiaKMRoutes);
        this.app.use('/thethanhvien', theThanhVienRoutes);
        this.app.use('/chitiethoadonnhap', chiTietHoaDonNhapRoutes);
        this.app.use('/chitiethoadonban', chiTietHoaDonBanRoutes);
    }

    // Phương thức khởi động server
    start() {
        const port = 3000;
        this.app.listen(port, () => {
            console.log(`Starting at port ${port}...`);
        });
    }
}

// Tạo một instance của Server và khởi động
const server = new Server();
server.start();
