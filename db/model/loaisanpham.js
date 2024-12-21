const mongoose = require('mongoose');

class LoaiSanPham {
    constructor() {
        // Định nghĩa schema
        const loaiSanPhamSchema = new mongoose.Schema({
            MaLoai: String,
            TenLoai: String
            // MoTaLSP: String
        }, { collection: 'LOAISANPHAM' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('LoaiSanPham', loaiSanPhamSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của LoaiSanPham
module.exports = new LoaiSanPham().getModel();
