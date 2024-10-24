const mongoose = require('mongoose');

const chatLieuSchema = new mongoose.Schema({
    MaChatLieu: String,
    TenChatLieu: String,
    MoTa: String
}, { collection: 'CHATLIEU' });

module.exports = mongoose.model('ChatLieu', chatLieuSchema);
