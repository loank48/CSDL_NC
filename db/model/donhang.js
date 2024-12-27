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
                const resultMSSQL = await pool
                    .request()
                    .input('MaKH', MaKH)
                    .input('MaSP', MaSP)
                    .query('SELECT * FROM dbo.DonHang WHERE MaKH = @MaKH & MaSP = @MaSP');
                    if (resultMSSQL.recordset.length === 0) {
                        throw new Error('Không tìm thấy sản phẩm trong MSSQL');
                    }
                    const { NgayLap, ThanhTien } = resultMSSQL.recordset[0];
                    const resultMongoDB = await product.findOne({ MaSP });

                    if (!resultMongoDB) {
                        throw new Error('Không tìm thấy sản phẩm trong MongoDB');
                    }

                    // Kết hợp dữ liệu từ MSSQL và MongoDB
                    const donHang = {
                        MaKH,
                        MaSP,
                        NgayLap,
                        TenSP: resultMongoDB.TenSP,
                        Mau: resultMongoDB.Mau,
                        Size: resultMongoDB.Size,
                        ChatLieu: resultMongoDB.ChatLieu,
                        GiaBan: resultMongoDB.GiaBan,
                        ThanhTien,
                    };
                    
                    return donHang;
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
    async deleteDonHang(MaKH) {
        try {
            // 1. Xóa dữ liệu từ MSSQL
            const pool = await sql._connect(); // Kết nối với MSSQL
            const deleteMSSQLQuery = `DELETE FROM dbo.DonHang WHERE MaKH = @MaKH`;
            const deleteRequest = pool.request();
            deleteRequest.input('MaKH', MaKHKH);
            const mssqlResult = await deleteRequest.query(deleteMSSQLQuery);
    
            // Kiểm tra xem sản phẩm có tồn tại trong MSSQL không
            if (mssqlResult.rowsAffected[0] === 0) {
                throw new Error('Sản phẩm không tồn tại trong MSSQL.');
            }
    
            // 2. Xóa dữ liệu từ MongoDB
            const mongoResult = await product.deleteOne({ MaKH });
    
            // Kiểm tra xem sản phẩm có tồn tại trong MongoDB không
            if (mongoResult.deletedCount === 0) {
                throw new Error('Sản phẩm không tồn tại trong MongoDB.');
            }
    
            return { success: true, message: 'Xóa sản phẩm thành công từ cả MSSQL và MongoDB.' };
        } catch (err) {
            console.error('Lỗi khi xóa sản phẩm:', err);
            throw new Error('Lỗi khi xóa sản phẩm từ cơ sở dữ liệu.');
        }
    }
}
module.exports = new DonHang();
