const mongoose = require('mongoose');

class KhuyenMai {
    constructor() {
        // Định nghĩa schema
        const khuyenMaiSchema = new mongoose.Schema({
            MaKM: String,
            TGBatDau: String,
            TGKetThuc: String,
            NoiDung: String,
            MaSP: String
        }, { collection: 'KHUYENMAI' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('KhuyenMai', khuyenMaiSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của KhuyenMai
<<<<<<< Updated upstream
module.exports = new KhuyenMai().getModel();
=======
module.exports = new KhuyenMai().getModel();
>>>>>>> Stashed changes
