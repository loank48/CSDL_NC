const { NVarChar } = require('mssql');
const sql = require('../connect');

class HoaDonBan {
    async getAllHoaDonBan() {
        try {
            const pool = await sql._connect();
            const result = await pool.request().query('SELECT * FROM dbo.HoaDonBan');
            return result.recordset; // Trả về danh sách hóa đơn bán
        } catch (err) {
            console.error('Lỗi khi lấy danh sách hóa đơn bán:', err);
            throw err;
        }
    }

    async getHoaDonBanByID(MaHDB) {
        try {
            const pool = await sql._connect();
            const result = await pool
                .request()
                .input('MaHDB', MaHDB)
                .query('SELECT * FROM dbo.HoaDonBan WHERE MaHDB = @MaHDB');
            return result.recordset[0]; // Trả về thông tin hóa đơn bán đầu tiên
        } catch (err) {
            console.error(`Lỗi khi lấy hóa đơn bán có mã ${MaHDB}:`, err);
            throw err;
        }
    }
    async save(data) {
            try {
    
                console.log('Dữ liệu nhận được:', data);  // Kiểm tra dữ liệu truyền vào
    
                console.log("--------------------->data:" + data.MaHDB);
    
                const pool = await sql._connect(); // Đảm bảo kết nối với cơ sở dữ liệu
                const checkQuery = `
                SELECT COUNT(*) AS count 
                FROM dbo.HoaDonBan 
                WHERE MaHDB = @MaHDB
            `;
            const checkRequest = pool.request();
            checkRequest.input('MaHDB', data.MaHDB);
            const checkResult = await checkRequest.query(checkQuery);
    
            const count = checkResult.recordset[0].count;
    
            if (count > 0) {
                // Nếu đã tồn tại, thực hiện cập nhật
                const updateQuery = `
                    UPDATE dbo.HoaDonBan
                    SET SoLuongBan = @SoLuongBan, NgayBan = @NgayBan, TongTienThu = @TongTienThu, MaCH = @MaCH
                    WHERE MaHDB = @MaHDB
                `;
                const updateRequest = pool.request();
                updateRequest.input('MaHDB', data.MaHDB);
                updateRequest.input('SoLuongBan', data.SoLuongBan);
                updateRequest.input('NgayBan', data.NgayBan);
                updateRequest.input('TongTienThu', data.TongTienThu);
                updateRequest.input('MaCH', data.MaCH);
                const updateResult = await updateRequest.query(updateQuery);
    
                return {
                    message: 'Cập nhật hóa đơn bán thành công!',
                    rowsAffected: updateResult.rowsAffected,
                };
            } else {
                // Nếu chưa tồn tại, thực hiện thêm mới
                const insertQuery = `
                    INSERT INTO dbo.HoaDonBan (MaHDB, SoLuongBan, NgayBan, TongTienThu, MaCH)
                    VALUES (@MaHDB, @SoLuongBan, @NgayBan, @TongTienThu, @MaCH)
                `;
                const insertRequest = pool.request();
                insertRequest.input('MaHDB', data.MaHDB);
                insertRequest.input('SoLuongBan', data.SoLuongBan);
                insertRequest.input('NgayBan', data.NgayBan);
                insertRequest.input('TongTienThu', data.TongTienThu);
                insertRequest.input('MaCH', data.MaCH);
                const insertResult = await insertRequest.query(insertQuery);
    
                return {
                    message: 'Thêm hóa đơn bán thành công!',
                    rowsAffected: insertResult.rowsAffected,
                };
            }
        } catch (err) {
            console.error('Lỗi khi xử lý hóa đơn bán:', err);
            throw err;
        }
    }
    async delete(MaHDB) {
            try {
                const pool = await sql._connect(); // Kết nối với cơ sở dữ liệu
        
                // Kiểm tra xem bản ghi có tồn tại không
                const checkQuery = `
                    SELECT COUNT(*) AS count 
                    FROM dbo.HoaDonBan 
                    WHERE MaHDB = @MaHDB
                `;
                const checkResult = await pool.request()
                    .input('MaHDB', MaHDB) // Đảm bảo kiểu dữ liệu phù hợp
                    .query(checkQuery);
        
                const count = checkResult.recordset[0].count;
        
                if (count === 0) {
                    return { success: false, message: `Không tìm thấy HDB với mã ${MaHDB}` };
                }
        
                // Thực hiện xóa bản ghi
                const deleteQuery = `
                    DELETE FROM dbo.HoaDonBan 
                    WHERE MaHDB = @MaHDB
                `;
                const deleteResult = await pool.request()
                    .input('MaHDB', MaHDB)
                    .query(deleteQuery);
        
                return {
                    success: true,
                    message: `Đã xóa thành công HDB với mã ${MaHDB}`,
                    rowsAffected: deleteResult.rowsAffected,
                };
            } catch (err) {
                console.error(`Lỗi khi xóa HDB có mã ${MaHDB}:`, err);
                throw err;
            }
        }
}

module.exports = new HoaDonBan();
