const mongoose = require('mongoose');

const khuyenMaiSchema = new mongoose.Schema({
    MaKM: String,
    TGBatDau: String,
    TGKetThuc: String,
    NoiDung: String,
    MaSP: String
}, { collection: 'KHUYENMAI' });

module.exports = mongoose.model('KhuyenMai', khuyenMaiSchema);
