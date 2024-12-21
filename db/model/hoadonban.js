const mongoose = require('mongoose');

class HoaDonBan {
    constructor() {
        // Định nghĩa schema
        const hoaDonBanSchema = new mongoose.Schema({
            MaHDB: String,
            SoLuongBan: Number,
            NgayBan: Date,
            TongTienThu: String,
            // MaKH: String,
            MaCH: String
        }, { collection: 'HOADONBAN' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('HoaDonBan', hoaDonBanSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của HoaDonBan
module.exports = new HoaDonBan().getModel();
