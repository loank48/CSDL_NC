const mongoose = require('mongoose');

class Product {
    constructor() {
        // Định nghĩa schema
        const productSchema = new mongoose.Schema({
            MaSP: String,
            TenSP: String,
            MoTaSP: String,
            GiaBan: String,
            // GiaGoc: String,
            TonKho: Number,
            MaLoai: String,
            ChatLieu: String,
            Mau: String,
            Size: String,
            MaCH: String,
            UrlImage: String
            
        }, { collection: 'SANPHAM' }); // Chỉ định collection là SANPHAM

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('Product', productSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của Product
module.exports = new Product().getModel();
