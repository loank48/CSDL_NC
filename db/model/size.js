const mongoose = require('mongoose');

class Size {
    constructor() {
        // Định nghĩa schema
        const sizeSchema = new mongoose.Schema({
            MaSize: String,
            TenSize: String
        }, { collection: 'SIZE' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('Size', sizeSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của Size
module.exports = new Size().getModel();
