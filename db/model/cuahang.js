const mongoose = require('mongoose');

class CuaHang {
    constructor() {
        // Định nghĩa schema
        const cuaHangSchema = new mongoose.Schema({
            MaCH: String,
            TenCH: String,
            TongNV: Number,
            DiaChi: String
        }, { collection: 'CUAHANG' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('CuaHang', cuaHangSchema);
    }

    // Phương thức truy cập trực tiếp vào model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của CuaHang
<<<<<<< Updated upstream
module.exports = new CuaHang().getModel();
=======
module.exports = new CuaHang().getModel();
>>>>>>> Stashed changes
