const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    // Passport-local-mongoose sẽ tự động thêm trường 'password' và các phương thức liên quan
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);