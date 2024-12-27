const sql = require('../connect');

class CuaHang {
    async getAllCuaHang() {
        try {
            const pool = await sql._connect();
            const result = await pool.request().query('SELECT * FROM dbo.CuaHang');
            return result.recordset; // Trả về danh sách cửa hàng
        } catch (err) {
            console.error('Lỗi khi lấy danh sách cửa hàng:', err);
            throw err;
        }
    }

    async getCuaHangByMaCH(MaCH) {
        try {
            const pool = await sql._connect();
            const result = await pool
                .request()
                .input('MaCH', MaCH)
                .query('SELECT * FROM dbo.CuaHang WHERE MaCH = @MaCH');
            return result.recordset[0]; // Trả về thông tin cửa hàng đầu tiên
        } catch (err) {
            console.error(`Lỗi khi lấy cửa hàng có mã ${MaCH}:`, err);
            throw err;
        }
    }
async save(data) {
        try {

            console.log('Dữ liệu nhận được:', data);  // Kiểm tra dữ liệu truyền vào

            // dataMongo = {
            //     data.MaCH
            // }

            // dataMSSQL = {
            //     data.count
            // }

            console.log("--------------------->data:" + data.MaCH);
        
            // // Kiểm tra nếu dữ liệu không có thuộc tính 'MaCH' hoặc 'TenLoai'
            // if (!data || !data.MaCH || !data.TenLoai) {
            //     throw new Error('Thiếu dữ liệu MaCH hoặc TenLoai');
            // }

            const pool = await sql._connect(); // Đảm bảo kết nối với cơ sở dữ liệu
            const checkQuery = `
            SELECT COUNT(*) AS count 
            FROM dbo.CuaHang 
            WHERE MaCH = @MaCH
        `;
        const checkRequest = pool.request();
        checkRequest.input('MaCH', data.MaCH);
        const checkResult = await checkRequest.query(checkQuery);

        const count = checkResult.recordset[0].count;

        if (count > 0) {
            // Nếu đã tồn tại, thực hiện cập nhật
            const updateQuery = `
                UPDATE dbo.CuaHang
                SET TenCH = @TenCH, TongNV = @TongNV, SoNha = @SoNha, Duong = @Duong, Quan = @Quan, ThanhPho = @ThanhPho, MaNCC = @MaNCC
                WHERE MaCH = @MaCH
            `;
            const updateRequest = pool.request();
            updateRequest.input('MaCH', data.MaCH);
            updateRequest.input('TenCH', data.TenCH);
            updateRequest.input('TongNV', data.TongNV);
            updateRequest.input('SoNha', data.SoNha);
            updateRequest.input('Duong', data.Duong);
            updateRequest.input('Quan', data.Quan);
            updateRequest.input('ThanhPho', data.ThanhPho);
            updateRequest.input('MaNCC', data.MaNCC);
            const updateResult = await updateRequest.query(updateQuery);

            return {
                message: 'Cập nhật loại sản phẩm thành công!',
                rowsAffected: updateResult.rowsAffected,
            };
        } else {
            // Nếu chưa tồn tại, thực hiện thêm mới
            const insertQuery = `
                INSERT INTO dbo.CuaHang (MaCH, TenCH, TongNV, SoNha, Duong, Quan, ThanhPho, MaNCC)
                VALUES (@MaCH, @TenCH, @TongNV, @SoNha, @Duong, @Quan, @ThanhPho, @MaNCC)
            `;
            const insertRequest = pool.request();
            insertRequest.input('MaCH', data.MaCH);
            insertRequest.input('TenCH',  data.TenCH);
            insertRequest.input('TongNV', data.TongNV);
            insertRequest.input('SoNha', data.SoNha);
            insertRequest.input('Duong', data.Duong);
            insertRequest.input('Quan', data.Quan);
            insertRequest.input('ThanhPho', data.ThanhPho);
            insertRequest.input('MaNCC', data.MaNCC);
            const insertResult = await insertRequest.query(insertQuery);

            return {
                message: 'Thêm loại sản phẩm thành công!',
                rowsAffected: insertResult.rowsAffected,
            };
        }
    } catch (err) {
        console.error('Lỗi khi xử lý loại sản phẩm:', err);
        throw err;
    }
}

    //Delete
    async delete(MaCH) {
        try {
            const pool = await sql._connect(); // Kết nối với cơ sở dữ liệu
    
            // Kiểm tra xem bản ghi có tồn tại không
            const checkQuery = `
                SELECT COUNT(*) AS count 
                FROM dbo.CuaHang 
                WHERE MaCH = @MaCH
            `;
            const checkResult = await pool.request()
                .input('MaCH', MaCH) // Đảm bảo kiểu dữ liệu phù hợp
                .query(checkQuery);
    
            const count = checkResult.recordset[0].count;
    
            if (count === 0) {
                return { success: false, message: `Không tìm thấy cửa hàng với mã ${MaCH}` };
            }
    
            // Thực hiện xóa bản ghi
            const deleteQuery = `
                DELETE FROM dbo.CuaHang 
                WHERE MaCH = @MaCH
            `;
            const deleteResult = await pool.request()
                .input('MaCH', MaCH)
                .query(deleteQuery);
    
            return {
                success: true,
                message: `Đã xóa thành công cửa hàng với mã ${MaCH}`,
                rowsAffected: deleteResult.rowsAffected,
            };
        } catch (err) {
            console.error(`Lỗi khi xóa cửa hàng có mã ${MaCH}:`, err);
            throw err;
        }
    }
    
}


module.exports = new CuaHang();


