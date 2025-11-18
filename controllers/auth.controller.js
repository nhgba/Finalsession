const User = require('../models/user.model');
const passport = require('passport');

// Hiển thị form đăng ký
const renderRegisterForm = (req, res) => {
    res.render('register', { messages: req.flash('error') });
};

// Xử lý đăng ký người dùng
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username });
        await User.register(newUser, password);
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/login');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
};

// Hiển thị form đăng nhập
const renderLoginForm = (req, res) => {
    res.render('login', { messages: req.flash('error') });
};

// Xử lý đăng nhập người dùng (sẽ được Passport xử lý)
const loginUser = (req, res) => {
    req.flash('success', 'Logged in successfully!');
    res.redirect('/dashboard');
};

// Đăng xuất người dùng
const logoutUser = (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        req.flash('success', 'Logged out successfully!');
        res.redirect('/login');
    });
};

// Hiển thị trang dashboard (sau khi đăng nhập)
const renderDashboard = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard', { user: req.user, messages: req.flash('success') });
    } else {
        req.flash('error', 'Please log in to view this page.');
        res.redirect('/login');
    }
};

module.exports = {
    renderRegisterForm,
    registerUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    renderDashboard
};