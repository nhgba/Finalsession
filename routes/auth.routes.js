const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require('passport');
const flash = require('connect-flash');

router.use(flash()); // Sử dụng connect-flash cho thông báo

// Trang đăng ký
router.get('/register', authController.renderRegisterForm);
router.post('/register', authController.registerUser);

// Trang đăng nhập
router.get('/login', authController.renderLoginForm);
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), authController.loginUser);

// Trang đăng xuất
router.get('/logout', authController.logoutUser);

// Trang dashboard (yêu cầu đăng nhập)
router.get('/dashboard', authController.renderDashboard);

module.exports = router;