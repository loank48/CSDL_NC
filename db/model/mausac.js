const mongoose = require('mongoose');

const mauSacSchema = new mongoose.Schema({
    MaMau: String,
    TenMau: String
}, { collection: 'MAUSAC' });

module.exports = mongoose.model('MauSac', mauSacSchema);
