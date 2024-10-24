const mongoose = require('mongoose');

const donHangSchema = new mongoose.Schema({
    MaDonHang: String,
    MaKH: String,
    NgayLap: String,
    TongTien: String,
    TrangThai: String
}, { collection: 'DONHANG' });

module.exports = mongoose.model('DonHang', donHangSchema);
