const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getLogin = (req, res) => {
    res.render('index', { loggedIn: false });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).send('Email or password is incorrect.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Email or password is incorrect.');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/'); // Redireciona para a página principal após o login
};

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.postRegister = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password: await bcrypt.hash(password, 10) });

    await user.save();
    res.redirect('/auth/login'); // Redireciona para a página de login após o registro
};

exports.postLogout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
};
