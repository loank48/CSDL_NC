const mongoose = require('mongoose');

const hoaDonBanSchema = new mongoose.Schema({
    MaHDB: String,
    SoLuongBan: String,
    NgayBan: String,
    TongTienThu: String,
    MaKH: String,
    MaCH: String
}, { collection: 'HOADONBAN' });

module.exports = mongoose.model('HoaDonBan', hoaDonBanSchema);
