const sql = require('mssql');

// Cấu hình kết nối
const config = {
  "user": 'sa', // Tên người dùng SQL Server
  "password": '12345', // Mật khẩu
  "server": 'LAPTOP-LA8UHHGM\\SERVER', // Tên hoặc IP của server
  "database": 'QLShopQA_1', // Tên database
  "options": {
    "encrypt": false, // Đặt thành true nếu sử dụng Azure
    "enableArithAbort": true,
  },
  "port": 1433, // Cổng kết nối, mặc định là 1433
};

// Kết nối đến SQL Server
async function connectToSqlServer() {
  try {
    // Tạo kết nối
    const pool = await sql.connect(config);
    console.log('Connected to SQL Server successfully!');

    // // Truy vấn thử
    // const result = await pool.request().query('SELECT TOP 5 * FROM dbo.CuaHang');
    // console.log(result.recordset);

    // Đóng kết nối
    // await pool.close();
  } 
  catch (err) {
    console.error('Error connecting to SQL Server:', err);
  }
}

connectToSqlServer();
