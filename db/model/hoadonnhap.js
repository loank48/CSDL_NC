const mongoose = require('mongoose');

class HoaDonNhap {
    constructor() {
        // Định nghĩa schema
        const hoaDonNhapSchema = new mongoose.Schema({
            MaHDN: String,
            NgayNhap: String,
            TongTienTra: String,
            MaNV: String,
            MaNCC: String
        }, { collection: 'HOADONNHAP' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('HoaDonNhap', hoaDonNhapSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của HoaDonNhap
module.exports = new HoaDonNhap().getModel();
