const mongoose = require('mongoose');

class TheThanhVien {
    constructor() {
        // Định nghĩa schema
        const theThanhVienSchema = new mongoose.Schema({
            MaSoThe: String,
            DiemTichLuy: String,
            NgayCap: String,
            NgayHetHan: String,
            MaKH: String,
            MaLoaiThe: String
        }, { collection: 'THETHANHVIEN' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('TheThanhVien', theThanhVienSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của TheThanhVien
<<<<<<< Updated upstream
module.exports = new TheThanhVien().getModel();
=======
module.exports = new TheThanhVien().getModel();
>>>>>>> Stashed changes
