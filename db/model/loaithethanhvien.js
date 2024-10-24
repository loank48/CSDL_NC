const mongoose = require('mongoose');

const loaiTheThanhVienSchema = new mongoose.Schema({
    MaLoaiThe: String,
    TenLoaiThe: String,
    UuDai: String
}, { collection: 'LOAITHETHANHVIEN' });

module.exports = mongoose.model('LoaiTheThanhVien', loaiTheThanhVienSchema);
