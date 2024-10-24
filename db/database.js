const mongoose = require('mongoose');

const mongodb_url = 'mongodb://localhost:27017/CSDL_SHOPQA'

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(mongodb_url)
            .then(() => {
                console.log("Database connection successfully!");
            })
            .catch(err => {
                console.log("Database connection error!");
            })
    }
}
module.exports = new Database();
