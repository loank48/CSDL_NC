const mongoose = require('mongoose');

class Anh {
    constructor() {
        const anhSchema = new mongoose.Schema({
            Url: String,
            MoTa: String
        }, { collection: 'IMAGE' });

        // Khởi tạo model và gán vào this.model
        this.model = mongoose.model('Anh', anhSchema);
    }

    // Phương thức trả về model để sử dụng ở ngoài
    getModel() {
        return this.model;
    }
}

// Export một instance của class Anh để sử dụng
module.exports = new Anh().getModel();