const mongoose = require('mongoose');

class ThamGiaKM {
    constructor() {
        // Định nghĩa schema
        const thamGiaKMSchema = new mongoose.Schema({
            MaKH: String,
            NgayTG: String
        }, { collection: 'THAMGIAKM' });

        // Khởi tạo model và gán vào thuộc tính của class
        this.model = mongoose.model('ThamGiaKM', thamGiaKMSchema);
    }

    // Phương thức để lấy model
    getModel() {
        return this.model;
    }
}

// Export ra một instance của ThamGiaKM
<<<<<<< Updated upstream
module.exports = new ThamGiaKM().getModel();
=======
module.exports = new ThamGiaKM().getModel();
>>>>>>> Stashed changes
