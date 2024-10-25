const mongoose = require('mongoose');

class BinhLuan {
    constructor() {
        const binhLuanSchema = new mongoose.Schema({
            MaBL: String,
            NoiDung: String,
            NgayDang: String,
            MaSP: String,
            MaKH: String
        }, { collection: 'BINHLUAN' });

        // Khởi tạo model và gán vào this.model
        this.model = mongoose.model('BinhLuan', binhLuanSchema);
    }

    // Phương thức trả về model để sử dụng ở ngoài
    getModel() {
        return this.model;
    }
}

// Export một instance của class BinhLuan để sử dụng
<<<<<<< Updated upstream
module.exports = new BinhLuan().getModel();
=======
module.exports = new BinhLuan().getModel();
>>>>>>> Stashed changes
