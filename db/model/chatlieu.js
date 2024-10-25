const mongoose = require('mongoose');

class ChatLieu {
    constructor() {
        // Định nghĩa schema
        const chatLieuSchema = new mongoose.Schema({
            MaChatLieu: String,
            TenChatLieu: String,
            MoTa: String
        }, { collection: 'CHATLIEU' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('ChatLieu', chatLieuSchema);
    }

    // Phương thức truy cập trực tiếp vào model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của ChatLieu
module.exports = new ChatLieu().getModel();
