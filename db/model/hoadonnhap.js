const mongoose = require('mongoose');

const hoaDonNhapSchema = new mongoose.Schema({
    MaHDN: String,
    NgayNhap: String,
    TongTienTra: String,
    MaNV: String,
    MaNCC: String
}, { collection: 'HOADONNHAP' });

module.exports = mongoose.model('HoaDonNhap', hoaDonNhapSchema);
