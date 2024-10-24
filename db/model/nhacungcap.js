const mongoose = require('mongoose');

const nhaCungCapSchema = new mongoose.Schema({
    MaNCC: String,
    TenNCC: String,
    SDT: String,
    DiaChi: String,
    Email: String
}, { collection: 'NHACUNGCAP' });

module.exports = mongoose.model('NhaCungCap', nhaCungCapSchema);
