const mongoose = require('mongoose');

const thamGiaKMSchema = new mongoose.Schema({
    MaKH: String,
    NgayTG: String
}, { collection: 'THAMGIAKM' });

module.exports = mongoose.model('ThamGiaKM', thamGiaKMSchema);
