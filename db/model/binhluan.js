const mongoose = require('mongoose');

const binhLuanSchema = new mongoose.Schema({
    MaBL: String,
    NoiDung: String,
    NgayDang: String,
    MaSP: String,
    MaKH: String
}, { collection: 'BINHLUAN' });

module.exports = mongoose.model('BinhLuan', binhLuanSchema);
