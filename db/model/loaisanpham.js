const sql = require('../connect');

class LoaiSanPham {
    async getAllLoaiSanPham() {
        try {
            const pool = await sql._connect();
            const result = await pool.request().query('SELECT * FROM dbo.LoaiSanPham');
            return result.recordset; // Trả về danh sách loại sản phẩm
        } catch (err) {
            console.error('Lỗi khi lấy danh sách loại sản phẩm:', err);
            throw err;
        }
    }

    async getLoaiSanPhamByID(MaLoai) {
        try {
            const pool = await sql._connect();
            const result = await pool
                .request()
                .input('MaLoai', MaLoai)
                .query('SELECT * FROM dbo.LoaiSanPham WHERE MaLoai = @MaLoai');
                console.log(result.recordset[0]);
                
            return result.recordset[0]; // Trả về thông tin loại sản phẩm đầu tiên
        } catch (err) {
            console.error(`Lỗi khi lấy loại sản phẩm có mã ${MaLoai}:`, err);
            throw err;
        }
    }

    async save(data) {
        try {

            console.log('Dữ liệu nhận được:', data);  // Kiểm tra dữ liệu truyền vào

            // dataMongo = {
            //     data.MaLoai
            // }

            // dataMSSQL = {
            //     data.count
            // }

            console.log("--------------------->data:" + data.MaLoai);
        
            // // Kiểm tra nếu dữ liệu không có thuộc tính 'MaLoai' hoặc 'TenLoai'
            // if (!data || !data.MaLoai || !data.TenLoai) {
            //     throw new Error('Thiếu dữ liệu MaLoai hoặc TenLoai');
            // }

            const pool = await sql._connect(); // Đảm bảo kết nối với cơ sở dữ liệu
            const checkQuery = `
            SELECT COUNT(*) AS count 
            FROM dbo.LoaiSanPham 
            WHERE MaLoai = @MaLoai
        `;
        const checkRequest = pool.request();
        checkRequest.input('MaLoai', data.MaLoai);
        const checkResult = await checkRequest.query(checkQuery);

        const count = checkResult.recordset[0].count;

        if (count > 0) {
            // Nếu đã tồn tại, thực hiện cập nhật
            const updateQuery = `
                UPDATE dbo.LoaiSanPham
                SET TenLoai = @TenLoai
                WHERE MaLoai = @MaLoai
            `;
            const updateRequest = pool.request();
            updateRequest.input('MaLoai', data.MaLoai);
            updateRequest.input('TenLoai', data.TenLoai);
            const updateResult = await updateRequest.query(updateQuery);

            return {
                message: 'Cập nhật loại sản phẩm thành công!',
                rowsAffected: updateResult.rowsAffected,
            };
        } else {
            // Nếu chưa tồn tại, thực hiện thêm mới
            const insertQuery = `
                INSERT INTO dbo.LoaiSanPham (MaLoai, TenLoai)
                VALUES (@MaLoai, @TenLoai)
            `;
            const insertRequest = pool.request();
            insertRequest.input('MaLoai', data.MaLoai);
            insertRequest.input('TenLoai', sql.NVarChar, data.TenLoai);
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
}
            // Câu truy vấn SQL để thêm dữ liệu vào bảng LoaiSanPham
            // const query = `
            //     INSERT INTO dbo.LoaiSanPham (MaLoai, TenLoai)
            //     VALUES (@MaLoai, @TenLoai)
            // `;
    
            // const request = pool.request();
            // request.input('MaLoai', data.MaLoai); // Thêm tham số MaLoai
            // request.input('TenLoai', data.TenLoai); // Thêm tham số TenLoai
            // // Tạo đối tượng request và thêm các tham số từ đối tượng data

            // // Thực thi câu truy vấn
            // const result = await request.query(query);
            
            
//         return {
//             message: 'Thêm loại sản phẩm thành công!',
//             rowsAffected: result.rowsAffected,
//         }; // Trả về thông báo và số bản ghi được thêm
//     } catch (err) {
//         console.error('Lỗi khi thêm loại sản phẩm:', err);
//         throw err;
//         }
//     }
// }

module.exports = new LoaiSanPham();
