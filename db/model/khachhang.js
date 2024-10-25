const mongoose = require('mongoose');

class KhachHang {
    constructor() {
        // Định nghĩa schema
        const khachHangSchema = new mongoose.Schema({
            MaKH: String,
            TenKH: String,
            GioiTinh: String,
            NgaySinh: String,
            DiaChi: String,
            Email: String,
            SDT: String
        }, { collection: 'KHACHHANG' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('KhachHang', khachHangSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của KhachHang
module.exports = new KhachHang().getModel();
