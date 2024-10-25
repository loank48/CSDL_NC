const mongoose = require('mongoose');

class NhanVien {
    constructor() {
        // Định nghĩa schema
        const nhanVienSchema = new mongoose.Schema({
            MaNV: String,
            TenNV: String,
            NgaySinh: String,
            GioiTinh: String,
            Email: String,
            SDT: String,
            DiaChi: String,
            ChucVu: String,
            Luong: String
        }, { collection: 'NHANVIEN' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('NhanVien', nhanVienSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của NhanVien
module.exports = new NhanVien().getModel();
