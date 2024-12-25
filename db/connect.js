const sql = require('mssql');

class Database {
    constructor() {
        this._connect()
    }

    async _connect() {
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
        let pool;

        try {
          if (!this.pool) {
              this.pool = await sql.connect(config);
          }
          return this.pool;
        } catch (err) {
          console.error('Kết nối SQL Server thất bại:', err);
          throw err;
        }
    }
}
module.exports = new Database();




// async function connectToSqlServer() {
//   if (!pool) {
//       try {
//           pool = await sql.connect(config);
//           console.log('Kết nối SQL Server thành công');
//       } catch (err) {
//           console.error('Kết nối SQL Server thất bại', err);
//           throw err;
//       }
//   }
//   return pool;
// }

// module.exports = {
//   sql, // Export thư viện sql nếu cần dùng trực tiếp
//   getConnection,
// };
