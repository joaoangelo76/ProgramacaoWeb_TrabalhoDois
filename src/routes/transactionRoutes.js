const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { requireAuth } = require('../middleware/authMiddleware');

router.post('/transaction/add', requireAuth, transactionController.createOrUpdateTransaction);
router.post('/transaction/update/:id', requireAuth, transactionController.createOrUpdateTransaction);
router.delete('/transaction/delete/:id', requireAuth, transactionController.deleteTransaction);

module.exports = router;

