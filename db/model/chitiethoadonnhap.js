const mongoose = require('mongoose');

const chiTietHoaDonNhapSchema = new mongoose.Schema({
    MaHDN: String,
    MaSP: String,
    SoLuongNhap: Number,
    DonGiaNhap: String
}, { collection: 'CHITIETHOADONNHAP' });

module.exports = mongoose.model('ChiTietHoaDonNhap', chiTietHoaDonNhapSchema);
