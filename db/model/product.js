const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    MASP: String,
    TenSP: String,
    MoTaSP: String,
    GiaBan: String,
    GiaGoc: String,
    TonKho: Number,
    MaLoai: String,
    MaChatLieu: String,
    MaMau: String,
    MaSize: String
}, { collection: 'SANPHAM' }); // Chỉ định collection là SANPHAM

module.exports = mongoose.model('Product', productSchema);
