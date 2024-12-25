const sql = require('../connect');

class NhanVien {
    async getAllNhanVien() {
        try {
            const pool = await sql._connect();
            const result = await pool.request().query('SELECT * FROM dbo.NhanVien');
            return result.recordset; // Trả về danh sách nhân viên
        } catch (err) {
            console.error('Lỗi khi lấy danh sách nhân viên:', err);
            throw err;
        }
    }

    async getNhanVienByID(MaNV) {
        try {
            const pool = await sql._connect();
            const result = await pool
                .request()
                .input('MaNV', MaNV)
                .query('SELECT * FROM NHANVIEN WHERE MaNV = @MaNV');
            return result.recordset[0]; // Trả về thông tin nhân viên đầu tiên
        } catch (err) {
            console.error(`Lỗi khi lấy nhân viên có mã ${MaNV}:`, err);
            throw err;
    }
}
    async save(data) {
        try {

            console.log('Dữ liệu nhận được:', data);  // Kiểm tra dữ liệu truyền vào

            console.log("--------------------->data:" + data.MaNV);

            const pool = await sql._connect(); // Đảm bảo kết nối với cơ sở dữ liệu
            const checkQuery = `
            SELECT COUNT(*) AS count 
            FROM dbo.NhanVien 
            WHERE MaNV = @MaNV
        `;
        const checkRequest = pool.request();
        checkRequest.input('MaNV', data.MaNV);
        const checkResult = await checkRequest.query(checkQuery);

        const count = checkResult.recordset[0].count;

        if (count > 0) {
            // Nếu đã tồn tại, thực hiện cập nhật
            const updateQuery = `
                UPDATE dbo.NhanVien
                SET TenNV = @TenNV, NgaySinh = @NgaySinh, GioiTinh = @GioiTinh, Email = @Email, SDT = @SDT, SoNha = @SoNha, Duong = @Duong, Quan = @Quan, ThanhPho = @ThanhPho, MaCH = @MaCH
                WHERE MaNV = @MaNV
            `;
            const updateRequest = pool.request();
            updateRequest.input('MaNV', data.MaNV);
            updateRequest.input('TenNV', data.TenNV);
            updateRequest.input('NgaySinh', data.NgaySinh);
            updateRequest.input('GioiTinh', data.GioiTinh);
            updateRequest.input('Email', data.Email);
            updateRequest.input('SDT', data.SDT);
            updateRequest.input('SoNha', data.SoNha);
            updateRequest.input('Duong', data.Duong);
            updateRequest.input('Quan', data.Quan);
            updateRequest.input('ThanhPho', data.ThanhPho);
            updateRequest.input('MaCH', data.MaCH);
            const updateResult = await updateRequest.query(updateQuery);

            return {
                message: 'Cập nhật nhân viên thành công!',
                rowsAffected: updateResult.rowsAffected,
            };
        } else {
            // Nếu chưa tồn tại, thực hiện thêm mới
            const insertQuery = `
                INSERT INTO dbo.NhanVien (MaNV, TenNV, NgaySinh, GioiTinh, Email, SDT, SoNha, Duong, Quan, ThanhPho, MaCH)
                VALUES (@MaNV, @TenNV, @NgaySinh, @GioiTinh, @Email, @SDT, @SoNha, @Duong, @Quan, @ThanhPho, @MaCH)
            `;
            const insertRequest = pool.request();
            insertRequest.input('MaNV', data.MaNV);
            insertRequest.input('TenNV', data.TenNV);
            insertRequest.input('NgaySinh', data.NgaySinh);
            insertRequest.input('GioiTinh', data.GioiTinh);
            insertRequest.input('Email', data.Email);
            insertRequest.input('SDT', data.SDT);
            insertRequest.input('SoNha', data.SoNha);
            insertRequest.input('Duong', data.Duong);
            insertRequest.input('Quan', data.Quan);
            insertRequest.input('ThanhPho', data.ThanhPho);
            insertRequest.input('MaCH', data.MaCH);
            const insertResult = await insertRequest.query(insertQuery);

            return {
                message: 'Thêm nhân viên thành công!',
                rowsAffected: insertResult.rowsAffected,
            };
        }
    } catch (err) {
        console.error('Lỗi khi xử lý nhân viên:', err);
        throw err;
    }
}
}

module.exports = new NhanVien();
