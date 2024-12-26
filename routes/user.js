const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../db/model/user');
const router = express.Router();

// Hiển thị trang login
router.get('/login', (req, res) => {
    res.render('login'); 
});

// Xử lý đăng nhập
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Sai tài khoản hoặc mật khẩu');
    }

    // Gán user vào session
    req.session.user = user;

    // Chuyển hướng dựa trên role
    if (user.role === 'admin') {
        res.redirect('/home');
    } else {
        res.redirect(`/home/${user.role}`);
    }
});

// Hiển thị trang register
router.get('/register', (req, res) => {
    res.render('register'); 
});

// Xử lý đăng ký
router.post('/register', async (req, res) => {
    const { username, password, sdt, role } = req.body;

    try {
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = new User({
            username,
            password: hashedPassword,
            sdt,
            role, // Lưu giá trị role
        });

        // Lưu vào MongoDB
        await newUser.save();

        console.log('User registered:', newUser);

        // Chuyển hướng về trang đăng nhập
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user.');
    }
});

router.get('/home', (req, res) => {
    res.render('home'); 
});

router.get('/home/client1', (req, res) => {
    const user = req.session.user;
    if (!user || user.role !== 'client1') {
        return res.status(403).send('Access Denied'); // Chặn nếu không phải client1
    }
    return res.render('home_client1', { user }); // Render file home_client1.ejs
});

router.get('/home/client2', (req, res) => {
    const user = req.session.user;
    if (!user || user.role !== 'client2') {
        return res.status(403).send('Access Denied'); // Chặn nếu không phải client2
    }
    return res.render('home_client2', { user }); // Render file home_client2.ejs
});

router.get('/home/client3', (req, res) => {
    const user = req.session.user;
    if (!user || user.role !== 'client3') {
        return res.status(403).send('Access Denied'); // Chặn nếu không phải client3
    }
    return res.render('home_client3', { user }); // Render file home_client3.ejs
});


// Hiển thị quên mật khẩu
router.get('/forgot-password', (req, res) => {
    res.render('forgot-password'); 
});

// Xử lý gửi mã OTP
router.post('/forgot-password', async (req, res) => {
    const { sdt } = req.body;
    const user = await User.findOne({ sdt });

    if (!user) {
        return res.status(400).send('Không tìm thấy người dùng với số điện thoại này');
    }

    // Tạo mã OTP (ở đây chỉ log ra, bạn cần tích hợp SMS API)
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(`OTP for ${sdt}: ${otp}`);

    // Bạn có thể lưu OTP vào database và xác thực sau
    res.send('Mã OTP đã được gửi');
});

// Đăng xuất
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
