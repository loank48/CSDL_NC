const mongoose = require('mongoose');

class ChiTietHoaDonNhap {
    constructor() {
        // Định nghĩa schema
        const chiTietHoaDonNhapSchema = new mongoose.Schema({
            MaHDN: String,
            MaSP: String,
            SoLuongNhap: Number,
            DonGiaNhap: String
        }, { collection: 'CHITIETHOADONNHAP' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('ChiTietHoaDonNhap', chiTietHoaDonNhapSchema);
    }

    // Phương thức truy cập trực tiếp vào model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của ChiTietHoaDonNhap
module.exports = new ChiTietHoaDonNhap().getModel();
