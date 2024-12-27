const sql = require('mssql');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./model/user');

class Database {
  constructor() {
      this._connectMongo();
  }

  // Kết nối MongoDB
  async _connectMongo() {
      try {
          await mongoose.connect('mongodb://localhost:27017/QLSHOPQA_1', {
              useNewUrlParser: true,
              useUnifiedTopology: true,
          });
          console.log('Kết nối MongoDB thành công!');
      } catch (err) {
          console.error('Kết nối MongoDB thất bại:', err);
      }
  }

  // Cấu hình kết nối cho từng role
  async _connect(role) {
      let config;
      console.log('hello');
      
      // Cấu hình kết nối cho các role
      if (role === 'admin') {
          config = {
              user: 'sa',
              password: '12345',
              server: 'LAPTOP-LA8UHHGM\\SERVER',
              database: 'QLShopQA_1',
              options: {
                  encrypt: false,
                  enableArithAbort: true,
              },
              port: 1433,
          };
      } else if (role === 'client1') {
          config = {
              user: 'sa',
              password: '12345',
              server: 'LAPTOP-LA8UHHGM\\CLIENT1',
              database: 'QLShopQA_1',
              options: {
                  encrypt: false,
                  enableArithAbort: true,
              },
              port: 1433,
          };
      } else if (role === 'client2') {
          config = {
              user: 'sa',
              password: '12345',
              server: 'LAPTOP-LA8UHHGM\\CLIENT2',
              database: 'QLShopQA_1',
              options: {
                  encrypt: false,
                  enableArithAbort: true,
              },
              port: 1433,
          };
      } else if (role === 'client3') {
          config = {
              user: 'sa',
              password: '12345',
              server: 'LAPTOP-LA8UHHGM\\CLIENT3',
              database: 'QLShopQA_1',
              options: {
                  encrypt: false,
                  enableArithAbort: true,
              },
              port: 1433,
          };
      } else {
          throw new Error(`Role không hợp lệ: ${role}`);
      }

      console.log('role');
      
      // Kết nối đến SQL Server
      try {
          const pool = await Database._connect(config);
          console.log(`Kết nối SQL Server thành công với role: ${role}`);
          return pool;
      } catch (err) {
          console.error(`Kết nối SQL Server thất bại với role: ${role}`, err);
          throw err;
      }
  }

  // Đăng nhập và phân quyền theo role
  async login(username, password) {
      try {
          // Tìm user trong MongoDB theo username
          const user = await User.findOne({ username });
          if (!user) {
              throw new Error('Người dùng không tồn tại!');
          }

          // Kiểm tra mật khẩu
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
              throw new Error('Mật khẩu không chính xác!');
          }

          const role = user.role;
          console.log(`Role của người dùng là: ${role}`);

          // Kiểm tra giá trị role
          if (!role || !['admin', 'client1', 'client2', 'client3'].includes(role)) {
              throw new Error(`Role không hợp lệ: ${role}`);
          }

          // Kết nối SQL Server với role tương ứng
          const pool = await this._connect(role);

          // Trả về pool kết nối để sử dụng cho các thao tác tiếp theo
          return pool;
      } catch (err) {
          console.error('Đăng nhập thất bại:', err);
          throw err;
      }
  }
}

module.exports = new Database();

//     async _connect() {
// // Cấu hình kết nối
// const config = {
//   "user": 'sa', // Tên người dùng SQL Server
//   "password": '12345', // Mật khẩu
//   "server": 'LAPTOP-LA8UHHGM\\SERVER', // Tên hoặc IP của server
//   "database": 'QLShopQA_1', // Tên database
//   "options": {
//     "encrypt": false, // Đặt thành true nếu sử dụng Azure
//     "enableArithAbort": true,
//   },
//   "port": 1433, // Cổng kết nối, mặc định là 1433
// };

// const config1 = {
//   "user": 'sa', // Tên người dùng SQL Server
//   "password": '12345', // Mật khẩu
//   "server": 'LAPTOP-LA8UHHGM\\CLIENT1', // Tên hoặc IP của server
//   "database": 'QLShopQA_1', // Tên database
//   "options": {
//     "encrypt": false, // Đặt thành true nếu sử dụng Azure
//     "enableArithAbort": true,
//   },
//   "port": 1433, // Cổng kết nối, mặc định là 1433
// };

// const config2 = {
//   "user": 'sa', // Tên người dùng SQL Server
//   "password": '12345', // Mật khẩu
//   "server": 'LAPTOP-LA8UHHGM\\CLIENT2', // Tên hoặc IP của server
//   "database": 'QLShopQA_1', // Tên database
//   "options": {
//     "encrypt": false, // Đặt thành true nếu sử dụng Azure
//     "enableArithAbort": true,
//   },
//   "port": 1433, // Cổng kết nối, mặc định là 1433
// };

// const config3 = {
//   "user": 'sa', // Tên người dùng SQL Server
//   "password": '12345', // Mật khẩu
//   "server": 'LAPTOP-LA8UHHGM\\CLIENT3', // Tên hoặc IP của server
//   "database": 'QLShopQA_1', // Tên database
//   "options": {
//     "encrypt": false, // Đặt thành true nếu sử dụng Azure
//     "enableArithAbort": true,
//   },
//   "port": 1433, // Cổng kết nối, mặc định là 1433
// };
//         let pool;

//         try {
//           if (!this.pool) {
//               this.pool = await sql.connect(config);
//           }
//           return this.pool;
//         } catch (err) {
//           console.error('Kết nối SQL Server thất bại:', err);
//           throw err;
//         }
//     }
// }
// module.exports = new Database();

