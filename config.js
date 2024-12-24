const mongoose = require('mongoose');

const mongodb_url = 'mongodb://localhost:27017/CSDL_SHOPQA_1'

const LoginSchema = new mongoose.Schema ({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const collection = new mongoose.model ("user", LoginSchema);

module.exports = collection;
