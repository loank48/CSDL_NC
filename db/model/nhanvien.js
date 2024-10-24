const mongoose = require('mongoose');

const nhanVienSchema = new mongoose.Schema({
    MaNV: String,
    TenNV: String,
    NgaySinh: String,
    GioiTinh: String,
    Email: String,
    SDT: String,
    DiaChi: String,
    ChucVu: String,
    Luong: String
}, { collection: 'NHANVIEN' });

module.exports = mongoose.model('NhanVien', nhanVienSchema);
