const sql = require('../connect');

class HoaDonNhap {
    async getAllHoaDonNhap() {
        try {
            const pool = await sql._connect();
            const result = await pool.request().query('SELECT * FROM dbo.HoaDonNhap');
            return result.recordset; // Trả về danh sách hóa đơn nhập
        } catch (err) {
            console.error('Lỗi khi lấy danh sách hóa đơn nhập:', err);
            throw err;
        }
    }

    async getHoaDonNhapByID(MaHDN) {
        try {
            const pool = await sql._connect();
            const result = await pool
                .request()
                .input('MaHDN', MaHDN)
                .query('SELECT * FROM dbo.HoaDonNhap WHERE MaHDN = @MaHDN');
            return result.recordset[0]; // Trả về thông tin hóa đơn nhập đầu tiên
        } catch (err) {
            console.error(`Lỗi khi lấy hóa đơn nhập có mã ${MaHDN}:`, err);
            throw err;
        }
    }
    async save(data) {
                try {
        
                    console.log('Dữ liệu nhận được:', data);  // Kiểm tra dữ liệu truyền vào
        
                    console.log("--------------------->data:" + data.MaHDN);
        
                    const pool = await sql._connect(); // Đảm bảo kết nối với cơ sở dữ liệu
                    const checkQuery = `
                    SELECT COUNT(*) AS count 
                    FROM dbo.HoaDonNhap 
                    WHERE MaHDN = @MaHDN
                `;
                const checkRequest = pool.request();
                checkRequest.input('MaHDN', data.MaHDN);
                const checkResult = await checkRequest.query(checkQuery);
        
                const count = checkResult.recordset[0].count;
        
                if (count > 0) {
                    // Nếu đã tồn tại, thực hiện cập nhật
                    const updateQuery = `
                        UPDATE dbo.HoaDonNhap
                        SET SoLuongNhap = @SoLuongNhap, NgayNhap = @NgayNhap, TongTienTra = @TongTienTra, MaCH = @MaCH
                        WHERE MaHDN = @MaHDN
                    `;
                    const updateRequest = pool.request();
                    updateRequest.input('MaHDN', data.MaHDN);
                    updateRequest.input('SoLuongNhap', data.SoLuongNhap);
                    updateRequest.input('NgayNhap', data.NgayNhap);
                    updateRequest.input('TongTienTra', data.TongTienTra);
                    updateRequest.input('MaCH', data.MaCH);
                    const updateResult = await updateRequest.query(updateQuery);
        
                    return {
                        message: 'Cập nhật hóa đơn nhập thành công!',
                        rowsAffected: updateResult.rowsAffected,
                    };
                } else {
                    // Nếu chưa tồn tại, thực hiện thêm mới
                    const insertQuery = `
                        INSERT INTO dbo.HoaDonNhap (MaHDN, SoLuongNhap, NgayNhap, TongTienTra, MaCH)
                        VALUES (@MaHDN, @SoLuongNhap, @NgayNhap, @TongTienTra, @MaCH)
                    `;
                    const insertRequest = pool.request();
                    insertRequest.input('MaHDN', data.MaHDN);
                    insertRequest.input('SoLuongNhap', data.SoLuongNhap);
                    insertRequest.input('NgayNhap', data.NgayNhap);
                    insertRequest.input('TongTienTra', data.TongTienTra);
                    insertRequest.input('MaCH', data.MaCH);
                    const insertResult = await insertRequest.query(insertQuery);
        
                    return {
                        message: 'Thêm hóa đơn nhập thành công!',
                        rowsAffected: insertResult.rowsAffected,
                    };
                }
            } catch (err) {
                console.error('Lỗi khi xử lý hóa đơn nhập:', err);
                throw err;
            }
        }
    async delete(MaHDN) {
                try {
                    const pool = await sql._connect(); // Kết nối với cơ sở dữ liệu
            
                    // Kiểm tra xem bản ghi có tồn tại không
                    const checkQuery = `
                        SELECT COUNT(*) AS count 
                        FROM dbo.HoaDonNhap 
                        WHERE MaHDN = @MaHDN
                    `;
                    const checkResult = await pool.request()
                        .input('MaHDN', MaHDN) // Đảm bảo kiểu dữ liệu phù hợp
                        .query(checkQuery);
            
                    const count = checkResult.recordset[0].count;
            
                    if (count === 0) {
                        return { success: false, message: `Không tìm thấy HDN với mã ${MaHDN}` };
                    }
            
                    // Thực hiện xóa bản ghi
                    const deleteQuery = `
                        DELETE FROM dbo.HoaDonNhap 
                        WHERE MaHDN = @MaHDN
                    `;
                    const deleteResult = await pool.request()
                        .input('MaHDN', MaHDN)
                        .query(deleteQuery);
            
                    return {
                        success: true,
                        message: `Đã xóa thành công HDN với mã ${MaHDN}`,
                        rowsAffected: deleteResult.rowsAffected,
                    };
                } catch (err) {
                    console.error(`Lỗi khi xóa HDN có mã ${MaHDN}:`, err);
                    throw err;
                }
            }
    }
}
    

module.exports = new HoaDonNhap();
