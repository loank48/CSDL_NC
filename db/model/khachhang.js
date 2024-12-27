const sql = require('../connect');

class KhachHang {
    async getAllKhachHang() {
        try {
            const pool = await sql._connect();
            const result = await pool.request().query('SELECT * FROM dbo.KhachHang');
            return result.recordset; // Trả về danh sách khách hàng
        } catch (err) {
            console.error('Lỗi khi lấy danh sách khách hàng:', err);
            throw err;
        }
    }

    async getKhachHangByID(MaKH) {
        try {
            const pool = await sql._connect();
            const result = await pool
                .request()
                .input('MaKH', MaKH)
                .query('SELECT * FROM dbo.KhachHang WHERE MaKH = @MaKH');
            return result.recordset[0]; // Trả về thông tin khách hàng đầu tiên
        } catch (err) {
            console.error(`Lỗi khi lấy khách hàng có mã ${MaKH}:`, err);
            throw err;
        }
    }
async save(data) {
            try {
    
                console.log('Dữ liệu nhận được:', data);  // Kiểm tra dữ liệu truyền vào
    
                console.log("--------------------->data:" + data.MaKH);
    
                const pool = await sql._connect(); // Đảm bảo kết nối với cơ sở dữ liệu
                const checkQuery = `
                SELECT COUNT(*) AS count 
                FROM dbo.KhachHang 
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
                    SET TenKH = @TenKH, GioiTinh = @GioiTinh, NgaySinh = @NgaySinh, DiaChi = @DiaChi, Email = @Email, SDT = @SDT
                    WHERE MaKH = @MaKH
                `;
                const updateRequest = pool.request();
                updateRequest.input('MaKH', data.MaKH);
                updateRequest.input('TenKH', data.TenKH);
                updateRequest.input('GioiTinh', data.GioiTinh);
                updateRequest.input('NgaySinh', data.NgaySinh);
                updateRequest.input('DiaChi', data.DiaChi);
                updateRequest.input('Email', data.Email);
                updateRequest.input('SDT', data.SDT);
                const updateResult = await updateRequest.query(updateQuery);
    
                return {
                    message: 'Cập nhật khách hàng thành công!',
                    rowsAffected: updateResult.rowsAffected,
                };
            } else {
                // Nếu chưa tồn tại, thực hiện thêm mới
                const insertQuery = `
                    INSERT INTO dbo.KhachHang (MaKH, TenKH, GioiTinh, NgaySinh, DiaChi, Email, SDTSDT)
                    VALUES (@MaKH, @TenKH, @GioiTinh, @NgaySinh, @DiaChi, @Email, @SDT)
                `;
                const insertRequest = pool.request();
                insertRequest.input('MaKH', data.MaKH);
                insertRequest.input('TenKH', data.TenKH);
                insertRequest.input('GioiTinh', data.GioiTinh);
                insertRequest.input('NgaySinh', data.NgaySinh);
                insertRequest.input('DiaChi', data.DiaChi);
                insertRequest.input('Email', data.Email);
                insertRequest.input('SDT', data.SDT);
                const insertResult = await insertRequest.query(insertQuery);
    
                return {
                    message: 'Thêm khách hàng thành công!',
                    rowsAffected: insertResult.rowsAffected,
                };
            }
        } catch (err) {
            console.error('Lỗi khi xử lý khách hàng:', err);
            throw err;
        }
    }
    async delete(MaKH) {
                try {
                    const pool = await sql._connect(); // Kết nối với cơ sở dữ liệu
            
                    // Kiểm tra xem bản ghi có tồn tại không
                    const checkQuery = `
                        SELECT COUNT(*) AS count 
                        FROM dbo.KhachHang
                        WHERE MaKH = @MaKH
                    `;
                    const checkResult = await pool.request()
                        .input('MaKH', MaKH) // Đảm bảo kiểu dữ liệu phù hợp
                        .query(checkQuery);
            
                    const count = checkResult.recordset[0].count;
            
                    if (count === 0) {
                        return { success: false, message: `Không tìm thấy kkhách hàng với mã ${MaKH}` };
                    }
            
                    // Thực hiện xóa bản ghi
                    const deleteQuery = `
                        DELETE FROM dbo.KhachHang
                        WHERE MaKH = @MaKH
                    `;
                    const deleteResult = await pool.request()
                        .input('MaKH', MaKH)
                        .query(deleteQuery);
            
                    return {
                        success: true,
                        message: `Đã xóa thành công khách hàng với mã ${MaKH}`,
                        rowsAffected: deleteResult.rowsAffected,
                    };
                } catch (err) {
                    console.error(`Lỗi khi xóa khách hàng có mã ${MaKH}:`, err);
                    throw err;
                }
            }
}

module.exports = new KhachHang();
