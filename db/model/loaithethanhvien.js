const mongoose = require('mongoose');

class LoaiTheThanhVien {
    constructor() {
        // Định nghĩa schema
        const loaiTheThanhVienSchema = new mongoose.Schema({
            MaLoaiThe: String,
            TenLoaiThe: String,
            UuDai: String
        }, { collection: 'LOAITHETHANHVIEN' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('LoaiTheThanhVien', loaiTheThanhVienSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của LoaiTheThanhVien
<<<<<<< Updated upstream
module.exports = new LoaiTheThanhVien().getModel();
=======
module.exports = new LoaiTheThanhVien().getModel();
>>>>>>> Stashed changes
