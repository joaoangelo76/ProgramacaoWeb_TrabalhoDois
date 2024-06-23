const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/home', requireAuth, homeController.getHome);

module.exports = router;

