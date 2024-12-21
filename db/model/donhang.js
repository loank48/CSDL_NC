const mongoose = require('mongoose');

class DonHang {
    constructor() {
        // Định nghĩa schema
        const donHangSchema = new mongoose.Schema({
            // MaDonHang: String,
            MaKH: String,
            MaSP: String,
            NgayLap: String,
            ThanhTien: String
            // TrangThai: String
        }, { collection: 'DONHANG' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('DonHang', donHangSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của DonHang
module.exports = new DonHang().getModel();
