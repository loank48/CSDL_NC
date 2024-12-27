const sql = require('../connect');
const mongoose = require('mongoose'); // Kết nối với MongoDB
const product = require('./product');

class DonHang {
    // async getAllDonHang() {
    //     try {
    //         const pool = await sql._connect();
    //         const result = await pool.request().query('SELECT * FROM dbo.DonHang');
    //         return result.recordset; // Trả về danh sách đơn hàng
    //     } catch (err) {
    //         console.error('Lỗi khi lấy danh sách đơn hàng:', err);
    //         throw err;
    //     }
    // }

    async getDonHang() {
        try {
            const result = [];
            const pool = await sql._connect();
            const resultMSSQL = await pool.request().query('SELECT MaKH, MaSP, NgayLap, ThanhTien FROM dbo.DonHang');

            for (let index = 0; index < resultMSSQL.recordset.length; index++) {
                const item = resultMSSQL.recordset[index];                
                const resultMongoDB = await product.find({MaSP: item.MaSP});
                console.log(resultMongoDB);
                
                const combinedItem = {
                    MaKH: item.MaKH,                  // Dữ liệu từ MSSQL
                    MaSP: item.MaSP,                  // Dữ liệu từ MSSQL
                    TenSP: resultMongoDB[0].TenSP,        // Dữ liệu từ MongoDB
                    Mau: resultMongoDB[0].Mau,            // Dữ liệu từ MongoDB
                    Size: resultMongoDB[0].Size,          // Dữ liệu từ MongoDB
                    ChatLieu: resultMongoDB[0].ChatLieu, 
                    GiaBan: resultMongoDB[0].GiaBan,
                    NgayLap: item.NgayLap,
                    ThanhTien: item.ThanhTien,         
                    // UrlImage: resultMongoDB[0].UrlImage
                };
                console.log(combinedItem);
                
                
                result.push(combinedItem);
            }
            return result;

        } catch (err) {
            console.error('Lỗi khi lấy tất cả sản phẩm:', err);
            throw err;
        }
    }
    async getDonHangByID(MaKH) {
            try {
                const pool = await sql._connect();
                const result = await pool
                    .request()
                    .input('MaKH', MaKH)
                    .query('SELECT * FROM dbo.DonHang WHERE MaKH = @MaKH');
                return result.recordset[0]; // Trả về thông tin nhân viên đầu tiên
            } catch (err) {
                console.error(`Lỗi khi lấy khách hàng có mã ${MaKH}:`, err);
                throw err;
        }
    }
    async save(data) {
            try {
    
                console.log('Dữ liệu nhận được:', data);  // Kiểm tra dữ liệu truyền vào
    
                console.log("--------------------->data:" + data.MaKH + data.MaSP);
    
                const pool = await sql._connect(); // Đảm bảo kết nối với cơ sở dữ liệu
                const checkQuery = `
                SELECT COUNT(*) AS count 
                FROM dbo.DonHang 
                WHERE MaKH = @MaKH
            `;
            const checkRequest = pool.request();
            checkRequest.input('MaKH', data.MaKH);
            const checkResult = await checkRequest.query(checkQuery);
    
            const count = checkResult.recordset[0].count;
    
            if (count > 0) {
                // Nếu đã tồn tại, thực hiện cập nhật
                const updateQuery = `
                    UPDATE dbo.KhachHang
                    SET MaSP = @MaSP, NgayLap = @NgayLap, ThanhTien = @ThanhTien
                    WHERE MaKH = @MaKH
                `;
                const updateRequest = pool.request();
                updateRequest.input('MaKH', data.MaKH);
                updateRequest.input('MaSP', data.MaSP);
                updateRequest.input('NgayLap', data.NgayLap);
                updateRequest.input('ThanhTien', data.ThanhTien);
                const updateResult = await updateRequest.query(updateQuery);
    
                return {
                    message: 'Cập nhật đơn hàng thành công!',
                    rowsAffected: updateResult.rowsAffected,
                };
            } else {
                // Nếu chưa tồn tại, thực hiện thêm mới
                const insertQuery = `
                    INSERT INTO dbo.DonHang (MaKH, MaSP, NgayLap, ThanhTien)
                    VALUES (@MaKH, @MaSP, @NgayLap, @ThanhTien)
                `;
                const insertRequest = pool.request();
                insertRequest.input('MaKH', data.MaKH);
                insertRequest.input('MaSP', data.MaSP);
                insertRequest.input('NgayLap', data.NgayLap);
                insertRequest.input('ThanhTien', data.ThanhTien);
                const insertResult = await insertRequest.query(insertQuery);
    
                return {
                    message: 'Thêm đơn hàng thành công!',
                    rowsAffected: insertResult.rowsAffected,
                };
            }
        } catch (err) {
            console.error('Lỗi khi xử lý đơn hàng:', err);
            throw err;
        }
    }
}
module.exports = new DonHang();
