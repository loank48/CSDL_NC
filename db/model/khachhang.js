const mongoose = require('mongoose');

const khachHangSchema = new mongoose.Schema({
    MaKH: String,
    TenKH: String,
    GioiTinh: String,
    NgaySinh: String,
    DiaChi: String,
    Email: String,
    SDT: String
}, { collection: 'KHACHHANG' });

module.exports = mongoose.model('KhachHang', khachHangSchema);
