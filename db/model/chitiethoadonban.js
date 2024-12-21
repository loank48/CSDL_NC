// const mongoose = require('mongoose');

// class ChiTietHoaDonBan {
//     constructor() {
//         // Định nghĩa schema
//         const chiTietHoaDonBanSchema = new mongoose.Schema({
//             MaHDB: String,
//             MaSP: String,
//             SoLuongBan: String,
//             DonGiaBan: String,
//             GiamGia: String
//         }, { collection: 'CHITIETHOADONBAN' });

//         // Khởi tạo model và gán vào thuộc tính của class
//         this.model = mongoose.model('ChiTietHoaDonBan', chiTietHoaDonBanSchema);
//     }

//     // Phương thức truy cập trực tiếp vào model
//     getModel() {
//         return this.model;
//     }
// }

// // Export ra một instance của ChiTietHoaDonBan
// module.exports = new ChiTietHoaDonBan().getModel();
