const mongoose = require('mongoose');

const cuaHangSchema = new mongoose.Schema({
    MaCH: String,
    TenCH: String,
    TongNV: Number,
    DiaChi: String
}, { collection: 'CUAHANG' });

module.exports = mongoose.model('CuaHang', cuaHangSchema);
