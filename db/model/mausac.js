const mongoose = require('mongoose');

class MauSac {
    constructor() {
        // Định nghĩa schema
        const mauSacSchema = new mongoose.Schema({
            MaMau: String,
            TenMau: String
        }, { collection: 'MAUSAC' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('MauSac', mauSacSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của MauSac
<<<<<<< Updated upstream
module.exports = new MauSac().getModel();
=======
module.exports = new MauSac().getModel();
>>>>>>> Stashed changes
