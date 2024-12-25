const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pasth = require('path');
const bcrypt = require('bcryptjs');
const sql = require('mssql');
const collection = require('./config');


// Import các route
const cuaHangRoutes = require('./routes/cuahang');
const donHangRoutes = require('./routes/donhang');
const hoaDonBanRoutes = require('./routes/hoadonban');
const hoaDonNhapRoutes = require('./routes/hoadonnhap');
const khachHangRoutes = require('./routes/khachhang');
const loaiSanPhamRoutes = require('./routes/loaisanpham');
const nhaCungCapRoutes = require('./routes/nhacungcap');
const nhanVienRoutes = require('./routes/nhanvien');
const productRoutes = require('./routes/product'); 
// const chiTietHoaDonNhapRoutes = require('./routes/user');
// const chiTietHoaDonBanRoutes = require('./routes/chitiethoadonban');

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
        this.app.use(express.static('public'));
        this.app.set('view engine', 'ejs');
        this.app.set('views', './views');
        this.app.use(express.urlencoded({extended: false}));
    }

    // Kết nối đến MongoDB
    connectToDatabase() {
        mongoose.connect('mongodb://localhost:27017/CSDL_SHOPQA_1')
            .then(() => console.log('Database connected successfully!'))
            .catch(err => console.log('Database connection error:', err));
    }

    // Cấu hình các route
    // routes() {
       
    
    
    routes() {
        // Route đăng nhập
        this.app.get('/', (req, res) => {
            res.render('login');
        });
        
        this.app.post('/login', async (req, res) => {
            try {
                const check = await collection.findOne({ name: req.body.username });
                if (!check) {
                    res.send("Username cannot found");
                } 
                const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
                if(isPasswordMatch) {
                    res.render("home");
                }   else {
                    req.send("Wrong password");
                }
            } catch {
                res.redirect('/login');
            }
        });
        
        // this.app.get('/', (_req, res) => {
        //     res.render('home');
        // });
        // Route chính, kiểm tra đăng nhập
        // this.app.get('/', (req, res) => {
        //     const isLoggedIn = req.session && req.session.isLoggedIn; // Kiểm tra trạng thái đăng nhập
        //     if (isLoggedIn) {
        //         res.render('home');
        //     } else {
        //         res.redirect('/login'); // Chuyển hướng đến trang đăng nhập
        //     }
        // });

        // Sử dụng các route cho từng collection
        this.app.use('/cuahang', cuaHangRoutes);
        this.app.use('/donhang', donHangRoutes);
        this.app.use('/hoadonban', hoaDonBanRoutes);
        this.app.use('/hoadonnhap', hoaDonNhapRoutes);
        this.app.use('/khachhang', khachHangRoutes);
        this.app.use('/loaisanpham', loaiSanPhamRoutes);
        this.app.use('/nhacungcap', nhaCungCapRoutes);
        this.app.use('/nhanvien', nhanVienRoutes);
        this.app.use('/product', productRoutes);
        // this.app.use('/chitiethoadonnhap', chiTietHoaDonNhapRoutes);
        // this.app.use('/chitiethoadonban', chiTietHoaDonBanRoutes);
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
