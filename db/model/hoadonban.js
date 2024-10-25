const mongoose = require('mongoose');

class HoaDonBan {
    constructor() {
        // Định nghĩa schema
        const hoaDonBanSchema = new mongoose.Schema({
            MaHDB: String,
            SoLuongBan: String,
            NgayBan: String,
            TongTienThu: String,
            MaKH: String,
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
<<<<<<< Updated upstream
module.exports = new HoaDonBan().getModel();
=======
module.exports = new HoaDonBan().getModel();
>>>>>>> Stashed changes
