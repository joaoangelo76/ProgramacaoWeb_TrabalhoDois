const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getLogin = (req, res) => {
    res.render('login', { errors: [] });
};

exports.postLogin = [
    body('email').trim().isEmail().withMessage('Email inválido'),
    body('password').trim().notEmpty().withMessage('Password é obrigatório'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.render('login', { errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                console.log('User not found:', email);
                return res.render('login', { errors: [{ msg: 'Email não encontrado' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.render('login', { errors: [{ msg: 'Password incorreto' }] });
            }

            req.session.userId = user.id; // Armazena o ID do usuário na sessão

            console.log('Logging user in:', email);
            res.redirect('/home');
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).send('Erro ao fazer login');
        }
    }
];

exports.getRegister = (req, res) => {
    res.render('register', { errors: [] });
};

exports.postRegister = [
    body('name').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Password deve ter pelo menos 6 caracteres'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.render('register', { errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Verificar se o email já está em uso
            const existingEmail = await User.findOne({ where: { email } });
            if (existingEmail) {
                console.log('Email already in use:', email);
                return res.render('register', { errors: [{ msg: 'Email já está em uso' }] });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // Criar novo usuário
            await User.create({
                name,
                email,
                password: hashedPassword,
            });

            console.log('User registered successfully:', name);
            res.redirect('/login');
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Erro ao criar usuário');
        }
    }
];

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/dashboard');
        }
        res.redirect('/login');
    });
};
