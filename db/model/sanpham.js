const sql = require('../connect');  // Kết nối với MSSQL
const mongoose = require('mongoose'); // Kết nối với MongoDB
const product = require('./product');  // Model MongoDB cho sản phẩm


class SanPham {
    // Lấy thông tin sản phẩm kết hợp từ cả MSSQL và MongoDB
    async getSanPhamByMaCH(MaCH) {
        try {
            // Truy vấn MSSQL để lấy tồn kho
            const pool = await sql._connect();
            const resultMSSQL = await pool
                .request()
                .input('MaSP', sql.NVarChar, MaSP)
                .query('SELECT MaCH, MaSP, MaLoai, TonKho FROM dbo.SanPham WHERE MaSP = @MaSP');
            
            if (resultMSSQL.recordset.length === 0) {
                throw new Error('Không tìm thấy sản phẩm trong MSSQL');
            }

            // Lấy dữ liệu tồn kho
            const { MaCH, MaLoai, TonKho } = resultMSSQL.recordset[0];

            // Truy vấn MongoDB để lấy thông tin chi tiết sản phẩm
            const resultMongoDB = await product.findOne({ MaSP });

            if (!resultMongoDB) {
                throw new Error('Không tìm thấy sản phẩm trong MongoDB');
            }

            // Kết hợp dữ liệu từ MSSQL và MongoDB
            const sanPham = {
                MaCH,
                MaSP,
                MaLoai,
                TenSP: resultMongoDB.TenSP,
                Mau: resultMongoDB.Mau,
                Size: resultMongoDB.Size,
                TonKho
            };

            return sanPham;
        } catch (err) {
            console.error('Lỗi khi kết hợp dữ liệu sản phẩm:', err);
            throw err;
        }
    }

    // Lấy tất cả sản phẩm từ MSSQL và MongoDB
    async getAllSanPham() {
        try {
            const result = [];
            const pool = await sql._connect();
            const resultMSSQL = await pool.request().query('SELECT MaCH, MaSP, MaLoai, TonKho FROM dbo.SanPham');

            for (let index = 0; index < resultMSSQL.recordset.length; index++) {
                const item = resultMSSQL.recordset[index];                
                const resultMongoDB = await product.find({MaSP: item.MaSP});
                console.log(resultMongoDB);
                
                const combinedItem = {
                    MaCH: item.MaCH,                  // Dữ liệu từ MSSQL
                    MaSP: item.MaSP,                  // Dữ liệu từ MSSQL
                    MaLoai: item.MaLoai,
                    TenSP: resultMongoDB[0].TenSP,        // Dữ liệu từ MongoDB
                    Mau: resultMongoDB[0].Mau,            // Dữ liệu từ MongoDB
                    Size: resultMongoDB[0].Size,          // Dữ liệu từ MongoDB
                    ChatLieu: resultMongoDB[0].ChatLieu, 
                    MoTaSP: resultMongoDB[0].MoTaSP, 
                    GiaBan: resultMongoDB[0].GiaBan, 
                    TonKho: item.TonKho,            // Dữ liệu từ MSSQL
                    UrlImage: resultMongoDB[0].UrlImage
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
}

module.exports = new SanPham();
