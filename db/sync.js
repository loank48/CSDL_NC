const sql = require('mssql');
const mongoose = require('mongoose');
require('./database'); // Kết nối MongoDB thông qua file database.js
// require('./connect');

// Mongoose Schema và Model
const { Schema } = mongoose;

const CuaHangSchema = new Schema({
  MaCH: {
    type: String,
    required: true,
    unique: true,
  },
  TenCH: {
    type: String,
    required: true,
  },
  TongNV: {
    type: Number,
    required: true,
  },
  SoNha: {
    type: Number,
    required: true,
  },
  Duong: {
    type: String,
    required: true,
  },
  Quan: {
    type: String,
    required: true,
  },
  ThanhPho: {
    type: String,
    required: true,
  },
  MaNCC: {
    type: String,
    required: true,
  },
});

const CuaHang = mongoose.model('CUAHANG', CuaHangSchema);

module.exports = CuaHang;


// const YourModel = mongoose.model('YourCollection', YourSchema);

// Cấu hình SQL Server
const sqlConfig = {
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

async function syncData() {
  try {
    // Kết nối SQL Server
    const sqlPool = await sql.connect(sqlConfig);
    console.log('Kết nối SQL Server thành công!');

    
    const result = await sqlPool.request().query("select * from sys.tables");

    result.recordset.forEach(async (row) => {
      if( row.is_ms_shipped == false && !row.name.includes("sys") ){
        var tableName = row.name.toUpperCase();
        console.log(tableName); 
        // ddojc dduowjc table roi
        //lay tung tbn ben mongo + lay data trong tb ben sql -> ss ben mongo cos roi thi update lai / chua thi insert do
        // const result1 = await sqlPool.request().query('SELECT * FROM ' + tableName);
        // console.log('Dữ liệu từ SQL Server:', result1.recordset);
      }
    })
    
    // Truy vấn dữ liệu từ SQL Server
    

    // Đồng bộ dữ liệu vào MongoDB
    // await CuaHang.insertMany(result.recordset);
    // console.log('Dữ liệu đã được đồng bộ vào MongoDB!');

    // Đóng kết nối SQL Server
    // await sqlPool.close();
    sqlPool.end();
  } catch (err) {
    console.error('Lỗi đồng bộ dữ liệu:', err);
    // await sqlPool.close();
  }
}

syncData();
