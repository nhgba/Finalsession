const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash'); // Để hiển thị thông báo lỗi/thành công
const connectDB = require('./config/database.config');
const User = require('./models/user.model');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Kết nối MongoDB
connectDB();

// Cấu hình Express session
app.use(session({
    secret: 'thisisasecretkeyforauthdemo', // Chuỗi bí mật để ký session ID cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 tuần
    }
}));

// Cấu hình Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // Sử dụng phương thức authenticate của passport-local-mongoose

// Serialize và Deserialize người dùng
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware để phân tích body từ form (cho POST requests)
app.use(express.urlencoded({ extended: true }));

// Cấu hình View Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Cấu hình các file tĩnh (CSS, JS, hình ảnh)
app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng connect-flash cho thông báo
app.use(flash());

// Middleware để đưa thông báo flash và thông tin người dùng vào tất cả các view
app.use((req, res, next) => {
    res.locals.success = req.flash('success'); // Thông báo thành công
    res.locals.error = req.flash('error');   // Thông báo lỗi
    res.locals.currentUser = req.user;
    next();
});

// Sử dụng các route xác thực
app.use('/', authRoutes);

// Route mặc định
app.get('/', (req, res) => {
    res.redirect('/login'); // Chuyển hướng về trang đăng nhập/đăng ký
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});