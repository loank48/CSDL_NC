const mongoose = require('mongoose');

const theThanhVienSchema = new mongoose.Schema({
    MaSoThe: String,
    DiemTichLuy: String,
    NgayCap: String,
    NgayHetHan: String,
    MaKH: String,
    MaLoaiThe: String
}, { collection: 'THETHANHVIEN' });

module.exports = mongoose.model('TheThanhVien', theThanhVienSchema);
