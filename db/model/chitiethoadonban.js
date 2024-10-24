const mongoose = require('mongoose');

const chiTietHoaDonBanSchema = new mongoose.Schema({
    MaHDB: String,
    MaSP: String,
    SoLuongBan: String,
    DonGiaBan: String,
    GiamGia: String
}, { collection: 'CHITIETHOADONBAN' });

module.exports = mongoose.model('ChiTietHoaDonBan', chiTietHoaDonBanSchema);
