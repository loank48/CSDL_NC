const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    MaSize: String,
    TenSize: String
}, { collection: 'SIZE' });

module.exports = mongoose.model('Size', sizeSchema);
