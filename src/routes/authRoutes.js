// authRoutes.js

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister); // Registrar um novo usuário

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

module.exports = router;