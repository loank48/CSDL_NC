const sql = require('../connect');

class NhaCungCap {
    async getAllNhaCungCap() {
        try {
            const pool = await sql._connect();
            const result = await pool.request().query('SELECT * FROM dbo.NhaCungCap');
            return result.recordset; // Trả về danh sách nhà cung cấp
        } catch (err) {
            console.error('Lỗi khi lấy danh sách nhà cung cấp:', err);
            throw err;
        }
    }

    async getNhaCungCapByID(MaNCC) {
        try {
            const pool = await sql._connect();
            const result = await pool
                .request()
                .input('MaNCC',MaNCC)
                .query('SELECT * FROM dbo.NhaCungCap WHERE MaNCC = @MaNCC');
            return result.recordset[0]; // Trả về thông tin nhà cung cấp đầu tiên
        } catch (err) {
            console.error(`Lỗi khi lấy nhà cung cấp có mã ${MaNCC}:`, err);
            throw err;
        }
    }
    async save(data) {
        try {

            console.log('Dữ liệu nhận được:', data);  // Kiểm tra dữ liệu truyền vào

            console.log("--------------------->data:" + data.MaNCC);
        
            // // Kiểm tra nếu dữ liệu không có thuộc tính 'MaNCC' hoặc 'TenNCC'
            // if (!data || !data.MaNCC || !data.TenNCC) {
            //     throw new Error('Thiếu dữ liệu MaNCC hoặc TenNCC');
            // }

            const pool = await sql._connect(); // Đảm bảo kết nối với cơ sở dữ liệu
            const checkQuery = `
            SELECT COUNT(*) AS count 
            FROM dbo.NhaCungCap 
            WHERE MaNCC = @MaNCC
        `;
        const checkRequest = pool.request();
        checkRequest.input('MaNCC', data.MaNCC);
        const checkResult = await checkRequest.query(checkQuery);

        const count = checkResult.recordset[0].count;

        if (count > 0) {
            // Nếu đã tồn tại, thực hiện cập nhật
            const updateQuery = `
                UPDATE dbo.NhaCungCap
                SET TenNCC = @TenNCC, SDT = @SDT, Email = @Email
                WHERE MaNCC = @MaNCC
            `;
            const updateRequest = pool.request();
            updateRequest.input('MaNCC', data.MaNCC);
            updateRequest.input('TenNCC', data.TenNCC);
            updateRequest.input('SDT', data.SDT);
            updateRequest.input('Email', data.Email);
            const updateResult = await updateRequest.query(updateQuery);

            return {
                message: 'Cập nhật nhà cung cấp thành công!',
                rowsAffected: updateResult.rowsAffected,
            };
        } else {
            // Nếu chưa tồn tại, thực hiện thêm mới
            const insertQuery = `
                INSERT INTO dbo.NhaCungCap (MaNCC, TenNCC, SDT, Email)
                VALUES (@MaNCC, @TenNCC, @SDT, @Email)
            `;
            const insertRequest = pool.request();
            insertRequest.input('MaNCC', data.MaNCC);
            insertRequest.input('TenNCC', data.TenNCC);
            insertRequest.input('SDT', data.SDT);
            insertRequest.input('Email', data.Email);
            const insertResult = await insertRequest.query(insertQuery);

            return {
                message: 'Thêm nhà cung cấp thành công!',
                rowsAffected: insertResult.rowsAffected,
            };
        }
    } catch (err) {
        console.error('Lỗi khi xử lý nhà cung cấp:', err);
        throw err;
    }
}
}

module.exports = new NhaCungCap();