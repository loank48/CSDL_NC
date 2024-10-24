const mongoose = require('mongoose');

const loaiSanPhamSchema = new mongoose.Schema({
    MaLoai: String,
    TenLoai: String,
    MoTaLSP: String
}, { collection: 'LOAISANPHAM' });

module.exports = mongoose.model('LoaiSanPham', loaiSanPhamSchema);
