const sql = require('../connect');  // Kết nối với MSSQL
const mongoose = require('mongoose'); // Kết nối với MongoDB
const product = require('./product');  // Model MongoDB cho sản phẩm


class SanPham {
    // Lấy thông tin sản phẩm kết hợp từ cả MSSQL và MongoDB
    async getSanPhamByMaSP(MaSP) {
        try {
            // Truy vấn MSSQL để lấy tồn kho
            const pool = await sql._connect();
            const resultMSSQL = await pool
                .request()
                .input('MaSP', MaSP)
                .query('SELECT MaCH, MaSP, MaLoai, TonKho, GiaBan FROM dbo.SanPham WHERE MaSP = @MaSP');
            
            
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
                TonKho,
                TenSP: resultMongoDB.TenSP,
                Mau: resultMongoDB.Mau,
                Size: resultMongoDB.Size,
                ChatLieu: resultMongoDB.ChatLieu,
                MoTaSP: resultMongoDB.MoTaSP,
                GiaBan: resultMongoDB.GiaBan,
                UrlImage: resultMongoDB.UrlImage
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

                
                console.log(item);
                console.log(resultMongoDB);
                    
                console.log(combinedItem);
                
                

                result.push(combinedItem);
            }
            return result;

        } catch (err) {
            console.error('Lỗi khi lấy tất cả sản phẩm:', err);
            throw err;
        }
    }

    async saveProduct(data) {
        
        
        try {
            console.log(data);
            
            // 1. Tách dữ liệu cho từng DB
            const mssqlData = {
                MaSP: data.MaSP,
                MaCH: data.MaCH,
                MaLoai: data.MaLoai,
                TonKho: data.TonKho,
                GiaBan: data.GiaBan
            };
            
            const mongoData = {
                MaSP: data.MaSP,
                MaCH: data.MaCH,
                MaLoai: data.MaLoai,
                TonKho: data.TonKho,
                TenSP: data.TenSP,
                Mau: data.Mau || 'Không xác định',
                Size: data.Size || 'Không xác định',
                ChatLieu: data.ChatLieu || 'Không xác định',
                MoTaSP: data.MoTaSP || 'Không xác định',
                GiaBan: data.GiaBan,
                UrlImage: data.UrlImage,
            };
            
            console.log(mssqlData);
            console.log(mongoData);


            // 2. Lưu vào MSSQL
            const pool = await sql._connect(); // Kết nối MSSQL
            const checkQuery = `SELECT COUNT(*) AS count FROM dbo.SanPham WHERE MaSP = @MaSP`;
            const checkRequest = pool.request();
            checkRequest.input('MaSP', mssqlData.MaSP);
            
            const checkResult = await checkRequest.query(checkQuery);
            const count = checkResult.recordset[0].count;

            console.log(count);
            

            if (count > 0) {
                // Nếu sản phẩm đã tồn tại -> Cập nhật
                const updateQuery = `
                    UPDATE dbo.SanPham
                    SET MaCH = @MaCH, MaLoai = @MaLoai, TonKho = @TonKho, GiaBan = @GiaBan
                    WHERE MaSP = @MaSP
                `;
                const updateRequest = pool.request();
                updateRequest.input('MaSP', mssqlData.MaSP);
                updateRequest.input('MaCH', mssqlData.MaCH);
                updateRequest.input('MaLoai', mssqlData.MaLoai);
                updateRequest.input('TonKho', mssqlData.TonKho);
                updateRequest.input('GiaBan', mssqlData.GiaBan); 
                await updateRequest.query(updateQuery);
            } else {
                console.log(mssqlData);
                
                // Nếu sản phẩm chưa tồn tại -> Thêm mới
                const insertQuery = `
                    INSERT INTO dbo.SanPham (MaSP, MaCH, MaLoai, TonKho, GiaBan)
                    VALUES (@MaSP, @MaCH, @MaLoai, @TonKho, @GiaBan)
                `;
                const insertRequest = pool.request();
                insertRequest.input('MaSP', mssqlData.MaSP);
                insertRequest.input('MaCH', mssqlData.MaCH);
                insertRequest.input('MaLoai', mssqlData.MaLoai);
                insertRequest.input('TonKho', mssqlData.TonKho);
                insertRequest.input('GiaBan', mssqlData.GiaBan);
                await insertRequest.query(insertQuery);
            }

            // 3. Lưu vào MongoDB
            const existingProduct = await product.findOne({ TenSP: mongoData.TenSP });
            if (existingProduct) {
                // Nếu sản phẩm đã tồn tại -> Cập nhật
                await product.updateOne({ TenSP: mongoData.TenSP }, { $set: mongoData });
            } else {
                // Nếu sản phẩm chưa tồn tại -> Thêm mới
                const newProduct = new product(mongoData);
                await newProduct.save();
            }

            return { success: true, message: 'Lưu sản phẩm thành công vào cả MSSQL và MongoDB.' };
        } catch (err) {
            console.error('Lỗi khi lưu sản phẩm:', err);
            throw new Error('Lỗi khi lưu sản phẩm vào cơ sở dữ liệu.');
        }
    }

    async deleteProduct(MaSP) {
        try {
            // 1. Xóa dữ liệu từ MSSQL
            const pool = await sql._connect(); // Kết nối với MSSQL
            const deleteMSSQLQuery = `DELETE FROM dbo.SanPham WHERE MaSP = @MaSP`;
            const deleteRequest = pool.request();
            deleteRequest.input('MaSP', MaSP);
            const mssqlResult = await deleteRequest.query(deleteMSSQLQuery);
    
            // Kiểm tra xem sản phẩm có tồn tại trong MSSQL không
            if (mssqlResult.rowsAffected[0] === 0) {
                throw new Error('Sản phẩm không tồn tại trong MSSQL.');
            }
    
            // 2. Xóa dữ liệu từ MongoDB
            const mongoResult = await product.deleteOne({ MaSP });
    
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


module.exports = new SanPham();
