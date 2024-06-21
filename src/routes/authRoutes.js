// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para exibir a página de login (GET /auth/login)
router.get('/login', authController.getLogin);

// Rota para processar o login do usuário (POST /auth/login)
router.post('/login', authController.postLogin);

// Rota para exibir a página de registro (GET /auth/register)
router.get('/register', authController.getRegister);

// Rota para processar o registro do usuário (POST /auth/register)
router.post('/register', authController.postRegister);

// Rota para logout do usuário (POST /auth/logout)
router.post('/logout', authController.postLogout);

module.exports = router;

