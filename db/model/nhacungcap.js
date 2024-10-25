const mongoose = require('mongoose');

class NhaCungCap {
    constructor() {
        // Định nghĩa schema
        const nhaCungCapSchema = new mongoose.Schema({
            MaNCC: String,
            TenNCC: String,
            SDT: String,
            DiaChi: String,
            Email: String
        }, { collection: 'NHACUNGCAP' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('NhaCungCap', nhaCungCapSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của NhaCungCap
<<<<<<< Updated upstream
module.exports = new NhaCungCap().getModel();
=======
module.exports = new NhaCungCap().getModel();
>>>>>>> Stashed changes
